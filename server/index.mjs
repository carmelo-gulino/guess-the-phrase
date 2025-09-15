// imports
import express from 'express';
import { getEasyPhrase, getLetters, getPhrase, getUser, updateUser } from './dao.mjs';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import { guessLetter, guessPhrase, startGame, updateUserCoins } from './gameLogic.mjs';
import { check, validationResult } from 'express-validator';

// init express
const app = new express();
const port = 3001;

const games = new Map();  //mappa di partite ognuna con il suo id
const letters = new Map();

app.use(express.json());
app.use(morgan('dev'));

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessState: 200,
  credentials: true
};

app.use(cors(corsOptions));

/** PASSPORT CONFIGURATION */
passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await getUser(username, password);
  if (!user) {
    return cb(null, false, 'Incorrect username or password');
  }
  return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  return cb(null, user);
});

app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.authenticate('session'));

//starting a game
app.post('/api/games/start', async (req, res) => {
  let phrase = '';
  const user = req.isAuthenticated() ? req.user : undefined;

  if (user && user.coins === 0) {
    return res.status(403).json();
  }

  try {

    if (user) {
      phrase = await getPhrase();
    } else {
      phrase = await getEasyPhrase();
    }

    const newGame = startGame(games.size, phrase);
    games.set(newGame.id, newGame);

    if (letters.size === 0) {
      const rawLetters = await getLetters();
      rawLetters.forEach((l) => letters.set(l.symbol, l));
    }

    res.json({
      gameInfo: {
        game: newGame.gameToJSON(),
        present: null,
        correct: null,
        status: 'playing',
        msg: null
      },
      letters: Array.from(letters.values())
    });

  } catch (error) {
    res.status(500).end();
  }
});

//guessing a letter
app.post('/api/games/:gameId/letter', [
  check('letter')
    .notEmpty()
    .isLength({min: 1, max: 1})
    .matches(/[A-Z]/)
], (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({msg: "You must choose exactly ONE letter."});
  }

  try {
    const gameId = parseInt(req.params.gameId);
    const game = games.get(gameId);

    const letter = req.body.letter;
    const cost = letters.get(letter).cost;

    const user = req.isAuthenticated() ? req.user : undefined;

    const present = guessLetter(game, letter, cost, user);

    const status = 'playing';
    const msg = status === 'playing' && present ? 'Yes!' : 'Nope!';

    res.json({
      gameInfo: {
        game: game.gameToJSON(),
        present,
        correct: null,
        status,
        msg
      },
      user
    });

  } catch (error) {
    res.status(500).end();
  }
});

//guessing a phrase
app.post('/api/games/:gameId/phrase', [
  check('phrase')
    .notEmpty()
    .matches(/[A-Za-z\s.,'!?;:-]/)
], (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({msg: "The phrase can contain ONLY letters, spaces and standard punctuation (.,'!?;:-)."});
  }

  try {
    const game = games.get(parseInt(req.params.gameId));
    const phrase = req.body.phrase;
    const user = req.isAuthenticated() ? req.user : undefined;

    const correct = guessPhrase(game, phrase, user);

    const status = correct ? 'won' : 'playing';
    const msg = !correct ? 'The phrase is not correct' : null;

    res.json({
      gameInfo: {
        game: game.gameToJSON(),
        present: null,
        correct,
        status,
        msg,
      },
      user      
    });

  } catch (err) {
    res.status(500).end();
  }
});

//deleting a game
app.delete('/api/games/:gameId', async (req, res) => {

  try {
    const gameId = parseInt(req.params.gameId);
    const user = req.isAuthenticated() ? req.user : undefined;
    const gameStatus = req.body.gameStatus;

    if (user) {
      switch (gameStatus) {
        case 'won':
          updateUserCoins(user, 100);
          break;
        case 'timeout':
          updateUserCoins(user, -20);
          break;
        default:
          break;
      }
      user.game_counter += 1;
      await updateUser(user.id, user.coins, user.game_counter);
    }
    
    games.delete(gameId);

    res.json({
      user
    });
    
  } catch (err) {
    res.status(500).end();
  }
});

// POST /api/sessions
app.post('/api/sessions', passport.authenticate('local'), function(req, res) {
  return res.status(201).json(req.user);
});

// GET /api/sessions/current
app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.json(req.user);}
  else
    res.status(401).json({error: 'Not authenticated'});
});

// DELETE /api/session/current
app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => {
    res.end();
  });
});

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
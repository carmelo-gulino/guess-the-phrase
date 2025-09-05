// imports
import express from 'express';
import { getEasyPhrase, getPhrase, getUser, updateCoins } from './dao.mjs';
import morgan from 'morgan';
import cors from 'cors';

import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import { guessLetter, guessPhrase, startGame } from './gameLogic.mjs';
import { check, validationResult } from 'express-validator';

// init express
const app = new express();
const port = 3001;

const games = new Map();  //mappa di partite ognuna con il suo id

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

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: 'Not authorized'});
}

app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.authenticate('session'));

/** ENDPOINTS */

//starting a game
app.post('/api/games/start', async (req, res) => {
  let phrase = '';

  try {

    if (req.body.mode === 'easy') {
      phrase = await getEasyPhrase();
    } else {
      phrase = await getPhrase();
    }

    const newGame = startGame(games.size, phrase);
    games.set(newGame.id, newGame);

    const gameInfo = {
      game: newGame.gameToJSON(),
      user: req.user,
      present: null,
      correct: null,
      status: 'playing'
    }

    res.json(gameInfo);

  } catch (error) {
    res.status(500).end();
  }
});

//guessing a letter
app.post('/api/games/:gameId/letter', async (req, res) => {
  try {
    const game = games.get(parseInt(req.params.gameId));
    const letter = req.body.letter;
    const cost = req.body.cost;
    const user = req.user;

    const mode = user ? 'normal' : 'easy';

    const obj = guessLetter(game, letter, cost, mode);

    if (user) {
      user.coins += obj.coinDelta;
      if (user.coins < 0) {
        user.coins = 0;
      }
      console.log(user);
    }

    const gameInfo = {
      game: obj.game,
      user,
      present: obj.present,
      correct: null,
      status: user?.coins === 0 ? 'ended' : 'playing'
    }

    res.json(gameInfo);

  } catch (error) {
    res.status(500).end();
  }
});

//guessing a phrase
app.post('/api/games/:gameId/phrase', [
  check('phrase').notEmpty(),
],async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json();
  }

  try {
    const game = games.get(parseInt(req.params.gameId));
    const phrase = req.body.phrase;
    const user = req.user;

    const mode = user ? 'normal' : 'easy';

    const obj = guessPhrase(game, phrase, mode);

    if (obj.correct && user) {
      user.coins += obj.coinDelta;
      console.log(user);
    }


    const gameInfo = {
      game: obj.game,
      user,
      present: null,
      correct: obj.correct,
      status: obj.correct ? 'won' : 'playing'
    }

    res.json(gameInfo);

  } catch (err) {
    res.status(500).end();
  }
});

//deleting a game
app.delete('/api/games/:gameId', async (req, res) => {
  try {
    const gameId = parseInt(req.params.gameId);
    games.delete(gameId);
    res.status(204).end();
  } catch (err) {
    res.status(500).end();
  }
});

//updating user coins
app.patch('/api/users/:userId/coins', async (req, res) => {
  try {
    const userId = req.params.userId;
    const coins = req.body.coins;

    await updateCoins(userId, coins);
    res.status(200).end();
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
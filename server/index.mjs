// imports
import express from 'express';
import { getEasyPhrase, getPhrase, getUser, updateCoins } from './dao.mjs';
import morgan from 'morgan';
import cors from 'cors';

import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import { guessLetter, startGame } from './gameLogic.mjs';

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

    res.json({game: newGame.gameToJSON(), user: req.user});

  } catch (error) {
    res.status(500).end();
  }
});

app.post('/api/games/:gameId/guess', async (req, res) => {
  try {
    const game = games.get(parseInt(req.params.gameId));
    const letter = req.body.letter;
    const cost = req.body.cost;
    const user = req.user;

    const gameInfoObj = guessLetter(game, letter, cost, user);

    res.json(gameInfoObj);
  } catch (error) {
    res.status(500).end();
  }
});

app.delete('/api/games/:gameId', async (req, res) => {
  try {
    const gameId = req.params.gameId;
    games.delete(gameId);
    res.status(204).end();
  } catch (err) {
    res.status(500).end();
  }
});

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
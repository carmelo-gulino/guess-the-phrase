import 'bootstrap/dist/css/bootstrap.min.css';
import DefaultLayout from '../components/DefaultLayout'
import { Route, Routes, useNavigate } from 'react-router';
import Home from '../components/Home';
import {LoginForm} from '../components/AuthComponent.jsx';
import GameContent from '../components/game/GameContent';
import AuthContext from '../contexts/authContext.js';
import { useState } from 'react';
import API from '../API/API.mjs';
import NotFound from '../components/NotFound.jsx';
import GameContext from '../contexts/gameContext.js';

function App() {
  const [loggedIn, setLoggedIn] =  useState(false);
  const [user, setUser] = useState(undefined);
  const [timer, setTimer] = useState(60);
  const [letterError, setLetterError] = useState(null);

  const initialGameInfo = {game: null, present: null, correct: null, status: null, msg: null}
  const [gameInfo, setGameInfo] = useState(initialGameInfo);

  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    const user = await API.logIn(credentials);
    setLoggedIn(true);
    setUser(user);
    return user;
  };

  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    setUser(undefined);
  };

  const guessLetter = async (gameId, letter) => {
    try {
      const res = await API.guessLetter(gameId, letter);
      setGameInfo(res.gameInfo);
      setUser(res.user);
    } catch (serverError) {
      setLetterError(serverError.message);
    }
  }

  const guessPhrase = async (gameId, phrase) => {
    const res = await API.guessPhrase(gameId, phrase);
    setGameInfo(res.gameInfo);
    setUser(res.user);
  }

  const endGame = async () => {
    const res = await API.endGame(gameInfo.game.gameId, gameInfo.status);
    const status = gameInfo.status;
    const correctPhrase = res.phrase;
    setGameInfo(initialGameInfo);

    if(loggedIn) {
      const user = res.user;
      setUser(user);
      navigate(`/users/${user.id}`, {state: {status, correctPhrase}})
    } else {
      navigate(`/`, {state: {status, correctPhrase}});
    }
  }

  return (
    <>
      <AuthContext.Provider value={{loggedIn, user, setUser}}>
        <GameContext.Provider value={{gameInfo, initialGameInfo, setGameInfo, guessLetter, guessPhrase, endGame}}>
          <Routes>
            <Route element={<DefaultLayout timer={timer}/>}>
              <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<LoginForm handleLogin={handleLogin}/>}/>
                <Route path='/users/:userId' element={<Home handleLogout={handleLogout}/>}/>
                <Route path='/users/:userId/game/:gameId?' element={<GameContent letterError={letterError} timer={timer} setTimer={setTimer}/>}/>
                <Route path='/free/game/:gameId?' element={<GameContent letterError={letterError} timer={timer} setTimer={setTimer}/>}/>
                <Route path='*' element={<NotFound/>}/>
              </Route>
          </Routes>
        </GameContext.Provider>
      </AuthContext.Provider>
    </>
  )
}

export default App

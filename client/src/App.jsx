import 'bootstrap/dist/css/bootstrap.min.css';
import DefaultLayout from '../components/DefaultLayout'
import { Route, Routes } from 'react-router';
import Home from '../components/Home';
import HomeLayout from '../components/HomeLayout';
import {LoginForm} from '../components/AuthComponent.jsx';
import GameLayout from '../components/game/GameLayout';
import GameContent from '../components/game/GameContent';
import AuthContext from '../contexts/authContext.js';
import { useState } from 'react';
import API from '../API/API.mjs';
import NotFound from '../components/NotFound.jsx';

function App() {
  const [loggedIn, setLoggedIn] =  useState(false);
  const [user, setUser] = useState(undefined);

  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setUser(user);
      return user;
    }catch(err) {
      setMessage({msg: err, type: 'danger'});
    }
  };

  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    setUser(undefined);
  };

  return (
    <>
      <AuthContext.Provider value={{loggedIn, setLoggedIn, user, setUser, handleLogin, handleLogout}}>
        <Routes>
          <Route element={<DefaultLayout/>}>
            <Route element={<HomeLayout/>}>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<LoginForm/>}/>
              <Route path='/users/:userId' element={<Home/>}/>
            </Route>
            <Route element={<GameLayout/>}>
              <Route path='/users/:userId/game' element={<GameContent/>}>
                <Route path=':gameId' element={<GameContent/>}/>
              </Route>
              <Route path='/free/game' element={<GameContent/>}>
                <Route path=':gameId' element={<GameContent/>}/>
              </Route>
            </Route>
            <Route path='*' element={<NotFound/>}/>
          </Route>
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App

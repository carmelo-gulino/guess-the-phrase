import 'bootstrap/dist/css/bootstrap.min.css';
import DefaultLayout from '../components/DefaultLayout'
import { Route, Routes } from 'react-router';
import Home from '../components/Home';
import HomeLayout from '../components/HomeLayout';
import LoginForm from '../components/LoginForm';
import GameLayout from '../components/GameLayout';
import GameContent from '../components/GameContent';
import AuthContext from '../contexts/authContext.js';
import { useState } from 'react';
import API from '../API/API.mjs';

function App() {
  const [loggedIn, setLoggedIn] =  useState(false);
  const [user, setUser] = useState();

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
      <AuthContext.Provider value={{loggedIn, setLoggedIn, user, setUser}}>
        <Routes>
          <Route element={<DefaultLayout/>}>
            <Route element={<HomeLayout/>}>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<LoginForm handleLogin={handleLogin} handleLogout={handleLogout}/>}/>
              <Route path='/:userId' element={<Home/>}/>
            </Route>
            <Route element={<GameLayout/>}>
              <Route path='/:userId/game' element={<GameContent/>}>
                <Route path=':gameId' element={<GameContent/>}/>
              </Route>
              <Route path='/free/game' element={<GameContent/>}>
                <Route path=':gameId' element={<GameContent/>}/>
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App

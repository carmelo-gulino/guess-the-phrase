const SERVER_URL = "http://localhost:3001";

const startGame = async (mode) => {
    
    const response = await fetch(SERVER_URL + '/api/games/start', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({mode}),
    });

    if (response.ok) {
        const gameInfoJSON = await response.json();
        return gameInfoJSON;
    } else {
        throw new Error("Internal Server Error");
    }
}

const guessLetter = async (gameId, letter, cost) => {
    const response = await fetch(SERVER_URL  + `/api/games/${gameId}/guess`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({letter, cost}),
    });
    if (response.ok) {
        const gameInfoJSON = await response.json();
        return gameInfoJSON;
    } else {
        throw new Error("Internal Server Error");   //TODO -> gestione errori       
    }
}

const endGame = async (gameId) => {
    
    const response = await fetch(SERVER_URL + `/api/games/${gameId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error("Internal Server Error");
    }
}

const logIn = async (credentials) => {
    const response = await fetch(SERVER_URL + '/api/sessions', {
        method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
    });

    if(response.ok) {
        const user = await response.json();
        return user;
    } else {
        const errDetails = await response.text();
        throw errDetails;
    }
}

const logOut = async() => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    method: 'DELETE',
    credentials: 'include'
  });
  if (response.ok)
    return null;
}

const API = { startGame, guessLetter, endGame, logIn, logOut };
export default API;
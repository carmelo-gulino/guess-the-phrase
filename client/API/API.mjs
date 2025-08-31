const SERVER_URL = "http://localhost:3001";

const startGame = async (mode) => {
    const response = await fetch(SERVER_URL + '/api/startGame', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({mode}),
    });
    if (response.ok) {
        const gameInfoJSON = await response.json();
        return gameInfoJSON;
    } else {
        throw new Error("Internal Server Error");
    }
}

const guessLetter = async (gameId, letter) => {
    const response = await fetch(SERVER_URL  + `/api/game/${gameId}/guess`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({letter}),
    });
    if (response.ok) {
        const gameInfoJSON = await response.json();
        return gameInfoJSON;
    } else {
        throw new Error("Internal Server Error");   //TODO -> gestione errori       
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

const API = { startGame, guessLetter, logIn, logOut };
export default API;
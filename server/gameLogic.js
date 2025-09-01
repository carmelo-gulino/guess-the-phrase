import Game from "./models/game.mjs";

export function startGame(size, phrase) {
    const newId = size + 1;
    return new Game(newId, phrase);
}

export function guessLetter(game, letter, cost, user) {
    let present = false;

    [...game.phrase].forEach((c, index) => {
        if (c.toUpperCase() === letter.toUpperCase()) {
            game.revealed[index] = c.toUpperCase();
            present = true; //se ce n'è anche solo una aggiorno present
        }
    });

    if (present) {
        game.guessedLetters.push(letter);
        user.coins -= cost;
    } else {
        user.coins -= 2*cost;
    }

    const obj = {
        game: game.gameToJSON(),
        user: user,
    }

    return obj;
}

export function decreaseTimer(gameInfo) {
    if (gameInfo.game.timer > 0) {
        gameInfo.game.timer -= 1;
    }

    const obj = {
        game: { ...gameInfo.game },
        user: { ...gameInfo.user }
    };

    return obj;
}
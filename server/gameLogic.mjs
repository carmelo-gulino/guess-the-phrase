import Game from "./models/game.mjs";

export function startGame(size, phrase) {
    const newId = size + 1;
    return new Game(newId, phrase);
}

export function guessLetter(game, letter, cost, user) {
    let correct = false;

    [...game.phrase].forEach((c, index) => {
        if (c.toUpperCase() === letter.toUpperCase()) {
            game.revealed[index] = c.toUpperCase();
            correct = true; //se ce n'è anche solo una aggiorno correct
        }
    });

    game.guessedLetters.push(letter);

    if (user) {
        if (correct) {
            user.coins -= cost;
        } else {
            user.coins -= 2*cost;
        }
    }

    const obj = {
        game: game.gameToJSON(),
        user,
        correct
    }

    return obj;
}

export function guessPhrase(game, phrase) {
    if (game.phrase.toUpperCase() === phrase.toUpperCase()) {
        return true;
    } else {
        return false;
    }
}

export function decreaseTimer(timer) {
    if (timer > 0) {
        timer -= 1;
    }

    return timer;
}
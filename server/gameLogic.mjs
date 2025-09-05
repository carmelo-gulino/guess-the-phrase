import Game from "./models/game.mjs";

export function startGame(size, phrase) {
    const newId = size + 1;
    return new Game(newId, phrase);
}

export function guessLetter(game, letter, cost, mode) {
    let present = false;
    let coinDelta = null;

    [...game.phrase].forEach((c, index) => {
        if (c.toUpperCase() === letter.toUpperCase()) {
            game.revealed[index] = c.toUpperCase();
            present = true; //se ce n'è anche solo una aggiorno present
        }
    });

    game.guessedLetters.push(letter);

    if (mode === 'normal') {
        if (present) {
            coinDelta = -cost;
        } else {
            coinDelta = -2*cost;
        }
    }

    return {
        game: game.gameToJSON(),
        present,
        coinDelta
    }
}

export function guessPhrase(game, phrase, mode) {
    let correct;
    let coinDelta = null;

    if (game.phrase.toUpperCase() === phrase.toUpperCase()) {
        correct = true;
        if (mode === 'normal') {
            coinDelta = 100;
        }
    } else {
        correct = false;
    }

    const obj = {
        game: game.gameToJSON(),
        correct,
        coinDelta
    }

    return obj;
}

export function decreaseTimer(timer) {
    if (timer > 0) {
        timer -= 1;
    }

    return timer;
}
import Game from "./models/gameModel.mjs";

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

    game.guessedLetters.push(letter);

    if (user) {
        if (present) {
            updateUserCoins(user, -cost);
        } else {
            updateUserCoins(user, -2*cost);
        }
    }

    return present;
}

export function guessPhrase(game, phrase) {
    let correct;

    if (game.phrase.toUpperCase() === phrase.toUpperCase()) {
        correct = true;
        if (user) {
            updateUserCoins(user, 100);
        }
    } else {
        correct = false;
    }

    return correct;
}

export function decreaseTimer(timer) {
    if (timer > 0) {
        timer -= 1;
    }

    return timer;
}

export function updateUserCoins(user, delta) {
    user.coins += delta;
    if (user.coins < 0) {
        user.coins = 0;
    }
}
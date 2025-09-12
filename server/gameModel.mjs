function Game(id, phrase) {
    this.id = id;
    this.phrase = phrase;
    this.revealed = {};
    this.guessedLetters = [];

    this.getBlanks = () => {
        const positions = [];
        [...this.phrase].forEach((c, index) => {
            if (c === ' ') {
                positions.push(index);
            }
        });
        return positions;
    }

    this.gameToJSON = () => {
        const gameJSON = {
            gameId: this.id,
            length: this.phrase.length,
            blanks: this.getBlanks(),
            revealed: this.revealed,
            guessedLetters: this.guessedLetters,
        };
        return gameJSON;
    }

}

export default Game;
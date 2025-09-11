[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/4NgFJDM8)
# Exam #3: "Indovina la frase"
## Student: s346140 GULINO CARMELO 

## React Client Application Routes

- Route `/`: page content and purpose
- Route `/something/:param`: page content and purpose, param specification
- ...

## API Server

- POST `/api/games/start`
  - Request parameters: none
  - Request body: 
    ```json
    {
      mode: 'easy'
    }
    ```
  - Response body:
    ```json
    {
      game: {
          gameId: 1,
          length: 30,
          blanks: [1, 5, 6],
          revealed: [],
          guessedLetters: [],
      },
      present: null,
      correct: null,
      status: 'playing',
      msg: null
    }
    ```
- POST `/api/games/:gameId/letter`
  - request parameters
  - Request body:
    ```json
    {
      letter: 'A',
      cost: 10
    }
    ```
  - Response body:
    ```json
    {
      gameInfo: {
        game: {
            gameId: 1,
            length: 30,
            blanks: [1, 5, 6],
            revealed: ['A'],
            guessedLetters: ['A'],
        },
        present: true,
        correct: null,
        status: 'playing',
        msg: 'Yes'
      },
      user
    }
    ```
- POST `/api/games/:gameId/phrase`
  - request parameters
  - Request body:
    ```json
    {
      phrase: 'This is an example for a phrase',
    }
    ```
  - Response body:
    ```json
    {
      gameInfo: {
        game: {
            gameId: 1,
            length: 30,
            blanks: [1, 5, 6],
            revealed: ['A'],
            guessedLetters: ['A'],
        },
        present: null,
        correct: false,
        status: 'playing',
        msg: 'The phrase is not correct'
      },
      user
    }
    ```
- ...

## Database Tables

- Table `users` - contains xx yy zz
- Table `phrase` - contains ww qq ss
- Table `easyPhrases` - contains ww qq ss

## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- carmelogulino, Cgulino28
- mariorossi, Mrossi28
- lucaneri, Lneri28

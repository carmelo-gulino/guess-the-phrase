import sqlite from 'sqlite3';
import crypto from 'crypto';
import Letter from './models/letterModel.mjs';

const db = new sqlite.Database('GuessThePhrase.sqlite', (err) => {
    if (err) {
        throw err;
    }
});

export const getLetters = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM letters';
        db.all(sql, [], function(err, rows) {
            if (err) {
                reject(err);
            } else {
                const letters = rows.map(row => new Letter(row.type, row.symbol, row.cost));
                resolve(letters);
            }
        })
    });
}

/** EASY PHRASE */
export const getEasyPhrase = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT text FROM easyPhrases ORDER BY RANDOM() LIMIT 1';
        db.get(sql, [], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row.text);
            }
        });
    })
}

export const getPhrase = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT text FROM phrases ORDER BY RANDOM() LIMIT 1';
        db.get(sql, [], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row.text);
            }
        });
    })
}

export const updateUser = (userId, coins, game_counter) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE users SET coins = ?, game_counter = ? WHERE id = ?';
        db.run(sql, [coins, game_counter, userId], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        })
    });
}

export const getUser = (username, password) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE username = ?';
        db.get(sql, [username], (err, row) => {
            if (err) {
                reject(err);
            } else if (row === undefined) {
                resolve(false);
            } else {
                const user = {id: row.id, username: row.username, coins: row.coins, game_counter:row.game_counter};

                crypto.scrypt(password, row.salt, 16, function (err, hashedPassword) {
                    if (err) reject(err);
                    if (!crypto.timingSafeEqual(Buffer.from(row.password, 'hex'), hashedPassword)) {
                        resolve(false);
                    } else {
                        resolve(user);
                    }
                });
            }
        });
    });
}
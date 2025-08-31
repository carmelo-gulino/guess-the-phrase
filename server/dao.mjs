import sqlite from 'sqlite3';
import crypto from 'crypto';

const db = new sqlite.Database('GuessThePhrase.sqlite', (err) => {
    if (err) {
        throw err;
    }
});

/** EASY PHRASE */
export const getEasyPhrase = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT text FROM easyPhrases where id = 1';
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
        const sql = 'SELECT text FROM phrases where id = 1';
        db.get(sql, [], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row.text);
            }
        });
    })
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
                const user = {id: row.id, username: row.username, coins: row.coins};

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
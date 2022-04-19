import db from "./createConnection.js"
//Can do npm run createdb to createdb
const isInDeleteMode = true;

if (isInDeleteMode) {
    db.exec("DROP TABLE IF EXISTS nonipas;");
    db.exec("DROP TABLE IF EXISTS ipas;");
    db.exec("DROP TABLE IF EXISTS users;");
}


db.exec(`CREATE TABLE IF NOT EXISTS nonipas (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name VARCHAR(70) NOT NULL,
    beertype VARCHAR(70) NOT NULL,
    abv DOUBLE NOT NULL
);`);

db.exec(`CREATE TABLE IF NOT EXISTS ipas (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name VARCHAR(70) NOT NULL,
    ipatype VARCHAR(70) NOT NULL,
    abv DOUBLE NOT NULL
);`);

db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(70) NOT NULL,
    password VARCHAR(70) NOT NULL
);`);

// Seed
if (isInDeleteMode) {
    db.run("INSERT INTO nonipas (name, beertype, abv) VALUES ('Spektrum', 'FruitedBerlinerWeisse', '4')");
    db.run("INSERT INTO ipas (name, ipatype, abv) VALUES ('Yakima', 'westcoast', '6')");
    db.run("INSERT INTO users (email, password) VALUES ('testmail@gmail.com', 'hej123')");
}
db.close();
//Include Modules
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT | 5000;
const sqlite3 = require("sqlite3");
const language = "de";

//Import CSS, JS, IMG files
app.use(express.static(__dirname + "/public/css"));
app.use(express.static(__dirname + "/public/js"));
app.use(express.static(__dirname + "/public/img"));

// ##################################################################### //
// ############################# Setup Side ############################ //
// ##################################################################### //

//Setup Get Request for "localhost:5000/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/html/game_new.html"));
});

//Frontend callback
app.get("/db_cards/:dynamic", (req, res) => {
  try {
    const { dynamic } = req.params;
    if (dynamic == "cards") {
      (async () => {
        res.send(await getCards());
      })();
    } else {
      (async () => {
        res.send(await getCardInfo(dynamic));
      })();
    }
  } catch (e) {
    console.log("Get '/db_cards/:dynamic' Error:\n" + e);
  }
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "/public/html/404.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ##################################################################### //
// ############################## Database ############################# //
// ##################################################################### //

var db = new sqlite3.Database("database/spielekarten.db");

//Get all possible Card-Words from Database
async function getCards() {
  try {
    const data = await new Promise((resolve) => {
      db.all('SELECT name FROM cards_' + language, (err, rows) => {
        i = 0;
        res = [];
        rows.forEach((row) => {
          res[i] = row.name;
          i++;
        });

        resolve(JSON.stringify(res));
      });
    });
    return data;
  } catch (e) {
    console.log("SQL Error:\n" + e);
  }
}

//Get all associated Card-Words from Database
async function getCardInfo(cardName) {
  try {
    const data = await new Promise((resolve) => {
      db.get(
        'SELECT * FROM cards_' + language + ' WHERE name="' + cardName + '"',
        (err, row) => {
          resolve(row);
        }
      );
    });
    if (data != null) {
      cardWords = [
        data.word_1,
        data.word_2,
        data.word_3,
        data.word_4,
        data.word_5,
      ];
    }
    else {
      cardWords = ["No Items Found"];
    }
    return JSON.stringify(cardWords);
  } catch (e) {
    console.log("SQL Error:\n" + e);
  }
}

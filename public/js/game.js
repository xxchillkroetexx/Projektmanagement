//* DB response URL
const dbResponseURL = "http://localhost:5000/db_cards/";

//Setup buttons and text fields
const falseBtn = document.getElementById("false");
const trueBtn = document.getElementById("true");
const skipBtn = document.getElementById("skip");
const cardWord = document.getElementById("h1_word");
const cardInfoWord = [document.getElementsByClassName("word_1"), document.getElementsByClassName("word_2"), document.getElementsByClassName("word_3"), document.getElementsByClassName("word_4"), document.getElementsByClassName("word_5")];

// ##################################################################### //
// ######################## Database Integration ####################### //
// ##################################################################### //

//Current-Card-Data
var textCurrentCard = "";

//Get infos from DB and setup new Card
async function nextCard() {
    
    //get available Cards
    const cardsRS = await fetch(dbResponseURL + "cards", {
        method: "GET",
    });
    const cardsDATA = await cardsRS.json();

    //get random Card
    do {
        numberNextCard = Math.floor(Math.random() * cardsDATA.length);
    } while (cardsDATA[numberNextCard] == textCurrentCard);

    textCurrentCard = cardsDATA[numberNextCard];

    //Get card infos
    const infoRS = await fetch(dbResponseURL + textCurrentCard, {
        method: "GET",
    });

    const infoDATA = await infoRS.json();

    //!Other style needed
    //Complete card
    console.log(infoDATA);
    i = 0;
    infoDATA.forEach((element) => {
        cardInfoWord[i][0].innerText = infoDATA[i] ;
        i++;
    });
    cardWord.innerHTML = textCurrentCard;
}

// ##################################################################### //
// ############################# SPIELLOGIK ############################ //
// ##################################################################### //



/*
// Spielkarten aus ./assets/spielkarten.json in Array "cards" importieren
fetch("./assets/spielkarten.json")
    .then((response) => {
        return response.json;
    })
    .then((jsondata) => console.info(jsondata));
console.log("hello World");
*/

/**
 *  Zufällige Karte aus Array "cards" anzeigen
 */

/**
 * Buttons mit Funktion versehen
 */
skipBtn.addEventListener("click", nextCard);

/**
 * TIMER LAUFEN LASSEN
 */

// Set the date we're counting down to
localStorage.time = 1000; // spaeter: abfrage von eingabe

// Update the count down every 1 second

function countdown() {
    time = parseInt(localStorage.time);

    if (isNaN(time) || time > 30 * 60) {
        alert("An error occured: time left variable is corrupted, resetting timer");
        localStorage.time = 30 * 60; //30 minutes in seconds
        countdown();
        return null;
    }

    /* TIMER ABGELAUFEN */
    if (time <= 0) {
        alert("TIMER EXPIRED!");
        return null;
    }

    //Decrementing time and recalling the function in 1 second
    document.getElementById("timer").innerText = formatTime(time);
    time--;
    localStorage.time = time;
    setTimeout("countdown()", 1000);
}

function formatTime(time) {
    minutes = Math.floor(time / 60);
    seconds = time - minutes * 60;

    if (String(seconds).length == 1) {
        return String(minutes) + ":0" + String(seconds);
    }
    return String(minutes) + ":" + String(seconds);
}

countdown();

/**
 * Anzeige unterbinden, wenn Timer auf 00:00 steht
 */

/**
 * Teams wechseln
 */

nextCard();

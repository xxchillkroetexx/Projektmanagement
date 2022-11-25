//* DB response URL
const dbResponseURL = "./db_cards/";

//Setup buttons and text fields
const falseBtn = document.getElementById("false");
const trueBtn = document.getElementById("true");
const skipBtn = document.getElementById("skip");
const cardWord = document.getElementById("h1_word");
const cardInfoWord = [document.getElementsByClassName("word_1"), document.getElementsByClassName("word_2"), document.getElementsByClassName("word_3"), document.getElementsByClassName("word_4"), document.getElementsByClassName("word_5")];
const pointsTeam1 = document.getElementById("spielstandTeam1");
const pointsTeam2 = document.getElementById("spielstandTeam2");
var currentTeam = 1;
var roundTime = 120; // spaeter: abfrage von eingabe

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
        cardInfoWord[i][0].innerText = infoDATA[i];
        i++;
    });
    cardWord.innerHTML = textCurrentCard;
}

// ##################################################################### //
// ############################# SPIELLOGIK ############################ //
// ##################################################################### //


function trueBtnClicked() {
    if (currentTeam == 1) {
        points = parseInt(pointsTeam1.innerHTML);
        points++;
        pointsTeam1.innerHTML = points.toString();
    }
    else if (currentTeam == 2) {
        points = parseInt(pointsTeam2.innerHTML);
        points++;
        pointsTeam2.innerHTML = points.toString();
    }
    
    nextCard();
}

function falseBtnClicked() {
    if (currentTeam == 1) {
        points = parseInt(pointsTeam2.innerHTML);
        points++;
        pointsTeam2.innerHTML = points.toString();
    }
    else if (currentTeam == 2) {
        points = parseInt(pointsTeam1.innerHTML);
        points++;
        pointsTeam1.innerHTML = points.toString();
    }
    nextCard();
}
/**
 * Buttons mit Funktion versehen
 */
skipBtn.addEventListener("click", nextCard);
falseBtn.addEventListener("click", falseBtnClicked)
trueBtn.addEventListener("click", trueBtnClicked);

/**
 * TIMER LAUFEN LASSEN
 */

// Set the date we're counting down to
localStorage.time = roundTime;

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
        const confirmed = confirm("Zeit abgelaufen! Bitte die Teams wechseln.\nDer neue Timer startet nach einem Klick auf 'OK'.");
        if (confirmed) {
            localStorage.time = roundTime;

            if (currentTeam == 1) {
                currentTeam = 2;
            }
            else {
                currentTeam = 1;
            }

            countdown();



        }
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

async function resetTime() {
    localStorage.time = roundTime;
    return null;
}


/**
 * Teams wechseln nach Rundenende
 */
async function roundOver() {
    //change Team
    if (currentTeam == 1) {
        currentTeam = 2
    }
    else {
        currentTeam = 1
    }
    return null;

}
function popUpAlert() {
    if (localStorage.time <= 0) {
        alert("Zeit abgelaufen! Bitte die Teams wechseln.\nDer neue Timer startet nach einem Klick auf 'OK'.");
        resetTime();
        roundOver();
    }
}
popUpAlert();
countdown();
nextCard();


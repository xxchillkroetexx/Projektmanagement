//SPIELLOGIK

// Spielkarten aus ./assets/spielkarten.json in Array "cards" importieren
async function getCards() {
    const requestURL = "https://github.com/xxchillkroetexx/Projektmanagement/blob/main/assets/spielkarten.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    const cards = await response.json();
    return cards;
}



function showCard() {
    document.getElementById("foot").innerText = getCards();
}
showCard();

// Zufällige Karte aus Array "cards" anzeigen

// Buttons mit Funktion versehen

// Anzeige unterbinden, wenn Timer auf 00:00 steht
// Teams wechseln
// Neue Karte anzeigen

// Set the date we're counting down to
localStorage.time = 10; // spaeter: abfrage von eingabe

// Update the count down every 1 second

function countdown() {
  time = parseInt(localStorage.time);

  if (isNaN(time) || time > (30 * 60)) {
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
const btnStart = document.getElementById("start_btn");
const btnSettings = document.getElementById("settings_btn");
const btnInfo = document.getElementById("info_btn");

btnStart.addEventListener("click", onBtnStartClicked, false);
btnSettings.addEventListener("click", onBtnSettingsClicked);
btnInfo.addEventListener("click", onBtnInfoClicked);

function onBtnStartClicked(){
    console.log("click");
}

function onBtnSettingsClicked(){
}

function onBtnInfoClicked(){
}


const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const resetButton = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completeInput = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

//Set Date Input Min with Today's Date

const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// Populate Countdown/Update UI
function updateDom() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    distance = countdownValue - now - 3 * hour;

    //Hide Input
    inputContainer.hidden = true;

    if (distance < 0) {
      countdownEl.hidden = true;
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      clearInterval(countdownActive);
      completeInput.hidden = false;
    } else {
      const days = Math.floor(distance / day);
      const hours = Math.floor((distance % day) / hour);
      const minutes = Math.floor((distance % hour) / minute);
      const seconds = Math.floor((distance % minute) / second);

      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;

      //Show Countdown
      countdownEl.hidden = false;
    }
  }, 1000);
}

//Take Values from Input Form

function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem("countdown", JSON.stringify(savedCountdown));

  if (countdownDate === "") {
    alert("Please choose a date for your countdown");
  } else {
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
  }
}

//Reset all values

function reset() {
  //Hide countdown, Show Input
  countdownEl.hidden = true;
  completeInput.hidden = true;
  inputContainer.hidden = false;
  //Stop the countdown
  clearInterval(countdownActive);
  //Reset values
  countdownTitle = "";
  countdownDate = "";
  localStorage.removeItem("countdown");
}

//Load Previous Countdown data if available
function previousCountdown() {
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
  }
}

//Event Listeners
countdownForm.addEventListener("submit", updateCountdown);
resetButton.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

//On Page load, check local Storage

previousCountdown();

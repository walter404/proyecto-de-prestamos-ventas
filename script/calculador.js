// Elementos  
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
const titleEl = document.getElementById('title');
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const resetBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');
const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');
// Globales Variables  
let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
let savedCountdown;
// Tiempo Variables  
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
//  datos input   
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

function updateDOM() {
    countdownActive = setInterval(() => {

        const now = new Date().getTime();
        const distance = countdownValue - now;

        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        inputContainer.hidden = true;

        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} countdown finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else {

            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
    }, second);
}
//  Values from form input  
function updateCountdown(event) {
    event.preventDefault();
    countdownTitle = event.srcElement[0].value;
    countdownDate = event.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    // for valido date  
    if (countdownDate === '') {
        alert('Please select a date for the countdown.');
    } else {
        // Get the numbner version of current date and update DOM  
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}
// Reset  values  
function reset() {
    // Hide Countdown and show input  
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    // Stop the countdown  
    clearInterval(countdownActive);
    // Reset Values  
    countdownTitle = '';
    countdownDate = '';
    titleEl.value = '';
    dateEl.value = '';
    localStorage.removeItem('countdown');
}
// from localStorage 
function restorePreviousCountdown() {
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}
// Event Listener  
countdownForm.addEventListener('submit', updateCountdown);
resetBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);
// On Load  
restorePreviousCountdown();
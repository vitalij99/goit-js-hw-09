import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputData = document.querySelector("input[type='text']")
const startBtn = document.querySelector("[data-start]")

const rest = {
  days : document.querySelector("[data-days]"),
  hours : document.querySelector("[data-hours]"),
  minutes : document.querySelector("[data-minutes]"),
  seconds : document.querySelector("[data-seconds]"),
}


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  
  onClose(selectedDates) {
    // const timeToDeadline = convertMs(selectedDates[0] - options.defaultDate);
    
    if (selectedDates[0] > options.defaultDate) {
      Notiflix.Notify.success('Start');
      startBtn.disabled = false;
      
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    }

  },
  onOpen() {
    clearInterval(timerId)
    initializeTimer({days:0, hours:0, minutes:0, seconds:0})
  }
};

const fp = flatpickr(inputData, options);
startBtn.addEventListener("click", getTimerStart)
let timerId = null


function getTimerStart() {
 const timer = convertMs(fp.selectedDates[0] - Date.now())
  initializeTimer(timer)  
  
  
  timerId = setInterval(timeToDeadline, 1000);
  
  startBtn.disabled = true  
}
function timeToDeadline() {
  const timer = convertMs(fp.selectedDates[0] - Date.now())
  const { days, hours, minutes, seconds } = timer
  
  initializeTimer(timer)
  
  if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
    Notiflix.Notify.success('End');
    clearInterval(timerId)    
  }
} 
 
function initializeTimer({ days, hours, minutes, seconds }) {
  rest.days.textContent = addLeadingZero(days)
  rest.hours.textContent = addLeadingZero(hours)
  rest.minutes.textContent = addLeadingZero(minutes)
  rest.seconds.textContent = addLeadingZero(seconds)
}
function addLeadingZero(value) {
  return value.toString().padStart(2,"0")
  
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
  
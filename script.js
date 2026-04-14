let timer;
let defaultTime = 25 * 60;
let timeLeft = defaultTime;
let isRunning = false;

const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const timerCircle = document.querySelector('.timer-circle');
const timeInput = document.getElementById('time-input');
const alarmSound = document.getElementById('alarm-sound');

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    timeDisplay.textContent = `${minutes}:${seconds}`;
    timeDisplay.style.fontSize = '6rem';
}

function calculateDefaultTime() {
    let m = parseInt(timeInput.value);

    if (isNaN(m) || m < 1) m = 1;
    if (m > 75) m = 75;

    // Update value inside the box if it was forcibly bounded
    timeInput.value = m;

    return m * 60;
}

// When input changes, update immediately if not running
timeInput.addEventListener('change', () => {
    if (!isRunning) {
        defaultTime = calculateDefaultTime();
        timeLeft = defaultTime;
        updateDisplay();
    }
});

function playAlarm() {
    alarmSound.currentTime = 0;
    alarmSound.play().catch(error => console.log("Audio play failed", error));
}

function startTimer() {
    // If it's already running, no logic needed here
    if (isRunning) return;

    // If we are starting fresh (from fully completed or from initial/reset state), take input value
    if (timeLeft <= 0 || timeLeft === defaultTime) {
        defaultTime = calculateDefaultTime();
        timeLeft = defaultTime;
        updateDisplay();
    }

    isRunning = true;
    startBtn.textContent = 'Tạm dừng';
    startBtn.classList.remove('btn-primary', 'btn-success');
    startBtn.classList.add('btn-warning');
    timerCircle.classList.add('running');

    timer = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            isRunning = false;
            startBtn.textContent = 'Bắt đầu';
            startBtn.classList.remove('btn-warning', 'btn-success');
            startBtn.classList.add('btn-primary');
            timerCircle.classList.remove('running');

            timeLeft = 0;
            updateDisplay();
            playAlarm();

            // Sync with input automatically so next start is fresh
            defaultTime = calculateDefaultTime();
            timeLeft = defaultTime;
        }
    }, 1000);
}

function pauseTimer() {
    if (!isRunning) return;

    clearInterval(timer);
    isRunning = false;
    startBtn.textContent = 'Tiếp tục';
    startBtn.classList.remove('btn-warning', 'btn-primary');
    startBtn.classList.add('btn-success');
    timerCircle.classList.remove('running');
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;

    // Force reset with current input box value
    defaultTime = calculateDefaultTime();
    timeLeft = defaultTime;

    startBtn.textContent = 'Bắt đầu';
    startBtn.classList.remove('btn-warning', 'btn-success');
    startBtn.classList.add('btn-primary');
    timerCircle.classList.remove('running');

    updateDisplay();
}

startBtn.addEventListener('click', () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);

updateDisplay();

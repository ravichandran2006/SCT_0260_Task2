let timer;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapCount = 0;

function updateTimeDisplay() {
    const timeDisplay = document.getElementById('time-display');
    timeDisplay.textContent = formatTime(hours, minutes, seconds);
}

function formatTime(hours, minutes, seconds) {
    return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
}

function padTime(time) {
    return time < 10 ? '0' + time : time;
}

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        document.getElementById('start').textContent = "Pause";
        document.getElementById('pause').disabled = false;
        document.getElementById('reset').disabled = false;

        timer = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
            updateTimeDisplay();
        }, 1000);
    } else {
        pauseStopwatch();
    }
}

function pauseStopwatch() {
    isRunning = false;
    document.getElementById('start').textContent = "Resume";
    clearInterval(timer);
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapCount = 0;
    document.getElementById('start').textContent = "Start";
    document.getElementById('pause').disabled = true;
    document.getElementById('reset').disabled = true;
    document.getElementById('lap-list').innerHTML = '';
    updateTimeDisplay();
}

function recordLap() {
    if (isRunning) {
        lapCount++;
        const lapTime = formatTime(hours, minutes, seconds);
        const lapList = document.getElementById('lap-list');
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}

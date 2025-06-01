const timerInput = document.getElementById("timerInput");
const startBtn = document.getElementById("startBtn");

document.getElementById('clock').style.display = 'none';
document.getElementById('countdown').style.display = 'none';

function startingCountdown() {
    document.getElementById('clock').style.display = 'block';
    document.getElementById('countdown').style.display = 'block';
    startBtn.style.display = 'none';
    timerInput.style.display = 'none';

    let seconds = timerInput.value;

    function updateTimer() {
        document.getElementById('countdown').textContent = seconds;
        seconds--;

        if (seconds < 0) {
            document.getElementById('clock').style.display = 'none';
            document.getElementById('countdown').style.display = 'none';

            document.getElementById('newYearMessage').style.display = 'block';
            clearInterval(intervalId);

            confetti({
                particleCount: 200,
                spread: 100,
                origin: { x: 0.5, y: 0.5 }
            });
        }
    }

    updateTimer();

    const intervalId = setInterval(updateTimer, 1000);
}

startBtn.addEventListener("click", startingCountdown);
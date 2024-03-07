const timeInput = document.getElementById('inputTime');
const startButton = document.getElementById('start');
const timeOutput = document.getElementById('timer');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const loadingSpinner = document.getElementById('circleG'); // Add this line
const startText = document.getElementById('startText');
const resumeText = document.getElementById('resumeText'); // Add this line


startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

let totalSeconds = 0;
let intervalId = null;

function startTimer() {
    startButton.disabled = true; // Disable the start button
    startText.style.display = 'none'; // Hide the text content
    loadingSpinner.style.display = 'block'; // Show the loading spinner
    timeInput.disabled = true;
    timeInput.classList.toggle('hidden-clock', true); // Add hidden-clock class


    const inputTimeArray = timeInput.value.split(":"); // Splitting the input value
    const minutes = parseInt(inputTimeArray[0]);
    const seconds = parseInt(inputTimeArray[1]);
  
    totalSeconds = minutes * 60 + seconds;
    clearInterval(intervalId);
  
    intervalId = setInterval(function() {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateTimerDisplay(totalSeconds);
      } else {
        clearInterval(intervalId);
        startButton.disabled = false; // Enable the start button
        loadingSpinner.style.display = 'none';
        startText.style.display = 'none'; // Hide the text content
      }
    }, 1000);
    // Update the button content based on the state
    startButton.disabled = true;
    loadingSpinner.style.display = 'block';
    startText.style.display = 'none';
    resumeText.style.display = 'none';
  }

function stopTimer() {
    clearInterval(intervalId);
    startButton.disabled = false;
    loadingSpinner.style.display = 'none';
    startText.style.display = 'none';
    resumeText.style.display = 'block';
  }
  
function resetTimer() {
    clearInterval(intervalId);
    totalSeconds = 0;
    updateTimerDisplay(totalSeconds);

    startButton.disabled = false;
    loadingSpinner.style.display = 'none';
    startText.style.display = 'inline';
    resumeText.style.display = 'none';
    
    // Enable the input field
    timeInput.disabled = false;
    timeInput.classList.toggle('hidden-clock', false); // Remove hidden-clock class
}

function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    timeOutput.innerText = formattedTime;
}
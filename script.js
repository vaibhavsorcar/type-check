const textDisplay = document.getElementById("text-display");
const inputArea = document.getElementById("input-area");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

let targetText = "Type this text exactly as it appears here."; // Start text
let startTime;
let timer;
let typedText = "";
let correctChars = 0;
let totalChars = 0;

// Function to generate random text
function generateRandomText() {
    // You can implement more complex text generation logic here
    const words = ["apple", "banana", "cherry", "date", "elephant"];
    targetText = words.join(" ");
    textDisplay.textContent = targetText;
}

// Function to start the timer
function startTimer() {
    startTime = Date.now();
    timer = setInterval(() => {
        let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        timerDisplay.textContent = elapsedTime;
        updateWPM(elapsedTime);
    }, 1000);
}

// Function to calculate WPM and accuracy
function updateWPM(timeElapsed) {
    const typedWords = typedText.split(" ").length;
    const wpm = Math.floor((typedWords / timeElapsed) * 60);
    wpmDisplay.textContent = wpm;

    const accuracy = Math.floor((correctChars / totalChars) * 100);
    accuracyDisplay.textContent = accuracy;
}

// Event listener for typing input
inputArea.addEventListener("input", (e) => {
    const inputText = e.target.value;

    // Update typedText for speed and accuracy calculation
    typedText = inputText;
    totalChars = inputText.length;
    correctChars = 0;

    // Compare input with target text
    for (let i = 0; i < Math.min(inputText.length, targetText.length); i++) {
        if (inputText[i] === targetText[i]) {
            correctChars++;
        }
    }

    if (inputText === targetText) {
        // End the game
        clearInterval(timer);
        alert("Well done! You completed the text!");
    }

    // Update WPM and accuracy
    updateWPM(Math.floor((Date.now() - startTime) / 1000));
});

// Initialize the game
generateRandomText();
startTimer();

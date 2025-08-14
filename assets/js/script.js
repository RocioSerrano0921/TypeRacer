console.log('TypeRacer webApp');

document.addEventListener('DOMContentLoaded', function () {
    // Sample texts for each difficulty
    const sampleTexts = {
        easy: [
            'The quick brown fox jumps over the lazy dog.',
            'Pack my box with five dozen liquor jugs.',
            'How vexingly quick daft zebras jump!',
        ],
        medium: [
            'She sells seashells by the seashore, and the shells she sells are surely seashells.',
            'A mad boxer shot a quick, gloved jab to the jaw of his dizzy opponent.',
            'The five boxing wizards jump quickly, making the crowd cheer loudly.',
        ],
        hard: [
            'Jinxed wizards pluck ivy from the big quilted fox den while the wind howls outside.',
            'Crazy Frederick bought many very exquisite opal jewels, dazzling everyone at the gala.',
            'Sympathizing would fix Quaker objectives, but the job requires extra skill and patience.',
        ],
    };

    // Timing variables
    let startTime = null;
    let endTime = null;

    // DOM elements
    const difficultySelect = document.getElementById('difficultySelect');
    const sampleTextDiv = document.getElementById('sample-text');
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const retryBtn = document.getElementById('retry-btn');
    const userInput = document.getElementById('user-input');
    const resultLevel = document.getElementById('result-level');
    const resultTime = document.getElementById('result-time');
    const resultWpm = document.getElementById('result-wpm');

    // Display random sample text based on difficulty
    function displayRandomText(difficulty) {
        const texts = sampleTexts[difficulty]; // Get the array of texts for the selected difficulty
        const randomIndex = Math.floor(Math.random() * texts.length); // Get a random index from the array
        sampleTextDiv.textContent = texts[randomIndex]; // Display the selected text
        resultLevel.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1); //It capitalizes the first letter of the difficulty category
    }

    // Start test
    function startTest() {
        startTime = performance.now(); // Record the start time
        endTime = null;
        startBtn.disabled = true; //disable the start button right after the user clicks it
        stopBtn.disabled = false; //enable the stop button right after the user clicks the start button
        userInput.value = ''; //clear the user input area
        userInput.disabled = false; // Enable textarea when test starts
        userInput.focus(); //focus on the user input area after clicking start
        resultTime.textContent = '-'; //reset the result time display
    }

    // Stop test
    function stopTest() {
        if (startTime) {
            endTime = performance.now();
            const elapsedSeconds = ((endTime - startTime) / 1000).toFixed(2);
            resultTime.textContent = `${elapsedSeconds} s`;

            // Calculate WPM
            const sampleText = sampleTextDiv.textContent;
            const userText = userInput.value;
            const correctWords = countCorrectWords(sampleText, userText);
            const minutes = (endTime - startTime) / 60000; // time in minutes
            const wpm = minutes > 0 ? Math.round(correctWords / minutes) : 0;
            resultWpm.textContent = wpm;

            // Display difficulty level
            resultLevel.textContent =
                difficultySelect.value.charAt(0).toUpperCase() + difficultySelect.value.slice(1);
        }
        startBtn.disabled = false;
        stopBtn.disabled = true;
        userInput.disabled = true; // Disable textarea after test ends
    }

    // Retry test
    function retryTest() {
        userInput.value = ''; // Clear the user input area
        resultTime.textContent = '-'; // Reset the result time display
        startBtn.disabled = false; // Enable the start button
        stopBtn.disabled = true; // Disable the stop button
        userInput.disabled = true; // Disable textarea on retry
    }

    // Helper function to count correctly typed words
    function countCorrectWords(sample, input) {
        const sampleWords = sample.trim().split(/\s+/); // Split the sample text into words and creates an array with them so this variable is an array
        const inputWords = input.trim().split(/\s+/); // Split the user input into words and creates an array with them so this variable is an array
        let correct = 0;
        for (let i = 0; i < Math.min(sampleWords.length, inputWords.length); i++) {
            if (sampleWords[i] === inputWords[i]) {
                correct++;
            }
        }
        return correct;
    }

    // Event listeners
    difficultySelect.addEventListener('change', function (e) {
        displayRandomText(e.target.value);
        retryTest();
    });

    startBtn.addEventListener('click', startTest);
    stopBtn.addEventListener('click', stopTest);
    retryBtn.addEventListener('click', retryTest);

    // Initial setup
    stopBtn.disabled = true;
    userInput.disabled = true; // Disable textarea until test starts
    displayRandomText(difficultySelect.value);
});

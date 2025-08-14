console.log('TypeRacer webApp');

document.addEventListener('DOMContentLoaded', function () {
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

    function displayRandomText(difficulty) {
        const texts = sampleTexts[difficulty]; // Get the array of texts for the selected difficulty from sampleTexts
        const randomIndex = Math.floor(Math.random() * texts.length); // Generate a random index based on the length of the selected texts
        document.getElementById('sample-text').textContent = texts[randomIndex]; // Display the randomly selected text on the <div> with id "sample-text"
    }

    const difficultySelect = document.getElementById('difficultySelect'); // Get the select element for difficulty
    difficultySelect.addEventListener('change', function (e) {
        displayRandomText(e.target.value); // Display a random text for the selected difficulty depend on the selected value
    });

    // Show a random text on initial load
    displayRandomText(difficultySelect.value);
});

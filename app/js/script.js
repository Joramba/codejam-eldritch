import ancientsData from "../data/ancients.js";
import difficulties from "../data/difficulties.js"

const ancientCards = document.querySelectorAll('.ancient-card'),
    ancientContainer = document.querySelector('.ancient-container'),
    levelButtons = document.querySelectorAll('.difficulty'),
    difficultyContainer = document.querySelector('.difficulty-container'),
    shuffleButton = document.querySelector('.deck-button'),
    deckContainer = document.querySelector('.deck-container');

deckContainer.innerHTML = '';
let ancientId, levelId;

function showButton() {
    if (difficultyContainer.classList.contains('select') && ancientContainer.classList.contains('select')) {
        deckContainer.appendChild(shuffleButton);
    }
}

ancientCards.forEach((item, i) => {
    item.addEventListener('click', () => {
        ancientCards.forEach((selected) => {
            selected.classList.remove('selected');
        });
        deckContainer.innerHTML = '';
        item.classList.add('selected');
        ancientContainer.classList.add('select');
        ancientId = i;
        showButton();
    })
});

levelButtons.forEach((item, i) => {
    item.addEventListener('click', () => {
        levelButtons.forEach((selected) => {
            selected.classList.remove('selected')
        });
        deckContainer.innerHTML = '';
        item.classList.add('selected');
        difficultyContainer.classList.add('select');
        levelId = i;
        showButton();
    })
});

shuffleButton.addEventListener('click', () => {
    console.log(ancientId)
    const greenCards = ancientsData[ancientId].firstStage.greenCards + ancientsData[ancientId].secondStage.greenCards + ancientsData[ancientId].thirdStage.greenCards;
    const blueCards = ancientsData[ancientId].firstStage.blueCards + ancientsData[ancientId].secondStage.blueCards + ancientsData[ancientId].thirdStage.blueCards;
    const brownCards = ancientsData[ancientId].firstStage.brownCards + ancientsData[ancientId].secondStage.brownCards + ancientsData[ancientId].thirdStage.brownCards;

    deckContainer.innerHTML = `
        <div class="current-state">
            <div class="stage-container">
                <span class="stage-text">First Stage</span>
                <div class="dot-container">
                    <div class="dot green">${ancientsData[ancientId].firstStage.greenCards}</div>
                    <div class="dot brown">${ancientsData[ancientId].firstStage.brownCards}</div>
                    <div class="dot blue">${ancientsData[ancientId].firstStage.blueCards}</div>
                </div>
            </div>
            <div class="stage-container">
                <span class="stage-text">Second Stage</span>
                <div class="dot-container">
                <div class="dot green">${ancientsData[ancientId].secondStage.greenCards}</div>
                <div class="dot brown">${ancientsData[ancientId].secondStage.brownCards}</div>
                <div class="dot blue">${ancientsData[ancientId].secondStage.blueCards}</div>
                </div>
            </div>
            <div class="stage-container">
                <span class="stage-text">Third Stage</span>
                <div class="dot-container">
                <div class="dot green">${ancientsData[ancientId].thirdStage.greenCards}</div>
                <div class="dot brown">${ancientsData[ancientId].thirdStage.brownCards}</div>
                <div class="dot blue">${ancientsData[ancientId].thirdStage.blueCards}</div>
                </div>
            </div>
        </div>
        <div class="deck"></div>
        <div class="last-card"></div>
        `;

    console.log(greenCards);
    console.log(blueCards);
    console.log(brownCards);
});


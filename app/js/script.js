import ancientsData from "../data/ancients.js";
import difficulties from "../data/difficulties.js"

console.log(difficulties);
console.log(ancientsData);

const ancientCards = document.querySelectorAll('.ancient-card'),
    ancientContainer = document.querySelector('.ancient-container'),
    levelButtons = document.querySelectorAll('.difficulty'),
    difficultyContainer = document.querySelector('.difficulty-container'),
    shuffleButton = document.querySelector('.deck-button'),
    deckContainer = document.querySelector('.deck-container');

ancientCards.forEach((item) => {
    item.addEventListener('click', () => {
        ancientCards.forEach((selected) => {
            selected.classList.remove('selected')
        });
        item.classList.add('selected');
        ancientContainer.classList.add('select');
    })
});

levelButtons.forEach((item) => {
    item.addEventListener('click', () => {
        levelButtons.forEach((selected) => {
            selected.classList.remove('selected')
        });
        item.classList.add('selected');
        difficultyContainer.classList.add('select');
    })
})

let statusMessage = document.createElement('div');
statusMessage.style.cssText = `
margin-top: 15px;
font-size: 15px;
color: red;
`;
deckContainer.appendChild(statusMessage);


shuffleButton.addEventListener('click', () => {
    if ((ancientContainer.classList.contains('select')) && (difficultyContainer.classList.contains('select'))) {
        console.log(1);
        statusMessage.textContent = "";
    } else if (!(ancientContainer.classList.contains('select'))) {
        statusMessage.textContent = 'Select the ancient card';

    } else if (!(difficultyContainer.classList.contains('select'))) {
        statusMessage.textContent = 'Select the level';
    }
});


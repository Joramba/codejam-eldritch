import ancientsData from "../data/ancients.js";
import difficulties from "../data/difficulties.js";
import cardsDataGreen from "../data/mythicCards/green/index.js";
import cardsDataBrown from "../data/mythicCards/brown/index.js";
import cardsDataBlue from "../data/mythicCards/blue/index.js";

// import cards from "../assets/MythicCards/green/index.js";

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

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    const AmountgreenCards = ancientsData[ancientId].firstStage.greenCards + ancientsData[ancientId].secondStage.greenCards + ancientsData[ancientId].thirdStage.greenCards;
    const AmountblueCards = ancientsData[ancientId].firstStage.blueCards + ancientsData[ancientId].secondStage.blueCards + ancientsData[ancientId].thirdStage.blueCards;
    const AmountbrownCards = ancientsData[ancientId].firstStage.brownCards + ancientsData[ancientId].secondStage.brownCards + ancientsData[ancientId].thirdStage.brownCards;

    deckContainer.innerHTML = `
        <div class="current-state">
            <div class="stage-container ">
                <span class="stage-text">First Stage</span>
                <div class="dot-container first">
                    <div class="dot green">${ancientsData[ancientId].firstStage.greenCards}</div>
                    <div class="dot brown">${ancientsData[ancientId].firstStage.brownCards}</div>
                    <div class="dot blue">${ancientsData[ancientId].firstStage.blueCards}</div>
                </div>
            </div>
            <div class="stage-container">
                <span class="stage-text">Second Stage</span>
                <div class="dot-container second">
                <div class="dot green">${ancientsData[ancientId].secondStage.greenCards}</div>
                <div class="dot brown">${ancientsData[ancientId].secondStage.brownCards}</div>
                <div class="dot blue">${ancientsData[ancientId].secondStage.blueCards}</div>
                </div>
            </div>
            <div class="stage-container">
                <span class="stage-text">Third Stage</span>
                <div class="dot-container third">
                <div class="dot green">${ancientsData[ancientId].thirdStage.greenCards}</div>
                <div class="dot brown">${ancientsData[ancientId].thirdStage.brownCards}</div>
                <div class="dot blue">${ancientsData[ancientId].thirdStage.blueCards}</div>
                </div>
            </div>
        </div>
        <div class="deck"></div>
        <div class="last-card"></div>
        `;

    const deck = document.querySelector('.deck');
    const lastCard = document.querySelector('.last-card');
    const stage_text = document.querySelectorAll('.stage-text');

    const firstContainer = document.querySelector('.first');
    const secondContainer = document.querySelector('.second');
    const thirdContainer = document.querySelector('.third');


    function levelEasy() {
        console.log("Level easy");
        let firstStage = [];
        let secondStage = [];
        let thirdStage = [];

        let greenEasy = [];
        let greenNormal = [];
        let greenHard = [];

        let brownEasy = [];
        let brownNormal = [];
        let brownHard = [];

        let blueEasy = [];
        let blueNormal = [];
        let blueHard = [];


        cardsDataGreen.forEach(item => {
            if (item.difficulty == 'easy') {
                greenEasy.push(item.id);
            }
            else if (item.difficulty == 'normal') {
                greenNormal.push(item.id);
            } else {
                greenHard.push(item.id);
            }
        });

        cardsDataBrown.forEach(item => {
            if (item.difficulty == 'easy') {
                brownEasy.push(item.id);
            }
            else if (item.difficulty == 'normal') {
                brownNormal.push(item.id);
            } else {
                brownHard.push(item.id);
            }
        });

        cardsDataBlue.forEach(item => {
            if (item.difficulty == 'easy') {
                blueEasy.push(item.id);
            }
            else if (item.difficulty == 'normal') {
                blueNormal.push(item.id);
            } else {
                blueHard.push(item.id);
            }
        });

        let greenNeeded = [];
        let brownNeeded = [];
        let blueNeeded = [];


        if (AmountgreenCards <= greenEasy.length) {
            const length = AmountgreenCards;

            for (let i = 0; i < length; i++) {
                let a = getRandom(0, greenEasy.length - 1);
                greenNeeded.push(greenEasy[a]);
                greenEasy.splice(a, 1);
            }

            for (let i = 0; i < ancientsData[ancientId].firstStage.greenCards; i++) {
                let a = getRandom(0, greenNeeded.length - 1);
                firstStage.push(greenNeeded[a]);
                greenNeeded.splice(a, 1);
            }

            for (let i = 0; i < ancientsData[ancientId].secondStage.greenCards; i++) {
                let a = getRandom(0, greenNeeded.length - 1);
                secondStage.push(greenNeeded[a]);
                greenNeeded.splice(a, 1);
            }

            for (let i = 0; i < ancientsData[ancientId].thirdStage.greenCards; i++) {
                let a = getRandom(0, greenNeeded.length - 1);
                thirdStage.push(greenNeeded[a]);
                greenNeeded.splice(a, 1);
            }

        } else {
            const length = AmountgreenCards;
            const dep = AmountgreenCards - greenEasy.length;

            for (let i = 0; i < length - 1; i++) {
                let a = getRandom(0, greenEasy.length - 1);
                greenNeeded.push(greenEasy[a]);
                greenEasy.splice(a, 1);
            }

            for (let i = 0; i < dep; i++) {
                let a = getRandom(0, greenNormal.length - 1);
                greenNeeded.push(greenNormal[a]);
                greenNormal.splice(a, 1);
            }

            for (let i = 0; i < ancientsData[ancientId].firstStage.greenCards; i++) {
                let a = getRandom(0, greenNeeded.length - 1);
                firstStage.push(greenNeeded[a]);
                greenNeeded.splice(a, 1);
            }

            for (let i = 0; i < ancientsData[ancientId].secondStage.greenCards; i++) {
                let a = getRandom(0, greenNeeded.length - 1);
                secondStage.push(greenNeeded[a]);
                greenNeeded.splice(a, 1);
            }

            for (let i = 0; i < ancientsData[ancientId].thirdStage.greenCards; i++) {
                let a = getRandom(0, greenNeeded.length - 1);
                thirdStage.push(greenNeeded[a]);
                greenNeeded.splice(a, 1);
            }
        }


        if (AmountbrownCards <= brownEasy.length) {
            const length = AmountbrownCards;

            for (let i = 0; i < length; i++) {
                let a = getRandom(0, brownEasy.length - 1);
                brownNeeded.push(brownEasy[a]);
                brownEasy.splice(a, 1);
            }

            for (let i = 0; i < ancientsData[ancientId].firstStage.brownCards; i++) {
                let a = getRandom(0, brownNeeded.length - 1);
                firstStage.push(brownNeeded[a]);
                brownNeeded.splice(a, 1);
            }

            for (let i = 0; i < ancientsData[ancientId].secondStage.brownCards; i++) {
                let a = getRandom(0, brownNeeded.length - 1);
                secondStage.push(brownNeeded[a]);
                brownNeeded.splice(a, 1);
            }

            for (let i = 0; i < ancientsData[ancientId].thirdStage.brownCards; i++) {
                let a = getRandom(0, brownNeeded.length - 1);
                thirdStage.push(brownNeeded[a]);
                brownNeeded.splice(a, 1);
            }


        } else {
            let length = brownEasy.length;
            const dep = AmountbrownCards - brownEasy.length;

            for (let i = 0; i < length; i++) {
                let a = getRandom(0, brownEasy.length - 1);
                brownNeeded.push(brownEasy[a]);
                brownEasy.splice(a, 1);
            }

            for (let i = 0; i < dep; i++) {
                let a = getRandom(0, brownNormal.length - 1);
                brownNeeded.push(brownNormal[a]);
                brownNormal.splice(a, 1);
            }

            for (let i = 0; i < ancientsData[ancientId].firstStage.brownCards; i++) {
                let a = getRandom(0, brownNeeded.length - 1);
                firstStage.push(brownNeeded[a]);
                brownNeeded.splice(a, 1);
            }

            for (let i = 0; i < ancientsData[ancientId].secondStage.brownCards; i++) {
                let a = getRandom(0, brownNeeded.length - 1);
                secondStage.push(brownNeeded[a]);
                brownNeeded.splice(a, 1);
            }

            for (let i = 0; i < ancientsData[ancientId].thirdStage.brownCards; i++) {
                let a = getRandom(0, brownNeeded.length - 1);
                thirdStage.push(brownNeeded[a]);
                brownNeeded.splice(a, 1);
            }
        }

        if (AmountblueCards <= blueEasy.length) {
            const length = AmountblueCards;

            for (let i = 0; i < length; i++) {
                let a = getRandom(0, brownNeeded.length - 1);
                blueNeeded.push(blueEasy[a]);
                blueEasy.splice(a, 1);
            }

            for (let i = 0; i < ancientsData[ancientId].firstStage.blueCards; i++) {
                let a = getRandom(0, blueNeeded.length - 1);
                firstStage.push(blueNeeded[a]);
                blueNeeded.splice(a, 1);
            }

            for (let i = 0; i < ancientsData[ancientId].secondStage.blueCards; i++) {
                let a = getRandom(0, blueNeeded.length - 1);
                secondStage.push(blueNeeded[a]);
                blueNeeded.splice(a, 1);
            }

            for (let i = 0; i < ancientsData[ancientId].thirdStage.blueCards; i++) {
                let a = getRandom(0, blueNeeded.length - 1);
                thirdStage.push(blueNeeded[a]);
                blueNeeded.splice(a, 1);
            }


        } else {
            const length = AmountblueCards;
            const dep = AmountblueCards - blueEasy.length;

            for (let i = 0; i < length; i++) {
                let a = getRandom(0, brownNeeded.length - 1);
                blueNeeded.push(blueEasy[a]);
                blueEasy.splice(a, 1);
            }

            for (let i = 0; i < dep; i++) {
                let a = getRandom(0, brownNeeded.length - 1);
                blueNeeded.push(blueNormal[a]);
                blueNormal.splice(a, 1);
            }

            for (let i = 0; i < ancientsData[ancientId].firstStage.blueCards; i++) {
                let a = getRandom(0, blueNeeded.length - 1);
                firstStage.push(blueNeeded[a]);
                blueNeeded.splice(a, 1);
            }

            for (let i = 0; i < ancientsData[ancientId].secondStage.blueCards; i++) {
                let a = getRandom(0, blueNeeded.length - 1);
                secondStage.push(blueNeeded[a]);
                blueNeeded.splice(a, 1);
            }

            for (let i = 0; i < ancientsData[ancientId].thirdStage.blueCards; i++) {
                let a = getRandom(0, blueNeeded.length - 1);
                thirdStage.push(blueNeeded[a]);
                blueNeeded.splice(a, 1);
            }

        }

        // //split on stages

        console.log(firstStage);
        console.log(secondStage);
        console.log(thirdStage);


        console.log(stage_text);

        deck.addEventListener('click', () => {
            const img = new Image();

            if (firstStage.length != 0) {
                let i = getRandom(0, firstStage.length - 1);

                img.src = `../assets/MythicCards/${firstStage[i].slice(0, firstStage[i].length - 2)}/${firstStage[i]}.png`;
                console.log(img);
                img.onload = () => {
                    lastCard.style.backgroundImage = `url(${img.src})`;
                }

                if (firstStage[i].slice(0, firstStage[i].length - 2) == 'green') {
                    firstContainer.querySelector('.green').textContent = ancientsData[ancientId].firstStage.greenCards - 1;
                    ancientsData[ancientId].firstStage.greenCards--;
                } else if (firstStage[i].slice(0, firstStage[i].length - 2) == 'brown') {
                    firstContainer.querySelector('.brown').textContent = ancientsData[ancientId].firstStage.brownCards - 1;
                    ancientsData[ancientId].firstStage.brownCards--;
                }
                else if (firstStage[i].slice(0, firstStage[i].length - 2) == 'blue') {
                    firstContainer.querySelector('.blue').textContent = ancientsData[ancientId].firstStage.blueCards - 1;
                    ancientsData[ancientId].firstStage.blueCards--;
                }

                firstStage.splice(i, 1);



            } else if (secondStage.length != 0) {
                stage_text[0].classList.add('done');

                let i = getRandom(0, secondStage.length - 1);

                img.src = `../assets/MythicCards/${secondStage[i].slice(0, secondStage[i].length - 2)}/${secondStage[i]}.png`;
                console.log(img);
                img.onload = () => {
                    lastCard.style.backgroundImage = `url(${img.src})`;
                }

                if (secondStage[i].slice(0, secondStage[i].length - 2) == 'green') {
                    secondContainer.querySelector('.green').textContent = ancientsData[ancientId].secondStage.greenCards - 1;
                    ancientsData[ancientId].secondStage.greenCards--;
                } else if (secondStage[i].slice(0, secondStage[i].length - 2) == 'brown') {
                    secondContainer.querySelector('.brown').textContent = ancientsData[ancientId].secondStage.brownCards - 1;
                    ancientsData[ancientId].secondStage.brownCards--;
                }
                else if (secondStage[i].slice(0, secondStage[i].length - 2) == 'blue') {
                    secondContainer.querySelector('.blue').textContent = ancientsData[ancientId].secondStage.blueCards - 1;
                    ancientsData[ancientId].secondStage.blueCards--;
                }

                secondStage.splice(i, 1);
            }
            else if (thirdStage.length != 0) {
                stage_text[1].classList.add('done');

                let i = getRandom(0, thirdStage.length - 1);

                img.src = `../assets/MythicCards/${thirdStage[i].slice(0, thirdStage[i].length - 2)}/${thirdStage[i]}.png`;
                console.log(img);
                img.onload = () => {
                    lastCard.style.backgroundImage = `url(${img.src})`;
                }

                if (thirdStage[i].slice(0, thirdStage[i].length - 2) == 'green') {
                    thirdContainer.querySelector('.green').textContent = ancientsData[ancientId].thirdStage.greenCards - 1;
                    ancientsData[ancientId].thirdStage.greenCards--;
                } else if (thirdStage[i].slice(0, thirdStage[i].length - 2) == 'brown') {
                    thirdContainer.querySelector('.brown').textContent = ancientsData[ancientId].thirdStage.brownCards - 1;
                    ancientsData[ancientId].thirdStage.brownCards--;
                }
                else if (thirdStage[i].slice(0, thirdStage[i].length - 2) == 'blue') {
                    thirdContainer.querySelector('.blue').textContent = ancientsData[ancientId].thirdStage.blueCards - 1;
                    ancientsData[ancientId].thirdStage.blueCards--;
                }

                thirdStage.splice(i, 1);

                if (thirdStage.length == 0) {
                    stage_text[2].classList.add('done');
                    deck.classList.add('hidden');
                }
            }
        });
    }

    function levelNormal() {
        console.log("Level Normal");
    }

    function levelHard() {
        console.log("Level Hard");
    }

    if (levelId == 0) {
        levelEasy();
    } else if (levelId == 1) {
        levelNormal();
    } else if (levelId == 2) {
        levelHard();
    }


});


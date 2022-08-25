import ancientsData from "../data/ancients.js";
import cardsDataGreen from "../data/mythicCards/green/index.js";
import cardsDataBrown from "../data/mythicCards/brown/index.js";
import cardsDataBlue from "../data/mythicCards/blue/index.js";

const ancientCards = document.querySelectorAll('.ancient-card'),
    ancientContainer = document.querySelector('.ancient-container'),
    levelButtons = document.querySelectorAll('.difficulty'),
    difficultyContainer = document.querySelector('.difficulty-container'),
    shuffleButton = document.querySelector('.deck-button'),
    deckContainer = document.querySelector('.deck-container');

let levelId, ancientId;

deckContainer.innerHTML = '';

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
    let firstGreen = ancientsData[ancientId].firstStage.greenCards,
        secondGreen = ancientsData[ancientId].secondStage.greenCards,
        thirdGreen = ancientsData[ancientId].thirdStage.greenCards,

        firstBrown = ancientsData[ancientId].firstStage.brownCards,
        secondBrown = ancientsData[ancientId].secondStage.brownCards,
        thirdBrown = ancientsData[ancientId].thirdStage.brownCards,

        firstBlue = ancientsData[ancientId].firstStage.blueCards,
        secondBlue = ancientsData[ancientId].secondStage.blueCards,
        thirdBlue = ancientsData[ancientId].thirdStage.blueCards;

    const AmountgreenCards = firstGreen + secondGreen + thirdGreen,
        AmountblueCards = firstBlue + secondBlue + thirdBlue,
        AmountbrownCards = firstBrown + secondBrown + thirdBrown;


    deckContainer.innerHTML = `
        <div class="current-state">
            <div class="stage-container ">
                <span class="stage-text">First Stage</span>
                <div class="dot-container first">
                    <div class="dot green">${firstGreen}</div>
                    <div class="dot brown">${firstBrown}</div>
                    <div class="dot blue">${firstBlue}</div>
                </div>
            </div>
            <div class="stage-container">
                <span class="stage-text">Second Stage</span>
                <div class="dot-container second">
                <div class="dot green">${secondGreen}</div>
                <div class="dot brown">${secondBrown}</div>
                <div class="dot blue">${secondBlue}</div>
                </div>
            </div>
            <div class="stage-container">
                <span class="stage-text">Third Stage</span>
                <div class="dot-container third">
                <div class="dot green">${thirdGreen}</div>
                <div class="dot brown">${thirdBrown}</div>
                <div class="dot blue">${thirdBlue}</div>
                </div>
            </div>
        </div>
        <div class="deck"></div>
        <div class="last-card"></div>
        `;

    const deck = document.querySelector('.deck'),
        lastCard = document.querySelector('.last-card'),
        stage_text = document.querySelectorAll('.stage-text'),

        firstContainer = document.querySelector('.first'),
        secondContainer = document.querySelector('.second'),
        thirdContainer = document.querySelector('.third');

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

    let greenNeeded = [];
    let brownNeeded = [];
    let blueNeeded = [];

    let cardsGreen = [];
    let cardsBrown = [];
    let cardsBlue = [];

    let cardsEasyGreen = [];
    let cardsEasyBrown = [];
    let cardsEasyBlue = [];

    let cardsHardGreen = [];
    let cardsHardlBrown = [];
    let cardsHardBlue = [];

    function cardsDataColor(array, easy, normal, hard) {
        array.forEach(item => {
            if (item.difficulty == 'easy') {
                easy.push(item.id);
            }
            else if (item.difficulty == 'normal') {
                normal.push(item.id);
            } else {
                hard.push(item.id);
            }
        });
    }

    function cardDataNormal(array, cards) {
        array.forEach(item => {
            cards.push(item.id);
        });
    }

    function cardDataEasy(array, cards) {
        array.forEach(item => {
            if (item.difficulty !== 'hard') {
                cards.push(item.id);
            }
        });
    }

    function cardDataHard(array, cards) {
        array.forEach(item => {
            if (item.difficulty !== 'easy') {
                cards.push(item.id);
            }
        });
    }



    cardsDataColor(cardsDataGreen, greenEasy, greenNormal, greenHard);
    cardsDataColor(cardsDataBrown, brownEasy, brownNormal, brownHard);
    cardsDataColor(cardsDataBlue, blueEasy, blueNormal, blueHard);

    cardDataNormal(cardsDataGreen, cardsGreen);
    cardDataNormal(cardsDataBrown, cardsBrown);
    cardDataNormal(cardsDataBlue, cardsBlue);

    cardDataEasy(cardsDataGreen, cardsEasyGreen);
    cardDataEasy(cardsDataBrown, cardsEasyBrown);
    cardDataEasy(cardsDataBlue, cardsEasyBlue);

    cardDataHard(cardsDataGreen, cardsHardGreen);
    cardDataHard(cardsDataBrown, cardsHardlBrown);
    cardDataHard(cardsDataBlue, cardsHardBlue);


    function setStages(amount, easy, normal, needed, first, second, third) {
        if (amount <= greenEasy.length) {
            let a;
            for (let i = 0; i < amount; i++) {
                a = getRandom(0, easy.length - 1);
                needed.push(easy[a]);
                easy.splice(a, 1);
            }


            for (let i = 0; i < first; i++) {
                a = getRandom(0, needed.length - 1);
                firstStage.push(needed[a]);
                needed.splice(a, 1);
            }


            for (let i = 0; i < second; i++) {
                a = getRandom(0, needed.length - 1);
                secondStage.push(needed[a]);
                needed.splice(a, 1);
            }

            for (let i = 0; i < third; i++) {
                a = getRandom(0, needed.length - 1);
                thirdStage.push(needed[a]);
                needed.splice(a, 1);
            }

        } else {
            let length = easy.length;
            const dep = amount - easy.length;
            let a;

            for (let i = 0; i < length; i++) {
                a = getRandom(0, easy.length - 1);
                needed.push(easy[a]);
                easy.splice(a, 1);
            }

            for (let i = 0; i < dep; i++) {
                a = getRandom(0, normal.length - 1);
                needed.push(normal[a]);
                normal.splice(a, 1);
            }

            for (let i = 0; i < first; i++) {
                a = getRandom(0, needed.length - 1);
                firstStage.push(needed[a]);
                needed.splice(a, 1);
            }

            for (let i = 0; i < second; i++) {
                a = getRandom(0, needed.length - 1);
                secondStage.push(needed[a]);
                needed.splice(a, 1);
            }

            for (let i = 0; i < third; i++) {
                a = getRandom(0, needed.length - 1);
                thirdStage.push(needed[a]);
                needed.splice(a, 1);
            }
        }
    }

    function setStageNormal(amount, cards, needed, first, second, third) {
        let a;

        for (let i = 0; i < amount; i++) {
            a = getRandom(0, cards.length - 1);
            needed.push(cards[a]);
            cards.splice(a, 1);
        }

        for (let i = 0; i < first; i++) {
            a = getRandom(0, needed.length - 1);
            firstStage.push(needed[a]);
            needed.splice(a, 1);
        }

        for (let i = 0; i < second; i++) {
            a = getRandom(0, needed.length - 1);
            secondStage.push(needed[a]);
            needed.splice(a, 1);
        }

        for (let i = 0; i < third; i++) {
            a = getRandom(0, needed.length - 1);
            thirdStage.push(needed[a]);
            needed.splice(a, 1);
        }
    }

    function loadImage(img, stage, i) {
        img.src = `./assets/MythicCards/${stage[i].slice(0, stage[i].length - 2)}/${stage[i]}.png`;
        console.log(img.src);

        img.onload = () => {
            lastCard.style.backgroundImage = `url(${img.src})`;
        }
    }

    function setImages() {
        const img = new Image();

        if (firstStage.length != 0) {
            let i = getRandom(0, firstStage.length - 1);
            loadImage(img, firstStage, i);

            if (firstStage[i].slice(0, firstStage[i].length - 2) == 'green') {
                firstContainer.querySelector('.green').textContent = firstGreen - 1;
                firstGreen--;
            } else if (firstStage[i].slice(0, firstStage[i].length - 2) == 'brown') {
                firstContainer.querySelector('.brown').textContent = firstBrown - 1;
                firstBrown--;
            }
            else if (firstStage[i].slice(0, firstStage[i].length - 2) == 'blue') {
                firstContainer.querySelector('.blue').textContent = firstBlue - 1;
                firstBlue--;
            }

            firstStage.splice(i, 1);

            if (firstStage.length == 0) {
                stage_text[0].classList.add('done');
            }

        } else if (secondStage.length != 0) {
            let i = getRandom(0, secondStage.length - 1);
            loadImage(img, secondStage, i);


            if (secondStage[i].slice(0, secondStage[i].length - 2) == 'green') {
                secondContainer.querySelector('.green').textContent = secondGreen - 1;
                secondGreen--;
            } else if (secondStage[i].slice(0, secondStage[i].length - 2) == 'brown') {
                secondContainer.querySelector('.brown').textContent = secondBrown - 1;
                secondBrown--;
            }
            else if (secondStage[i].slice(0, secondStage[i].length - 2) == 'blue') {
                secondContainer.querySelector('.blue').textContent = secondBlue - 1;
                secondBlue--;
            }

            secondStage.splice(i, 1);

            if (secondStage.length == 0) {
                stage_text[1].classList.add('done');
            }
        }
        else if (thirdStage.length != 0) {
            let i = getRandom(0, thirdStage.length - 1);

            loadImage(img, thirdStage, i);

            if (thirdStage[i].slice(0, thirdStage[i].length - 2) == 'green') {
                thirdContainer.querySelector('.green').textContent = thirdGreen - 1;
                thirdGreen--;
            } else if (thirdStage[i].slice(0, thirdStage[i].length - 2) == 'brown') {
                thirdContainer.querySelector('.brown').textContent = thirdBrown - 1;
                thirdBrown--;
            }
            else if (thirdStage[i].slice(0, thirdStage[i].length - 2) == 'blue') {
                thirdContainer.querySelector('.blue').textContent = thirdBlue - 1;
                thirdBlue--;
            }

            thirdStage.splice(i, 1);

            if (thirdStage.length == 0) {
                stage_text[2].classList.add('done');
                deck.classList.add('hidden');
            }
        }
    }

    function levelVeryEasy() {
        console.log("Level very easy");

        setStages(AmountgreenCards, greenEasy, greenNormal, greenNeeded, firstGreen, secondGreen, thirdGreen);
        setStages(AmountbrownCards, brownEasy, brownNormal, brownNeeded, firstBrown, secondBrown, thirdBrown);
        setStages(AmountblueCards, blueEasy, blueNormal, blueNeeded, firstBlue, secondBlue, thirdBlue);

        deck.addEventListener('click', () => {
            setImages();
        });
    }

    function levelEasy() {
        console.log("Level easy");

        setStageNormal(AmountgreenCards, cardsEasyGreen, greenNeeded, firstGreen, secondGreen, thirdGreen);
        setStageNormal(AmountbrownCards, cardsEasyBrown, brownNeeded, firstBrown, secondBrown, thirdBrown);
        setStageNormal(AmountblueCards, cardsEasyBlue, blueNeeded, firstBlue, secondBlue, thirdBlue);

        deck.addEventListener('click', () => {
            setImages();
        });
    }

    function levelNormal() {
        console.log("Level Normal");

        setStageNormal(AmountgreenCards, cardsGreen, greenNeeded, firstGreen, secondGreen, thirdGreen);
        setStageNormal(AmountbrownCards, cardsBrown, brownNeeded, firstBrown, secondBrown, thirdBrown);
        setStageNormal(AmountblueCards, cardsBlue, blueNeeded, firstBlue, secondBlue, thirdBlue);

        deck.addEventListener('click', () => {
            setImages();
        });
    }

    function levelHard() {
        console.log("Level hard");

        setStageNormal(AmountgreenCards, cardsHardGreen, greenNeeded, firstGreen, secondGreen, thirdGreen);
        setStageNormal(AmountbrownCards, cardsHardlBrown, brownNeeded, firstBrown, secondBrown, thirdBrown);
        setStageNormal(AmountblueCards, cardsHardBlue, blueNeeded, firstBlue, secondBlue, thirdBlue);

        deck.addEventListener('click', () => {
            setImages();
        });
    }

    function levelVeryHard() {
        console.log("Level very Hard");

        setStages(AmountgreenCards, greenHard, greenNormal, greenNeeded, firstGreen, secondGreen, thirdGreen);
        setStages(AmountbrownCards, brownHard, brownNormal, brownNeeded, firstBrown, secondBrown, thirdBrown);
        setStages(AmountblueCards, blueHard, blueNormal, blueNeeded, firstBlue, secondBlue, thirdBlue);

        deck.addEventListener('click', () => {
            setImages();
        });
    }


    switch (levelId) {
        case 0:
            levelVeryEasy();
            break;
        case 1:
            levelEasy();
            break;
        case 2:
            levelNormal();
            break;
        case 3:
            levelHard();
            break;
        case 4:
            levelVeryHard();
            break;
    }
});
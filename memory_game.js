const gameboard = document.getElementById('gameboard');
const rolling = document.getElementsByClassName('row');
const cards = document.getElementsByClassName('card');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modalText');
const easyBtn = document.getElementById('easyBtn');
const mediumBtn = document.getElementById('mediumBtn');
const hardBtn = document.getElementById('hardBtn');


const images = [
    'Images/Bluto.png',
    'Images/Popeye.png',
    'Images/SonGoku.png',
    'Images/SailorMoon.png',
    'Images/Michelangelo.png',
    'Images/WoodyWoodpecker.png',
    'Images/PrincessBubblegum.png',
    'Images/Bender.png',
    'Images/HomerSimpson.png',
    'Images/BillCipher.png',
    'Images/FinnTheHuman.png',
    'Images/SuperMario.png',
    'Images/Raphael.png',
    'Images/CookieMonster.png',
    'Images/Batman.png',
    'Images/Joker.png',
    'Images/JakeTheDog.png',
    'Images/Sonic.png'
    

]

let hardmode = false;
let pairsLeft;
let movesMade = 0;
let score = 0;
let allpairs = [];
let imageCompare = [];
let flippedCards = [];
let flippedBacks = [];

/*
1. Make counters for cards left and moves made. - OK
2. Make a restart game function. - OK
3. Add difficulty
*/



function populateGameBoard(rows, cards) {
    pairsLeft = (rows*cards)/2;

    for(i=0; i<rows; i++) {
        const row = document.createElement('div');
        gameboard.appendChild(row);
        row.classList.add('row');
    
        for(j=0; j<cards; j++) {
            const card = document.createElement('div');
            let cardback = document.createElement('div');
            card.appendChild(cardback);
            cardback.classList.add('cardback');
            rolling[i].appendChild(card);
            card.classList.add('card');
        }
    }
    

}

function assignPairs(){
    let usedNumbers = [];
    let pair = [];

    for(i=0; i<cards.length; i++){
        let number = Math.floor(Math.random()*cards.length);

        if(usedNumbers.includes(number)) {
            i--
        } else{
            usedNumbers.push(number);
            pair.push(cards[number]);
        }

        if(pair.length===2){
            allpairs.push(pair);
            pair=[];
        }
    }
}

function drawImages(){
    
    for(i=0; i<allpairs.length; i++) {
        
        allpairs[i].forEach(item => {
            let image = document.createElement('img');
            item.setAttribute('data-pair', i)
            image.src = images[i];
            item.appendChild(image)});
    }

}


function restartGame(newrows, newcards) {
    
    allpairs =[];
    movesMade = 0;
    modal.classList.add('inactive');
    while(gameboard.childElementCount>0){gameboard.removeChild(gameboard.firstChild)}
    populateGameBoard(newrows, newcards);
    if(hardmode===true){for(i=0; i<cards.length; i++){cards[i].classList.add('hardmode')}};
    assignPairs();
    drawImages();
}


gameboard.addEventListener('click', (ev)=>{
    if(!ev.target.classList.contains('flipped')){
    movesMade++;
    checkForPair(ev);}
})

easyBtn.addEventListener('click',()=> {restartGame(4,4)
                                        score=100;});
mediumBtn.addEventListener('click',()=> {restartGame(4,5)
                                        score=150;});
hardBtn.addEventListener('click',()=> { hardmode=true;
                                        restartGame(6,6)
                                        score=200;});


function checkForPair(event){
    
    let card = event.target.closest('[data-pair]');
    card.classList.add('focus');
    flippedCards.push(card);
    let pairNumber = card.getAttribute('data-pair');

    let flip = event.target.closest('.cardback');
    flippedBacks.push(flip);
    flip.classList.add('flipped');
    imageCompare.push(pairNumber);
    
    

    
    if(imageCompare.length ===2){
        gameboard.classList.add('unavailable');
        if(imageCompare[0] === imageCompare[1]) {
            pairsLeft--;
            flippedCards.forEach(el=> el.classList.add('gratz'))
             setTimeout(()=>{
                flippedCards.forEach(el=> el.classList.remove('gratz'));
                flippedCards.forEach(image => image.classList.add('paired'));
             gameboard.classList.remove('unavailable');
             imageCompare=[];
             flippedCards=[];
             flippedBacks=[];}
             , 300)
             
            } 
             else{ 
                setTimeout(()=>{
                    flippedCards.forEach(image => image.classList.remove('focus'));
                    flippedBacks.forEach(cardback => cardback.classList.remove('flipped'));
                    gameboard.classList.remove('unavailable');
                    imageCompare=[];
                    flippedCards=[];
                    flippedBacks=[];
                }, 500)
        }
        
    }

    if(pairsLeft===0){
        hardmode=false;
        score = score-(movesMade/2);
        modalText.innerText = `Your score is ${score} Would you like to play again?`;
        modal.classList.remove('inactive');
    };
}
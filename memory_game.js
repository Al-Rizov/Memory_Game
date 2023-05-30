const gameboard = document.getElementById('gameboard');
const rolling = document.getElementsByClassName('row');
const cards = document.getElementsByClassName('card');
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

let allpairs = [];
let imageCompare = [];
let flippedCards = [];
let flippedBacks = [];

/*
1. Randomize Pairs. ok
2. Insert Images. ok
3. Create a 'PairMade' function. ok
4. Create Cardback.
5. Create a HideAfterTwo function.
*/

populateGameBoard(4, 4);
assignPairs();
drawImages();

function populateGameBoard(rows, cards) {
    
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


gameboard.addEventListener('click', (ev)=>{
    
    let card = ev.target.closest('[data-pair]');
    card.classList.add('focus');
    flippedCards.push(card);
    
    let pairNumber = card.getAttribute('data-pair');

    let flip = ev.target.closest('.cardback');
    flippedBacks.push(flip);
    flip.classList.add('flipped')
    
    console.log(pairNumber);
    imageCompare.push(pairNumber);
    console.log(imageCompare);
    

    if(imageCompare.length ===2){
        gameboard.classList.add('unavailable');
        if(imageCompare[0] === imageCompare[1]) {
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

})


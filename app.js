//----------------------------------------------------------------------------------
//VARIABLES DECLARATIONS
//main menu elements
let mainMenu, startButton, closeButton1, category1, category2, category3, category4;
//game elements
let game, cards, homeButton, pauseButton, replayButton, closeButton2;
//Auxiliar variables
let i, properties, start, actualCard, actualBack, previousCard, currentCard, selectedCategoryIndex, currentflippedCards, validMoves, degrees, matchCounter, seconds, minutes, hours, currentScore, maxScore, highestScore, bonus,id, state;
//Auxiliar arrays
let animationValues = [];
let imagesCategories = []
let imagesCategory1, imagesCategory2, imagesCategory3, imagesCategory4, backgroundIndex;
//----------------------------------------------------------------------------------
//VARIABLES INICIALIZATION
//get menu elements from the DOM
mainMenu = document.getElementById("mainMenu");
startButton= document.getElementById("startButton");
closeButton1 = document.getElementById("closeButton1");
category1 = document.getElementById("category1");
category2 = document.getElementById("category2");
category3 = document.getElementById("category3");
category4 = document.getElementById("category4");
//get game elements from the DOM
game = document.getElementById("game");
homeButton = document.getElementById("homeButton");
pauseButton = document.getElementById("pauseButton");
replayButton = document.getElementById("replayButton");
closeButton2 = document.getElementById("closeButton2");
cards=document.getElementsByClassName("card");
chronometer=document.getElementById("chronometer");
score=document.getElementById("score");
flippedCards=document.getElementById("flippedCards");
highestScore=document.getElementById("highestScore");
//Auxiliar variables
animationValues = [{ transform: 'scale(0.1, 0.1)', opacity: '0.1' }, { transform: 'scale(1,1)', opacity: '1' }];
imagesCategory1 = ["img/category1/dress.jpg", "img/category1/hat.jpg", "img/category1/pants.jpg", "img/category1/shirt.jpg", "img/category1/shoes.jpg", "img/category1/skirt.jpg", "img/category1/smoking.jpg", "img/category1/socks.jpg"];
imagesCategory2 = ["img/category2/cat.jpg", "img/category2/chicken.jpg", "img/category2/cow.jpg", "img/category2/dog.jpg", "img/category2/lion.jpg", "img/category2/pig.jpg", "img/category2/shark.jpg", "img/category2/tiger.jpg"];
imagesCategory3 = ["img/category3/apple.jpg", "img/category3/banana.jpg", "img/category3/blackberry.jpg", "img/category3/grape.jpg", "img/category3/mango.png", "img/category3/pear.jpg", "img/category3/pineapple.jpg", "img/category3/strawberry.jpg"];
imagesCategory4 = ["img/category4/beach.jpg", "img/category4/desert.jpg", "img/category4/fall.jpg", "img/category4/mountain.jpg", "img/category4/palm.jpg", "img/category4/river.jpg", "img/category4/waterfall.jpg", "img/category4/winter.jpg"];
imagesCategories = [imagesCategory1, imagesCategory2, imagesCategory3, imagesCategory4]
backgroundIndex = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
validMoves = 0;
currentflippedCards = 0;
start = 0;
degrees=0;
matchCounter=0;
seconds=0;
minutes=0;
hours=0;
currentScore=0;
bonus=0;

//--------------------------------------------------------------------------------------------------------------
//main menu buttons actions
replayButton.addEventListener('click',replayGame);
//game buttons actions
homeButton.addEventListener('click',closeGame);

pauseButton.addEventListener('click',(e)=>{pauseGame(pauseButton)});
category1.addEventListener('click',(e)=>{startGame(0)});
category2.addEventListener('click',(e)=>{startGame(1)});
category3.addEventListener('click',(e)=>{startGame(2)});
category4.addEventListener('click',(e)=>{startGame(3)});

//cards actions Logic of the entire game
for (i = 0; i < cards.length; i++) {

    cards.item(i).addEventListener('click', (e) => {
        //if the game has started and the is not in pause
        if(start==1){
            //count the valid moves of the game. Maximum 2 valid moves are allowed
            validMoves++;
            //count the amount of cards that have been flipped
            currentflippedCards++;
            //the first card is flipped
            if(validMoves==1){
                
                previousCard=e.target; //the first card is stored
                degrees=180;
                
                flippedCardAnimation( previousCard, degrees)
                
            }else{
                
                if(validMoves==2){
                    currentCard=e.target; //the second card is store
                    //if the second card is the same first card
                    if(previousCard.classList[1]==currentCard.classList[1])
                    {
                        swal("Invalid move!!!")
                        validMoves=1;
                        currentflippedCards--;

                    }else{
                       //The second card is flipped
                      
                        flippedCardAnimation(currentCard, degrees)
                        //If the first and second card has the same background there's a match  
                        if(backgroundIndex[previousCard.classList[1]]==backgroundIndex[currentCard.classList[1]]){
                           // matchCounter=
                            setTimeout(() => {
                                //both cards vanish
                                vanishedCardAnimation(previousCard);
                                vanishedCardAnimation(currentCard);
                                validMoves=0;
                                matchCounter++;
                                //the score system
                                if(minutes==0){
                                    bonus=50;
                                }else{
                                    if(minutes<2){
                                        bonus=10;
                                    }else{
                                        bonus=1;
                                    }
                                }
                                currentScore=currentScore+bonus+100;
                                score.innerHTML=currentScore;
                                if(currentScore>maxScore){
                                    maxScore=currentScore;
                                }
                                highestScore.innerHTML=maxScore;
                                //if the player match all the cards
                                if(matchCounter==8){
                                    
                                    matchCounter=0;
                                    if(currentflippedCards==16){
                                        swal("GANASTE CON PUNTAJE PERFECTO!!!!!!");
                                        bonus=1000
                                    }else{
                                        if(currentflippedCards<=24){
                                            swal("GANASTE TIENES UNA MEMORIA PRODIGIOSA!!!!!");
                                            bonus=500;
                                        }else{
                                            if(currentflippedCards<=30){
                                                bonus=300;
                                                swal("GANASTE!!!!!");
                                            }else{
                                                bonus=100;
                                                swal("GANASTE PERO PUEDES MEJORAR");
                                            }
                                            
                                        }
                                    }
                                    currentScore=currentScore+bonus+100;
                                    score.innerHTML=currentScore;
                                    if(currentScore>maxScore){
                                        maxScore=currentScore;
                                    }
                                    highestScore.innerHTML=maxScore;
                                    localStorage.setItem('max',maxScore);
                                    resetValues(1);
                                    
                                }
                            }, 1000);
                            
                        }else{
                            //if there is no match the cards return to their original position
                            degrees=0;
                            setTimeout(() => {
                                flippedCardAnimation(previousCard,degrees);
                                flippedCardAnimation(currentCard,degrees);
                                
                                validMoves=0;
                            }, 1000);
                        }
                    }
                }
                else{
                    //if the player select more than two cards at the same time
                    if(previousCard.classList[1]==e.target.classList[1]||currentCard.classList[1]==e.target.classList[1]){
                        currentflippedCards--;
                        swal("Invalid move")
                        validMoves=2;
                    }
                }
            }
            flippedCards.innerHTML=currentflippedCards;
        }
    })
}
//-------------------------------------------------------

function startGame(category) {
    selectedCategoryIndex=category;
    closeView(mainMenu);
    openView(game);
    generateBackground();
    resetValues(1);
    startChronometer();
    localStorage.setItem('max',maxScore);
    highestScore.innerHTML=localStorage.getItem('max');
}

function pauseGame(pauseButton) {

    if (start == 1) {
        pauseButton.style.backgroundImage='url("img/playButton.png")';
        pauseButton.style.backgroundColor='#0F0'
        clearInterval(id);
        start = 0;
    } else {
        pauseButton.style.backgroundImage='url("img/pauseButton.png")';
        pauseButton.style.backgroundColor='#FF0'
        startChronometer()
        start = 1;
    }
}

function closeGame() {

    closeView(game);
    openView(mainMenu);
    resetValues(0);
    
}

function openView(view) {
    setTimeout(function() {
        view.style.display="flex";
        view.style.visibility="visible";
        viewAnimation(view, "In");
    }, 700)

}

function closeView(view) {
    viewAnimation(view, "Out");
    setTimeout(() => {
        view.style.display="none";
        view.style.visibility="hidden";
    }, 700)

}

function viewAnimation(view, type) {
    switch (type) {
        case "In":
            view.animate([animationValues[0], animationValues[1]], 700);
            break;
        case "Out":
            view.animate([animationValues[1], animationValues[0]], 700);
            break;
    }

}

function generateBackground() {
    backgroundIndex = backgroundIndex.sort(function() { return Math.random() - 0.5 });
    for (i = 0; i < 16; i++) {
        actualCard = cards.item(i);
        actualBack = actualCard.getElementsByClassName("back").item(0);
        actualBack.style.backgroundImage = `url(${imagesCategories[selectedCategoryIndex][backgroundIndex[i]]})`;
        cards.item(i).style.visibility="visible";
        cards.item(i).style.transform = 'rotateY(0deg)';
    }
}

function resetValues(_start){
    validMoves=0;
    start=_start;
    matchCounter=0;
    localStorage.getItem('max')==null?maxScore=0:maxScore=localStorage.getItem('max');
    degrees=0;
    seconds=0;
    minutes=0;
    hours=0;
    currentScore=0;
    currentflippedCards=0;
    chronometer.innerHTML="00:00:00";
    score.innerHTML=currentScore;
    flippedCards.innerHTML=currentflippedCards;
    pauseButton.style.backgroundImage='url("img/pauseButton.png")';
    pauseButton.style.backgroundColor='#FF0'
    clearInterval(id);
}

function flippedCardAnimation(card, degrees) {
    card.animate([{ transform: `rotateY(${degrees+'deg'})` }], 700)
    setTimeout(() => {
        card.style.transform = `rotateY(${degrees+'deg'})`;
    }, 650);
}
function startChronometer(){
    id=setInterval(() => {
       
        seconds++
        if(seconds>59){
            seconds=0;
            minutes++;
            if(minutes<10){minutes="0"+minutes}
            if(minutes>59){
                minutes=0;
                hours++;
                if(hours<10){hours="0"+hours}
                if(hours>23){
                    hours=0;
                }
            }
        }
        if(seconds<10){
            seconds="0"+seconds;
        }
        if(seconds==0){
            seconds="00";
        }
        if(minutes==0){
            minutes="00";
        }
        if(hours==0){
            hours="00";
        }
        chronometer.innerHTML=hours+":"+minutes+":"+seconds;
    }, 1000);
}

function replayGame(){
  
    generateBackground();
   
    resetValues(1);
    startChronometer();
}

function vanishedCardAnimation(card) {
    card.animate([{ transform: 'scale(1,1)', visibility: 'visible' }, { transform: 'scale(0.1,0.1)', visibility: 'hidden' }], 700)
    setTimeout(() => {
        card.style.visibility = "hidden";
    }, 650);
}
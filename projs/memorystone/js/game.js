//Functions that are executed at the start:
boardReset()
getPlayerNameDelayed()
injectPlayerName()


setTimeout(function(){ gameStart(); }, 500);





//Variables:
var elPreviousCard = null;
var flippedCouplesCount = 0;
var startTimer = false
var timerResult 
var firstTime = true

var TOTAL_COUPLES_COUNT = 9;

var audioWin = new Audio('sound/win.mp3');
var click = new Audio('sound/click.mp3');
var Ding = new Audio('sound/ding.wav');
var right = new Audio('sound/right.mp3')
var wrong = new Audio ('sound/wrong.mp3')
//var gameStartSound = new Audio ('sound\gameStartClock.wav')


var isProcessing = false
var lastTime
var vStartTime
var vEndTime
var username = localStorage.getItem("username")

// Functions:
function cardClicked(elCard) {
    
    StartTime ();
    startTimer = true

    click.play();    
    if (isProcessing == true) {
        return;
    }
   
    if (elCard.classList.contains('flipped')) {
        return;
    }

    elCard.classList.add('flipped');

    if (elPreviousCard === null) {
        elPreviousCard = elCard;
    } else {
       
        var card1 = elPreviousCard.getAttribute('data-card');
        var card2 = elCard.getAttribute('data-card');

        if (card1 !== card2){
            wrong.play();
            isProcessing = true

            setTimeout(function () {
                elCard.classList.remove('flipped');
                elPreviousCard.classList.remove('flipped');
                elPreviousCard = null;
                isProcessing = false
            }, 1500)

        } else {
            
            right.play();
            flippedCouplesCount++;
            elPreviousCard = null;

            if (TOTAL_COUPLES_COUNT === flippedCouplesCount) {
                EndTime ()
                audioWin.play()
                
               // showReplay("replay");                
                 playAgainDelayed()
                 timerResult = vEndTime - vStartTime
                 localStorage.setItem("Current", timerResult)
                 if (timerResult < localStorage.getItem("Best Time")) {
                    localStorage.setItem("Best Time",timerResult)
                    injectTime()
                    console.log("Triggered")

                                             }
                     if (!localStorage.getItem("Best Time")) {
                         var bestTime = timerResult
                        localStorage.setItem("Best Time",bestTime )
                        injectTime() 
                        
                                           }
               

                
                

            }
        }
    }
}

function gameStart() { 

    window.confirm("Get Ready!, you will have 5 seconds to memorize the cards");
    addFlippedDelayed()
    setTimeout(function(){ removeFlippedDelayed(); }, 5000);
  
    
}

function addFlippedDelayed() {
    
   
    flippedCouplesCount=null
    var x = document.querySelectorAll(".card");
    var i;
    for (i = 0; i < x.length; i++) {
      x[i].classList.add("flipped")
    }

}
function removeFlippedDelayed() {
    
   
    flippedCouplesCount=null
    var x = document.querySelectorAll(".card");
    var i;
    for (i = 0; i < x.length; i++) {
      x[i].classList.remove("flipped")
    }

}



function StartTime () {
    if (startTimer==false ){
         vStartTime = Date.now()
        console.log(vStartTime)     
    }
}

function EndTime () {
 vEndTime = Date.now()
console.log(vEndTime)
}

function toggle_visibility(id) {
    var e = document.getElementById(id);
    if(e.style.display == 'none')
       e.style.display = 'block';
 }

 /* function showReplay(id){
    var e = document.getElementById(id);
    if(e.classList.contains('hidden'));
    e.classList.remove('hidden');
    e.classList.add('visible');
  }
*/
function playAgain() {

    if (confirm("Play Again?")){
      timerResult = 0
      vEndTime = 0 
      vStartTime = 0
      startTimer = false
      firstTime = false

      removeFlipped();
      boardReset() 
      setTimeout(function(){ gameStart(); }, 500);
    }
      else {   
        
        window.open("index.html", "_self");
      }
}

function playAgainDelayed(){
setTimeout(playAgain, 1000);
}

function getPlayerNameDelayed(){
    setTimeout(getPlayerName, 500);
    }

function removeFlipped() {
   
    flippedCouplesCount=null
    var x = document.querySelectorAll(".flipped");
    var i;
    for (i = 0; i < x.length; i++) {
      x[i].classList.remove("flipped")
    }
  }

function getPlayerName() {

       if (!username ) {
          username = prompt("Enter Username")
          localStorage.setItem("username", username)
          injectPlayerName()
 
          }
                           
    }

  
    function injectPlayerName() {

        var x = "Player: " + localStorage.getItem("username");
        document.getElementById("username").innerHTML = x; 
    }

    function injectTime() {

        var z = "Best Time: " + localStorage.getItem("Best Time");
        document.getElementById("scoreboard").innerHTML = z;  
    }
      
function checkUserName() {
    username = localStorage.getItem("username")
    if (username=null) {
     alert(SecondNull)
     console.log("Check user name")
    }
}
 
var z = "Best Time: " + localStorage.getItem("Best Time");
document.getElementById("scoreboard").innerHTML = z;  

function changeUser() {
 localStorage.removeItem("username")
 location.reload(); 
}

function boardReset() {

    var board = document.querySelector('.board'); 
    for (var i = board.children.length; i >= 0; i--)
     {     board.appendChild(board.children[Math.random() * i | 0]); } 
}
// alert("hello");

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];
var startGame = true;
var level = 0;





$(".btn").click(function() { // .class row # select ID
//$("div[type='button']").click(function() { // .class row # select ID
    
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    });

function playSound(name){

    $("#"+ name).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + name + ".mp3");
    //audio.play();

}

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+ randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    // audio.play();
    

}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);   
}

$(document).keypress(function(){   
    if (startGame){
        $("#level-title").text("Level " + level);
        nextSequence();
        startGame = false;
    }
  });

function checkAnswer(currentLevel){
    // if (JSON.stringify(userClickedPattern) === JSON.stringify(gamePattern)){
    //     console.log("correct");
    //     setTimeout(function() {
    //         nextSequence();
    //     }, 1000); 
    // }
    // else {

    //     console.log("incorrect");
    // }
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        
        if (userClickedPattern.length === gamePattern.length){
  
     
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } 
      
      else {
  
        console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        // audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
      }    

}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    startGame = true;
    $("#level-title").text("Game over, Press any key to restart again");
}



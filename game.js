var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var record = 0;


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$("#touch").click(function() {
  startPress();

  if (!started) {
    setTimeout(function(){
      $("#level-title").text("Level " + level);
      nextSequence();
    },500);
    started = true;
  }
});

$(".btn").click(function(event){
  var userChosenColour = event.target.id;
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel] ){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else {
    gameOver();
  }
}

function nextSequence(){
  userClickedPattern = [];
  level++
  var randomNumber = Math.floor(Math.random() * 4 );
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("#level-title").text("Level " + level);

}

function gameOver(){
  $("#level-title").text("Game Over, Press Any Key to Restart")
  playSound("wrong");
  $(document.body).addClass("game-over")
  setTimeout(function(){
    $(document.body).removeClass("game-over")
  }, 200);

  if (level > record) {
    record = level;
  }
  $("#score").text("Record "+ record)
  console.log(record);
  startOver();
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

function playSound(name){
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(pressedColour){
  var activeButton = $("#" + pressedColour);

    activeButton.addClass("pressed");
  setTimeout (function(){
    activeButton.removeClass("pressed");
  }, 100);
}

function startPress(){
  var startButton = $("#touch");
    startButton.addClass("pressed");
  setTimeout (function(){
    startButton.removeClass("pressed");
  },100);
}

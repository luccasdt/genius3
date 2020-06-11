
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var hasStarted = false;
var levelPlayer = 0;
var currentRecord = 0;

$(document).keypress(function (){
  if(!hasStarted){
    setTimeout(function () {
      nextSequence();
      hasStarted = true;
    }, 500);
  }
});

$(".btn").click(function (){

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animate(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }else{
    gameOver();
    startOver();
  }
}


function gameOver(){
  setTimeout(function () {
    new Audio("sounds/wrong.mp3").play();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function (){
      $("body").removeClass("game-over");
    }, 200)
  }, 300);
}

function startOver() {
  levelPlayer = 0;
  gamePattern = [];
  userClickedPattern = [];
  hasStarted = false;
}

function playSound(color){
  new Audio('sounds/' + color + '.mp3').play();
}

function animate(color){
  $("#" + color).addClass("pressed");
    setTimeout(function () {
      $("#" + color).removeClass("pressed");
    }, 60);
}

function nextSequence() {
  userClickedPattern = [];
  levelPlayer++;
  if (levelPlayer > currentRecord) {
    currentRecord = levelPlayer;
    $("#currentRecord").text("Record: " + currentRecord);
  }
  $("#level-title").text("Level " + levelPlayer);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  console.log(gamePattern);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

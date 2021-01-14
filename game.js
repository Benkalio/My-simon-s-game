// var buttonColours = ["red", "blue", "green", "yellow"];
//
// var gamePattern = [];
//
// var userClickedPattern = [];
//
// //Using jQuery to detect when any of the buttons are clicked and trigger a handler function.
// //Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
// //Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
// //In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
//
// $(".btn").click(function() {
//   var userChosenColour = $(this).attri("id");
//
//   userClickedPattern.push(userChosenColour);
//
//   playSound(userChosenColour);
//
//   animatePress(userChosenColour);
// });
//
//
//   //Using jQuery to select the button with the same id as the randomChosenColour
//   //Using jQuery to animate a flash to the button selected in step 1.
//   //Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
//
// function nextSequence() {
//   var randomNumber = Math.floor(Math.random() * 4);
//
//   var randomChosenColour = buttonColours[randomNumber];
//
//   gamePattern.push(randomChosenColour);
//
//
//   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
//
//   playSound(randomChosenColour);
// }
//
// //Create a function that plays sound when a colour is clicked
// //3. Using Javascript to play the sound for the button colour selected in step 1.
// function playSound(name) {
//   var audio = new Audio("sounds/" + name + ".mp3");
//   audio.play();
// }
//
// // Create a new function called animatePress(), it should take a single input parameter called currentColour.
// //Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
// //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
//
// function animatePress(currentColor) {
//
//
//   $("#" + currentColor).addClass("pressed");
//
//   setTimeout(function(){
//   $("#" + currentColor).removeClass("pressed");
//   }, 100);
// }
//







var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keydown(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});

//Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

  //Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){

      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function(){
        nextSequence();
      }, 1000);

    }

  }
  else {
    console.log("wrong");

    //In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
    playSound("wrong");

    //In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    //Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game over, Press Any Key To Restart");

    //Call startOver() if the user gets the sequence wrong.
    startOver();
  }

}


function nextSequence() {

  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Create a function called startOver
//Inside this function, you'll need to reset the values of level, gamePattern and started variables.
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

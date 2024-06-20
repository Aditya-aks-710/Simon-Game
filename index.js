 
var value = false;

var level = 1;

function bajao(num){
    var audio = new Audio("./sounds/" + num + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");}, 100);
}

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

function nextSequence(){
    userClickedPattern = [];
    currentLevel = 0;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    bajao(randomChosenColour);
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr('id');
    bajao(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$(document).on("keydown", function(){
    if(!value){
        value = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

function startOver(){
    level = 1;
    value = false;
    gamePattern = [];
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            console.log("Correct!!");
            level++;
            $("#level-title").text("Level " + level);
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("Wrong");
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("#level-title").text("Game Over !!!");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
            $("#level-title").text("Press Any Key to Start");
        }, 1000);
        startOver();
    }
}
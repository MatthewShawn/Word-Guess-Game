// the display array that changes as the user guesses correctly
var answerHolder = [];
// Create an array that lists out all of the options (Mountain names).
var wordList = ["Pikes", "Evans", "Quandry", "Torreys", "Grays", "Shavano", "Yale", "Harvard", "Lincoln", "Bross", "Democrat", "Elbert", "Massive", "HolyCross", "Columbia", "Crestone", "CrestoneNeedle", "Eolus"];
// create a string that holds the randomly chosen answer that got picked
var pickedAnswer = "";
// List of characters that the user has already guessed;
var alreadyGuessed = "";

// Creating variables to hold the number of wins and guesses. 
var wins = 0;
var numberOfGuessesLeft = 10;

// Create variables that hold references to the places in the HTML where we want to display things.
var directionsText = document.getElementById("directions-text");
var userChoicesText = document.getElementById("userchoices-text");
var answerHolderText = document.getElementById("answer-holder-text");
var winsText = document.getElementById("wins-text");

var numberOfGuessesText = document.getElementById("guesses-text");



/*var gameObj = {

    firstTime: true,

    fillAnswer: function() {
        return wordList[Math.floor(Math.random() * wordList.length)];
    }
}*/

function pickAnAnswer() {
    //Pick a random word from the word list, and return it.
    return wordList[Math.floor(Math.random() * wordList.length)];
}

function initializeStringArray() {
    // Take the array passed in, and create entries of "_" out
    // to the number of letters in pickedAnswer
    // return the updated inputArray...maybe that is a bad idea
    for (var i = 0; i < pickedAnswer.length; i++) {
        answerHolder[i] = "_";
        console.log("input string array character added: " + answerHolder[i]);

    }
    console.log("Entire answerHolder: " + answerHolder);

}

function startGame() {

    alreadyGuessed = "";
    numberOfGuessesLeft = 10;
    pickedAnswer = pickAnAnswer();
    console.log("answer picked: " + pickedAnswer);
    answerHolder.length = 0;
    initializeStringArray();
    //userChoicesText.textContent = "You chose: ";
    answerHolderText.textContent = answerHolder;
    winsText.textContent = "Wins: " + wins;

    numberOfGuessesText.textContent = "Guesses left: " + numberOfGuessesLeft;
}

function fillAnswer(foundChar, anArray) {
    // Strings are immutable!!!  They cannot be edited, they can only be replaced!
    console.log("fillAnswer called!!!");
    console.log("passed in char is: " + foundChar);
    console.log("answerHolder so far: " + anArray);
    // Go throught the randomly chosed 'pickedAnswer' and for any and
    // all matches with the user-gessed character.  
    // Change the visible-to-the-user string to indidcate the 
    // correct guess.
    var anArray = answerHolder;
    for (var i = 0; i < pickedAnswer.length; i++) {
        if (pickedAnswer[i].toLowerCase() === foundChar.toLowerCase()) {
            if (i === 0) {
                anArray[i] = foundChar.toUpperCase();
            } else { anArray[i] = foundChar.toLowerCase(); }
            console.log("char found, inputString update: " + anArray[i]);

        }

    }
    return anArray;
}

// copied from Stack Overflow...note that if a multiple character string is passed in
// it returns false...
var isAlpha = function(ch) {
    return typeof ch === "string" && ch.length === 1 &&
        (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");
}

// This function is run whenever the user presses a key.
document.onkeyup = function(event) {

    // Determines which key was pressed.
    var userGuess = event.key;

    if (userGuess === " ") {
        startGame(); // resets or begins the game
        directionsText.innerHTML = "Press space bar to reset game...";
        //answerHolderText.textContent = answerHolder;
        return;
    }

    // Randomly chooses a choice from the options array. This is the Computer's guess.
    //var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];

    // Reworked our code from last step to use "else if" instead of lots of if statements.

    // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate number
    /*if ((userGuess === "r") || (userGuess === "p") || (userGuess === "s")) {

        if ((userGuess === "r" && computerGuess === "s") ||
            (userGuess === "s" && computerGuess === "p") ||
            (userGuess === "p" && computerGuess === "r")) {
            wins++;
        } else if (userGuess === computerGuess) {
            ties++;
        } else {
            losses++;
        }
*/
    //Make sure to compare lower case letters.
    if (pickedAnswer.toLowerCase().indexOf(userGuess.toLowerCase()) != -1) {
        //the user guessed a correct character
        // fill in the correct character in to all places where it is located
        answerHolder = fillAnswer(userGuess, answerHolder);
        answerHolderText.textContent = ""; // clear the display array
        // fill in the display array from scratch...
        for (index = 0; index < answerHolder.length; index++) {
            answerHolderText.textContent += answerHolder[index];
        }
        // if all "_"s are gone, they they win!
        //  increment wins, and display the entire text string
        // why is the for loop not doing this?
        if (answerHolder.indexOf("_") === -1) {
            wins++;
            winsText.textContent += wins;
            //answerHolderText.textContent = answerHolder;
            alert("YOU WIN!!!!  It was " + pickedAnswer);
            startGame();
        }

    } else {
        // the user guessed a character that is NOT in the word
        if (isAlpha(userGuess)) {
            // if the user is repeating a guess, ignore it
            if (alreadyGuessed.indexOf(userGuess.toLowerCase()) != -1) { return; }
            //place the character on the list of past guesses
            numberOfGuessesLeft--;
            alreadyGuessed += userGuess.toLowerCase();
            if (numberOfGuessesLeft === 0) {
                alert("Out of guesses, try again.")
                    //numberOfGuessesLeft = 10;
                startGame();
            }
        } else {
            return;
            // Ignore user input.  This will catch the shift key, 
            // space bar, return, and other innocuous stuff.  IGNORE.
            //alert("So you want to play that game, huh?  Minus 2 guesses.")
            //numberOfGuessesLeft--;

        }
    }


    // Display the user and computer guesses.
    userChoicesText.textContent = "Letters already guessed: " + alreadyGuessed;
    //answerHolderText.textContent = answerHolder;
    winsText.textContent = "Wins: " + wins;

    numberOfGuessesText.textContent = "Guesses left: " + numberOfGuessesLeft;
}


// How would we log...
/*
        // The car's make?
        console.log(car.make);
        alert(car["make"]);
        // The car's model?
        alert(car.model);
        console.log(car["model"]);
        // The car's mileage?
        console.log(car.mileage);
        alert(car["mileage"]);
        // How would we run the car's driveToWork method?
        car.driveToWork();
        car["driveToWork"]();

        // How would we run the car's driveAroundWorld method?
        car.driveAroundWorld();
        car["driveAroundWorld"]();
        // How would we run the getTuneUp method?
        car.getTuneUp();
        car["getTuneUp"]();
*/



/*
// Create variables that hold references to the places in the HTML where we want to display things.
var userAnswerText = document.getElementById("user-answer");
var computerAnswerText = document.getElementById("computer-answer");
var tiesText = document.getElementById("ties-text");
var userWinsText = document.getElementById("user-wins");
var computerWinsText = document.getElementById("computer-wins");
// Declare these here, so that they do not get reset every time a button gets pressed
// Initialize them to 0, so that they get treated like integers...you get errors otherwise
var ties = 0;
var computerWins = 0;
var userWins = 0;


document.onkeyup = function(event) {
    // Whenever a key is pressed, alert "pressed a button".
    //alert("pressed a button");
    var userAnswer = event.key;
    userAnswer = userAnswer.toLowerCase();
    //alert("user answered " + userAnswer);
    if (userAnswer === "r" || userAnswer === "p" || userAnswer === "s") {
        var computerPossibles = ["r", "p", "s"];
        var computerAnswer = computerPossibles[Math.floor(Math.random() * 3)];

        if (userAnswer === computerAnswer) {
            ties++;
        } else if (userAnswer === "r") {
            if (computerAnswer === "p") {
                computerWins++;
            } else {
                userWins++;
            }
        } else if (userAnswer === "p") {
            if (computerAnswer === "s") {
                computerWins++;
            } else {
                userWins++;
            }
        } else if (userAnswer === "s") {
            if (computerAnswer === "r") {
                computerWins++;
            } else {
                userWins++;
            }
        }
    } else {
        //This currently catches <shift> as an ivald key press....and <caps lock>   How do I fix that?
        alert("Not a valid answer!!!  This is Rock, Paper, Scissors.  Try it, you'll like it.")
    }
    //alert("computer answer " + computerAnswer);
    //alert("ties " + ties);
    //alert("user wins " + userWins);
    //alert("computer wins " + computerWins);
    //Assign the calculated values to the text link HTML placeholder thingy
    userAnswerText.textContent = userAnswer;
    computerAnswerText.textContent = computerAnswer;
    tiesText.textContent = ties;
    userWinsText.textContent = userWins;
    computerWinsText.textContent = computerWins;


};*/
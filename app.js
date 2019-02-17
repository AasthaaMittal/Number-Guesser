/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the result/correct answer if not guessed correctly after all the tries
- Let player choose to play again
*/

// Game variables
let min = 1,
    max = 10,
    correctGuess = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const MIN = document.querySelector('.min-num'),
      MAX = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message'),
      game = document.querySelector('#game');

//set the values for MIN n MAX
MIN.textContent = min;
MAX.textContent = max;

//listen to submit event
guessBtn.addEventListener('click', function(){

    let guess = parseInt(guessInput.value);

    //won or lost
    if(guess === correctGuess){
        setMessage(`${guess} is correct guess! YOU WON!!`, 'green');
        gameOver('won', 'green');
    }
    else{
        guessesLeft -= 1;

        if(guessesLeft === 0){
            gameOver('lost', 'red');
            setMessage(`No tries left!! **GAME OVER**  The correct number is ${correctGuess}`, 'red');
        }
        // if number of tries still remain
        else{
            // Reset input
            guessInput.value = '';
            //change border color
            guessInput.style.borderColor = 'red';
            setMessage(`${guess} is not correct. Number of guesses left: ${guessesLeft}`, 'red');

        }
    }

    // validate input(needs to be at the top but doesn't give desired output if put there **to be checked**)
    if((guess < min) || (guess > max)){
        setMessage(`The number should be between ${MIN.textContent} and ${MAX.textContent}`, 'red');

    }


});

//listen to play again event
game.addEventListener('mousedown', function(e){
   if(e.target.className === 'play-again'){
       window.location.reload();
   }
});

function setMessage(msg, color){
    message.textContent = msg;
    message.style.color = color;
}

function gameOver(result, color){
    //disable the input
    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    guessInput.style.color = color;

    //Play Again
    guessBtn.value = 'Play Again?';
    guessBtn.className += 'play-again';
}

function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}


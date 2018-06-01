





/*
 * Create a list that holds all of your cards
 */

 let memory = [
   'fa-diamond', 'fa-diamond',
   'fa-paper-plane-o', 'fa-paper-plane-o',
   'fa-anchor', 'fa-anchor',
   'fa-cube', 'fa-cube',
   'fa-leaf', 'fa-leaf',
   'fa-bicycle', 'fa-bicycle',
   'fa-bomb', 'fa-bomb',
   'fa-bolt', 'fa-bolt'
 ];



/*shuffle function from Udacity starter kit code */

 function shuffle(array) {
     var currentIndex = array.length,
         temporaryValue, randomIndex;

     while (currentIndex !== 0) {
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
     }

     return array;
 }


 function startGame(initialStart) {
     /* if it's not an initialStart */
     if (!initialStart) {
         const deck = document.querySelector('.deck');
         /*ifloop for  firstElementChilds */
         while (deck.firstElementChild) {
             /*clear the game*/
             deck.firstElementChild.remove();
         }
     }
     const fragment = document.createDocumentFragment();
     /* new variable for "for loop" */
     shuffledCards = shuffle(memory);
     for (let i = 0; i < shuffledCards.length; i++) {
         /*  `li` and `i` tags for the icons in the array */

         const li = document.createElement('li');


       li.classList.add('card');



         const iChild = document.createElement('i');




                 /*  Adding a default 'fa' class */
                 iChild.classList.add('fa');


                 iChild.classList.add(shuffledCards[i]);

                 /* Adding the `i` into the `li` */

                 li.appendChild(iChild);


                 fragment.appendChild(li);

             }
          /* container append ul */

             const ul = document.querySelector('.deck');
             ul.appendChild(fragment);

          /* adding eventHandler to the crds */

             assignCardHandler();
         };


         /*  adding reset game functionality
          Get the restart button */

         const restartButton = document.querySelector('.restart');




/*event.target to change class of card   */
let cardClicks = 0;
// Since there is no any clicks at the beginning you have to set this
// to true as initial value otherwise you won't even be able to click cards
let actionCompleted = true;



function cardSelectHandler(event) {

    // If current cards are still open do not open cards until
    // the ones that open are closed
    // Doing a return like this makes the function stop
    // So it doesn't execute rest of the block
    if (!actionCompleted) {
        return;
    }

    if (isFirstClick) {
        startTimer();
        isFirstClick = false;
    }
    // If you click an item that's already matched with its pair or
    // If you click the same card twice instead of trying another
    // It won't accept that click
    if (temporaryMatchCheck.includes(event.target) || permanentChecks.includes(event.target)) {
        return;
    }

    // If it comes this far then it means clicks were valid and let's
    // see if it was a match after the second pick of course
    event.target.classList.add('open', 'show');
    addMove();

    // Push clicked item into the temporary array
    temporaryMatchCheck.push(event.target);

    // When two cards are selected
    if (temporaryMatchCheck.length === 2) {
        if (temporaryMatchCheck[0].firstElementChild.className === temporaryMatchCheck[1].firstElementChild.className) {
            matched();
        }
        else {
            actionCompleted = false;
            unmatched();
        }
    }

    if (permanentChecks.length === 2) {
        isOver();
    }


    //event.target.classList.add('open', 'show', );
    // If it was a valid click then increment the clicks
    cardClicks++;

    console.log(temporaryMatchCheck);
}

const temporaryMatchCheck = [];
const permanentChecks = [];

function matched() {
    permanentChecks.push(temporaryMatchCheck[0], temporaryMatchCheck[1]);

    // Also clear the temporary array for new checks
    temporaryMatchCheck.length = 0;
}


function unmatched() {
    // If it's a fail attempt of match then remove classes with
    // 500 ms delay
    setTimeout(() => {
        temporaryMatchCheck[0].classList.remove('open', 'show');
        temporaryMatchCheck[1].classList.remove('open', 'show');

        // This is a way to flush an array
        // It removes all the content of the array
        temporaryMatchCheck.length = 0;
        actionCompleted = true;
    }, 500);
}


/* event listener function to get the cards  */

function assignCardHandler() {
    console.log('is called');
    const cards = document.querySelectorAll('.card');

    /* nodeList collection for cards _ > card    */
    for (const card of cards) {
        card.addEventListener('click', cardSelectHandler);
    }
}





//first click to start timer
let isFirstClick = true;

/*
 * Check if the game is over!
 */


// Get the modal from https://www.w3schools.com/howto/howto_css_modals.asp



// Get the button that opens the modal
/* MODAL LOGIC */

const modal = document.querySelector('.modal');

function isOver() {
    modal.classList.add('reveal-modal');
}


const repeatButton = document.querySelector('.close');
repeatButton.addEventListener('click', function() {
    modal.classList.remove('reveal-modal');
    reset();
});


/*
 * Add move
 */
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
    moves++;
    movesContainer.innerHTML = moves;

    // Set the rating
    rating();
}

/*
 * Rating
 */
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;
function rating() {

    if( moves < 10) {
        starsContainer.innerHTML = star + star + star;
    } else if( moves < 15) {
        starsContainer.innerHTML = star + star;
    } else {
        starsContainer.innerHTML = star;
    }
}


/*
 * Timer
 */
const timerContainer = document.querySelector(".timer");
let liveTimer,
    totalSeconds = 0;

// Set the default value to the timer's container
timerContainer.innerHTML = totalSeconds + 's';

/*
 * We call this function to start our function,
 * the totalSeconds will be increased
 * by 1 after 1000ms (1 second!)
 *
 * HINT: We need to call this function ONCE, and the best time to call it
 * is when the user click on a card (The first card!)
 * This means that our user is start playing now! ;)
 */
 function startTimer() {
    liveTimer = setInterval(function() {
        // Increase the totalSeconds by 1
        totalSeconds++;
        // Update the HTML Container with the new time
        timerContainer.innerHTML = totalSeconds + 's';
    }, 1000);
}

/*
 * Our timer won't stop. To stop it, we should clearInterval!
 * We will call it when the game is over.
 * So, we will call it at the end of `isOver` function
 *
 * HINT: That's why I created the `liveTimer` variable,
 * to store the setInterval's function, so that we can stop it by its name!
 */
function stopTimer() {
    clearInterval(liveTimer);
}

/* *//*
 * Restart Button
 */
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
    // Delete ALL cards

    reset();
    // Call `init` to create new cards
    startGame();

    // Reset the game


});

/*
 * Reset All Game Variables
 */
function reset() {
    // Empty the `matchedCards` array
    matchedCards = [];

    // Reset `moves`
    moves = 0;
    movesContainer.innerHTML = moves;

    // Reset `rating`
    starsContainer.innerHTML = star + star + star;

    /*
     * Reset the `timer`
     *
     * - Stop it first
     * - Then, reset the `isFirstClick` to `true` to be able to start the timer again!
     * - Don't forget about `totalSeconds`, it must be `0`
     * - One more thing, is to update the HTML timer's container
     */
    stopTimer();
    isFirstClick = true;
    totalSeconds = 0;
    timerContainer.innerHTML = totalSeconds + "s";
    permanentChecks.length = 0;
    temporaryMatchCheck.length = 0;
}


   /*function start is true */
startGame(true);







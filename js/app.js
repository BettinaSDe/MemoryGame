


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
     // if it's not an initialStart
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

    /*   li.classList.add('open');

       li.classList.add('show');  */




         /*create a child 'i' element */

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

         /* Restart button event listener */
         restartButton.addEventListener('click', function() {

             startGame();
         });


        /*event.target to change class of card   */
         function cardSelectHandler(event) {
             event.target.classList.add('open', 'show',);
         }

         /*function cardSelectHandler(event) {
             event.target.classList.remove('open', 'show');
           },500); */


         /*event.target to change class of card   */
        /*  function cardSelectHandler(event) {
              event.target.classList.add('show');
          }  */


         /* event listener function to get the cards  */

         function assignCardHandler() {

             const cards = document.querySelectorAll('.card');

            /* nodeList collection for cards _ > card    */
             for (const card of cards) {
                 card.addEventListener('click', cardSelectHandler);
             }
         }


         /*function start is true */
         startGame(true);



/*from https://www.taniarascia.com/how-to-create-a-memory-game-super-mario-with-plain-javascript/ */

const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', event => {

  const clicked = event.target;

  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }

});



  // Get the modal from https://www.w3schools.com/howto/howto_css_modals.asp
   var modal = document.getElementById('myModal');

   // Get the button that opens the modal
   var btn = document.getElementById("myBtn");

   // Get the <span> element that closes the modal
   var span = document.getElementsByClassName("close")[0];

   // When the user clicks on the button, open the modal
   btn.onclick = function() {
       modal.style.display = "block";
   }

   // When the user clicks on <span> (x), close the modal
   span.onclick = function() {
       modal.style.display = "none";
   }

   // When the user clicks anywhere outside of the modal, close it
   window.onclick = function(event) {
       if (event.target == modal) {
           modal.style.display = "none";
       }
   }

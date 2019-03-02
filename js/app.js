$(function() {
    /*
    * Create a list that holds all of your cards
    */
    let icons = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'anchor', 'anchor', 'bolt', 'bolt', 'cube', 'cube', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb'];
    let open = [];
    let cards = $('.deck');
    /*
    * Display the cards on the page
    *   - shuffle the list of cards using the provided "shuffle" method below
    *   - loop through each card and create its HTML
    *   - add each card's HTML to the page
    */
    icons = shuffle(icons);
    for( let i = 0; i < icons.length; i++) {
        let cardListItem = $('<li></li>');
        cardListItem.addClass('card');
        cardListItem.data('card', icons[i])
        console.log(cardListItem.data('card'))

        let cardIcon = $('<i></i>');
        cardIcon.addClass(`fa fa-${icons[i]}`);

        cardListItem.append(cardIcon);
        cards.append(cardListItem);
    }
    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function toggleVisibility(card) {
        card.toggleClass('open show');
    }

    function addToOpen(card) {
        open.push(card)
    }

    /*
    * Testing the functionality of starter
    */
    

    /*
    * set up the event listener for a card. If a card is clicked:
    *  - display the card's symbol (put this functionality in another function that you call from this one)
    *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
    *  - if the list already has another card, check to see if the two cards match
    *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
    *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
    *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
    *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
    */
    
    $('.card').on('click', function() {
        if(!($(this).hasClass('open show')) && open.length < 2) {
            toggleVisibility($(this));
            addToOpen($(this));
            if(open.length === 2) {
                if(open[0].data('card') === open[1].data('card')) {
                    open[0].addClass('match');
                    open[1].addClass('match');
                    open = [];
                }
                else {
                    setTimeout(function() {
                        toggleVisibility(open[0]);
                        toggleVisibility(open[1]);
                        open = [];
                    }, 500);
                }
                
            }
        }
        console.log(open)
    });

    
});

$(function() {
    // Data 
    let icons = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'anchor', 'anchor', 'bolt', 'bolt', 'cube', 'cube', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb'];
    let open = [];
    let cards = $('.deck');
    let moves = 0;
    let matched = 0;
    /** 
    *@description Function to initialize the app and is called after reset/completion.
    */
    function init() {
        open = [];
        moves = 0;
        matched = 0;
        cards.empty();
        icons = shuffle(icons);
        for( let i = 0; i < icons.length; i++) {
            let cardListItem = $('<li></li>');
            cardListItem.addClass('card');
            cardListItem.data('card', icons[i])

            let cardIcon = $('<i></i>');
            cardIcon.addClass(`fa fa-${icons[i]}`);

            cardListItem.append(cardIcon);
            cards.append(cardListItem);
        }
        let startList = $('.stars');
        startList.empty();
        for( let i = 0; i < 3; i++) {
            let starListItem = $('<li></li>');
            let starIcon = $('<i></i>');
            starIcon.addClass('fa fa-star');
            
            starListItem.append(starIcon);
            startList.append(starListItem);
        }
        cardClick();
        showMoves();
    }

    /**
    *@description Function to attach click listener to cards. Function also checks for match. 
    */
    function cardClick() {
        $('.card').on('click', function() {
            if(!($(this).hasClass('open show')) && open.length < 2) {
                toggleVisibility($(this));
                addToOpen($(this));
                if(open.length === 2) {
                    moves++;
                    showMoves();
                    if(open[0].data('card') === open[1].data('card')) 
                        match();
                    else
                        notMatch();
                }
                
            }
        });
    }

    /**
    * @description Function to shuffle array items.
    * @param {array} array The array to be shuffled. 
    */
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

    /**
    *@description Function to toggle the visibility of clicked card. 
    * @param {*} card The card whose visibility needs to be toggled.
    */
    function toggleVisibility(card) {
        card.toggleClass('open show');
    }

    /**
    *@description Function to add opened card to a list. 
    * @param {*} card The card whose which needs to be added to list.
    */
    function addToOpen(card) {
        open.push(card)
    }

    /**
    *@description Function to lock matched cards.
    */
    function match() {
        matched++;
        open[0].addClass('match');
        open[1].addClass('match');
        open = [];
        if(matched === 8) {
            gameCompleted();
        }
    }


    /**
    *@description Function to hide unmatched cards.
    */
    function notMatch() {
        setTimeout(function() {
            toggleVisibility(open[0]);
            toggleVisibility(open[1]);
            open = [];
        }, 500);
    }


    /**
    *@description Function to show number of moves where one move is
    * two card draw. Based on a preset number of moves, ratings can be decreased.
    */
    function showMoves() {
        $('.moves').text(moves);
        if(moves === 15 || moves === 25)
            removeRatings();
    }

    /**
    *@description Function to alert completion of game and reset.
    */
    function gameCompleted() {
        alert(`You won the with ${moves} moves`);
        init();
    }


    /**
    *@description Function to remove stars for preset moves.
    */
    function removeRatings() {
        let ratings = $('.stars li');
        ratings.last().remove()
    }
    /*
    * Testing the functionality of starter
    */

    init();

    /**
    *@description Event listener for click of reset button.
    */
    $('.restart').on('click', function() {
        init();
    })
    
});

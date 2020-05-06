

(function () {
    //console.log('function', $);

    var currentPlayer = 'player1';
    var diagonalVictories = [
        [5, 10, 15, 20],
        [4, 9, 14, 19],
        [3, 8, 13, 18],
        [11, 16, 21, 26],
        [17, 22, 27, 32],
        [23, 28, 33, 38],
        [10, 15, 20, 25],
        [4, 9, 14, 19],
        [16, 21, 26, 31],
        [22, 27, 32, 37],
        [9, 14, 19, 24],
        [15, 20, 25, 30],
        [21, 26, 31, 36],
        [41, 34, 27, 20],
        [40, 33, 26, 19],
        [39, 32, 25, 18],
        [35, 28, 21, 14],
        [29, 22, 15, 8],
        [23, 16, 9, 2],
        [33, 26, 19, 12],
        [34, 27, 20, 13],
        [28, 21, 14, 7],
        [22, 15, 8, 1],
        [27, 20, 13, 6]

    ];


    $('.column').on('click', function (e) {
        var col = $(e.currentTarget);
        // console.log('col', col);
        var slotsInCol = col.children();
        // console.log('slots in col', slotsInCol);
        for (var i = slotsInCol.length - 1; i >= 0; i--) {// because the slots are the other way around. start at 5 cause this is the lest index. This is a reverse loop
            //console.log(slotsInCol.eq(i).hasClass('player1'));

            if (!slotsInCol.eq(i).hasClass('player1') && !slotsInCol.eq(i).hasClass('player2')) {
                slotsInCol.eq(i).addClass(currentPlayer);
                break;
            }
        }

        var slotsInRow = $('.row' + i);
        console.log("slotsInRow", slotsInRow);


        if (i === -1) {
            return;
        }
        //console.log('i: ', i);


        if (checkForVictory(slotsInCol)) {
            console.log('victory column...', currentPlayer);
        } else if (checkForVictory(slotsInRow)) { // figure out how to gather row
            console.log("there was a row victory", currentPlayer);
        } else if (checkForDiagonalVictory()) {
            console.log('there was a diagonal vicotry');
        } else {
            switchPlayer();
        }
    });


    function playerVictory(playerNumber) {
        var score;

        score = $('.score' + playerNumber).html();

        $('.victoryBox' + playerNumber).css({
            visibility: 'visible',
        });
        $('.victoryBox' + playerNumber).addClass('fadeInDown');

        score++;
        $('.score' + playerNumber).html(score);

        $('.button').css({
            visibility: 'visible',
        });
        $('.button').addClass('bounceIn');
    }

    function checkForDiagonalVictory() {
        console.log('checking for diagonal');
        var slots = $('.slot');

        for (var i = 0; i < diagonalVictories.length; i++) {
            var won = true;
            console.log('checking array ' + i);

            var diagonalVictory = diagonalVictories[i];
            for (var j = 0; j < diagonalVictory.length; j++) {
                console.log('checking ele,ent ' + j);
                var slotToCheck = diagonalVictory[j];

                if (!slots.eq(slotToCheck).hasClass(currentPlayer)) {
                    won = false;
                    break;
                }
            }
            if (won) {
                if (currentPlayer === 'player1') {
                    playerVictory(1);
                } else if (currentPlayer === 'player2') {
                    playerVictory(2);
                }
                return true;
            }
        }
        return false;
    }



    function checkForVictory(slots) {
        // console.log('check victory', checkForVictory);
        //console.log('about to check for victory...');
        // check if there is a 4 in any row
        // loop the slots and if there are 4 sequentially tha sale 
        var count = 0;

        for (var i = 0; i < slots.length; i++) {
            // red cant win if yellow put a piece, need to check the current players turn
            //console.log('does the slot have the current players chip: ', slots.eq(i).hasClass(currentPlayer));

            if (slots.eq(i).hasClass(currentPlayer)) {
                // do something
                // we found a slot with current player, count++ (increment);
                count++;
                if (count === 4) {

                    if (currentPlayer === 'player1') {
                        playerVictory(1);
                    } else if (currentPlayer === 'player2') {
                        playerVictory(2);
                    }
                    return true;
                }


            } else {
                // do something else
                //maens there is no current player
                count = 0;
            }
        }

    }



    //console.log('current player before calling switchplayer', currentPlayer);

    //console.log('currentplayer after calling switch player', currentPlayer);
    function switchPlayer() {
        //console.log("currentplayer", currentPlayer);

        // if (currentPlayer === 'player1') {
        //     currentPlayer = 'player2';
        // } else {
        //     currentPlayer = 'player1';
        // }
        currentPlayer === 'player1' ? currentPlayer = 'player2' : currentPlayer = 'player1'; //switch users

    }

    $('.button').on('click', function () {
        $('.slot').removeClass('player1');
        $('.slot').removeClass('player2');

        if (currentPlayer === 'player1') {
            $('.victoryBox1').removeClass('fadeInDown');
            $('.victoryBox1').addClass('fadeOutDown ');

            setTimeout(function () {
                $('.victoryBox1').css({
                    visibility: 'hidden',
                }).removeClass('fadeOutDown');
            }, 2000);

        } else if (currentPlayer === 'player2') {
            $('.victoryBox2').removeClass('fadeInDown');
            $('.victoryBox2').addClass('fadeOutDown ');

            setTimeout(function () {
                $('.victoryBox2').css({
                    visibility: 'hidden',
                }).removeClass('fadeOutDown');
            }, 3000);
        }
    });





})();
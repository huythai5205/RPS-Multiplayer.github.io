$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyD84gH7udiZCe_TOTJh33C2_p-noEd1R9c",
        authDomain: "rps-multiplayer-c1395.firebaseapp.com",
        databaseURL: "https://rps-multiplayer-c1395.firebaseio.com",
        projectId: "rps-multiplayer-c1395",
        storageBucket: "",
        messagingSenderId: "1081343207498"
    };
    firebase.initializeApp(config);

    let player;
    let opponent;
    let waitTime = 1000;
    let waitingTimer;
    let aPlayer = [];
    let aChat = [];

    function addPlayer(name) {
        return player = {
            name: name,
            wins: 0,
            losses: 0,
            choice: '',
            ready: false,
        }
    }


    function updatePlayers() {
        firebase.database().ref('/Players').set(aPlayer);
    }

    firebase.database().ref('/Chat').on('child_added', (snap) => {
        $('.chat-box').empty();
        // snap._e.T.forEach(function (value) {
        //     $('.chat-box').append(`<p>${value}</p>`);
        // });
        $('.chat-box').html(snap._e.T);
        console.log(typeof snap._e.T);
    });

    function displayChat() {

        // firebase.database().ref('/Chat').on('child_added', (snap) => {
        //     $('.chat-box').empty();
        //     console.log(snap);
        // });
        $('.chat-box').scrollTop($('.chat-box')[0].scrollHeight);
    }

    $('#chat-btn').click(function () {
        aChat.push(`${aPlayer[player].name}-${$('#chat-input').val()}`);
        firebase.database().ref('/Chat').set(aChat);
        $('#chat-input').empty();
        displayChat();
    });

    function seeWhoWin() {
        console.log(aPlayer[player].choice);
        console.log(aPlayer[opponent].choice);
        if (aPlayer[player].choice === aPlayer[opponent].choice) {
            return 'Tie';
        } else if ((aPlayer[player].choice === 'Rock' && aPlayer[opponent].choice === 'Paper') ||
            (aPlayer[player].choice === 'Paper' && aPlayer[opponent].choice === 'Scissor') ||
            (aPlayer[player].choice === 'Scissor' && aPlayer[opponent].choice === 'Rock')) {
            aPlayer[player].losses++;
            return 'you lose';
        } else {
            aPlayer[player].wins++;
            return 'you win';
        }
    }

    function displayResult() {
        if (aPlayer[opponent].ready === true) {
            clearInterval(waitingTimer);
            aPlayer[opponent].ready = false;
            $('.result-display').html(`
                <h1>${seeWhoWin()}</h1>
            `);
            updatePlayers();
            setTimeout(function () {
                $('.result-display').html('');
                displayChoices();
            }, 3000);
        } else {
            $('.result-display').html(`
            <h1>Waiting for opponet to chose</h1>
            `);
        }

    }

    $(document).on('click', '.choice-btn', function () {
        aPlayer[player].choice = $(this).text();
        aPlayer[player].ready = true;
        updatePlayers();
        waitingTimer = setInterval(displayResult, waitTime);
        $('.player' + player + '-display').html('');
    });

    function displayChoices() {
        $('.player' + player + '-display').html(`
            <button type="button" class="choice-btn">Rock</button>
            <button type="button" class="choice-btn">Paper</button>
            <button type="button" class="choice-btn">Scissor</button>
        `);
    }

    function displayWaiting() {
        if (aPlayer[opponent].ready === true) {
            clearInterval(waitingTimer);
            aPlayer[opponent].ready = false;
            updatePlayers();
            $('.info-display').html(`
         <h1>Pick your choice</h1>
        `);
            displayChoices();
        } else {
            $('.info-display').html(`
         <h1>Waiting for player</h1>
        `);
        }
    }

    $(document).on('click', '#nameSubmitBtn', function () {
        if (aPlayer[0].name === '') {
            aPlayer[0].name = $('#nameInput').val();
            aPlayer[0].ready = true;
            updatePlayers();
            opponent = 1;
            player = 0;
            waitingTimer = setInterval(function () {
                displayWaiting(0);
            }, waitTime);
        } else if (aPlayer[1].name === '') {
            aPlayer[1].name = $('#nameInput').val();
            aPlayer[1].ready = true;
            updatePlayers();
            opponent = 0;
            player = 1;
            waitingTimer = setInterval(function () {
                displayWaiting(1);
            }, waitTime);
        } else {
            $('.info-display').html(`
                <h1>There are two players already</h1>
                `);
        }
    });

    $('#disconnect-btn').click(function () {
        aPlayer[player] = addPlayer('');
        $('player' + player + '-display').html('');
        updatePlayers();
    });

    $('#reset-game-btn').click(function () {
        firebase.database().ref().remove();
    });

    function startGame() {
        firebase.database().ref('/Players').on('value', function (data) {
            if (data.exists()) {
                aPlayer = data.val();
            } else {
                aPlayer = [addPlayer(''), addPlayer('')];
                updatePlayers();
            }
        });
        firebase.database().ref('/Chat').on('value', function (data) {
            if (data.exists()) {
                aChat = data.val();
            } else {
                aChat = [];
                firebase.database().ref('/Chat').set(aChat);
            }
        });
        $('.info-display').html(`
         <div class="input-group">
                    <input type="text" class="form-control" id="nameInput">
                    <span class="input-group-btn">
                        <button class="btn btn-secondary" id="nameSubmitBtn" type="button">Enter</button>
                    </span>
                </div>
        `);
    }
    startGame();

});
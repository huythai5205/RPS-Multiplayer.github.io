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

    let waitTime;
    let waitTimer;
    let aPlayer = [];

    let player = function (name) {
        return player = {
            name: name,
            wins: 0,
            losses: 0,
            choice: '',
            waiting: true,
            ready: true,
        }
    }

    function startGame() {
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

    function saveToDatabase(name, player) {
        firebase.database().ref(name).set(player);
    }

    function pickChoices(player) {
        $(name + '-choices').html('Display choices ');
        SetTimer(waiting(name), wait);
    }

    function displayWaiting(player) {
        console.log(player);
    }

    $(document).on('click', '#nameSubmitBtn', function () {

        firebase.database().ref().on('value', function (data) {
            console.log(data.val());
            if (!data.exists()) {
                console.log("not");
                saveToDatabase('player1', player($('#nameInput').val()));
                displayWaiting('player1');
            } else if (data.val().length === 1) {
                console.log('1');
                saveToDatabase('player2', player($('#nameInput').val()));
                displayWaiting('player2');
            } else {
                //firebase.database().ref().child('player2').remove();
                console.log('else');
                $('.info-display').html(`
                <h1>There are two players already</h1>
                `);
            }
        });
    });

});
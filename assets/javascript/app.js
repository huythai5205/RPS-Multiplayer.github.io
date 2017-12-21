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
    let firebaseRef = firebase.database().ref();

    function addPlayer(name) {
        return player = {
            name: name,
            wins: 0,
            losses: 0,
            choice: '',
            waiting: false,
            ready: false,
        }
    }

    function startGame() {
        firebaseRef.on('value', function (data) {
            if (data.exists()) {
                aPlayer = data.val();
                console.log(aPlayer);
            } else {
                let player1 = addPlayer("");
                let player2 = addPlayer("");
                let aPlayer = [player1, player2];
                saveToDatabase();
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

    function saveToDatabase() {
        firebaseRef.set(aPlayer);
    }

    function pickChoices(player) {
        $(name + '-choices').html('Display choices ');
        SetTimer(waiting(name), wait);
    }

    function displayWaiting(index) {
        console.log(index);
        if (aPlayer[index].ready === true) {
            clearInterval(waitTimer);
        }
        $('.info-display').html(`
         <h1>Waiting for player</h1>
        `);
    }

    $(document).on('click', '#nameSubmitBtn', function () {

        if (aPlayer[0].name === "") {
            console.log("not");
            aPLayer[0].name = $('#nameInput').val();
            aPlayer[0].ready = true;
            saveToDatabase();
            waitTimer = setInterval(function () {
                displayWaiting('1');
            }, 1000);
        } else if (aPlayer[1].name === "") {
            console.log('1');
            aPlayer[1].name = $('#nameInput').val();
            aPlayer[1].ready = true;
            saveToDatabase();
            waitTimer = setInterval(function () {
                displayWaiting('0');
            }, 1000);
        } else {
            console.log('else');
            $('.info-display').html(`
                <h1>There are two players already</h1>
                `);
        }
    });

});
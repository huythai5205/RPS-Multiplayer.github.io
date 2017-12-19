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

    let wait;
    let waitTimer;

    function player() {
        let name = name.input();
        let player = {
            name: name,
            Wins: 0,
            Loses: 0
        }

        firebaseRef.on('value', function (data) {
            if (data.exists() === 1) {
                $('playerOneChoices').addClass(name + 'Choice');
            } else if (data.exists() === 2) {
                $('playerTwoChoices').addClass(name + 'Choice');
            }
            saveToDatabase(name, player);
            pickChoices(name);
        });

    }

    $(document).on('click', '.choice', function () {

    });

    function pickChoices(name) {
        $(name + '-choices').html('Display choices ');
        SetTimer(waiting(name), wait);
    }

    function waiting(name) {
        $(name + '-choices').html('Display wating ');
        if (ready) {
            Cancel timer;
            Name.setready in database;
            Settimeout(Displayresult(), wait);
            PickChoices();
        } else {
            Name.setready in database;
        }
    }

    function displayResult() {
        $('.result').html(`
                    Display result;
                    `);
    }

    function saveToDatabase(#, player) {
        firebaseRef.set(player + '' + #);
    }
});
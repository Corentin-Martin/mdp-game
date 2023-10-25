
const timer = {

    temps: 90,

    timerElement: document.querySelector(".timer"),

    intervalID: null,

    init: function() {

        timer.start();

        timer.timerElement.classList.remove("timer--beforeLevelChoice");

    },

    start: function() {
        timer.intervalID = setInterval(timer.compteArebours, 1000);
    },

    stopInterval: function() {
        clearInterval(timer.intervalID);
    },

    compteArebours: function() {

        timer.timerElement.textContent = timer.temps;

        if (timer.temps <= 0) {

            timer.temps = 0;

            if (game.win === true) {

                game.youWin();

            } else {

                game.over();

            }

        } else {

            timer.temps = timer.temps -1;

        }

        timer.lastSeconds();

    },

    overTimer: function() {

        timer.temps = 0;

    },

    lastSeconds: function() {

        if (timer.temps < 10) {

            game.lifeTimerBox.classList.add("life-timer--10seconds");
            lifes.lifeBox.classList.add("life--10seconds");
            timer.timerElement.classList.add("timer--10seconds");
            
        }
    },

    reInit: function() {
        timer.timerElement.classList.add("timer--beforeLevelChoice");
        timer.timerElement.classList.remove("timer--10seconds");
        timer.timerElement.textContent = "";
        timer.stopInterval();
        timer.temps = 90;
    }


    
}



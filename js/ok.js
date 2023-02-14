const ok = {

    okButton: document.querySelector(".button-ok"),

    okBox: document.querySelector(".words__ul--ok"),

    init: function() {

        ok.okButton.addEventListener("click", ok.handleOk);

    },

    handleOk: function() {

        if (!game.overStatus) {

            let liOk = document.createElement("li");
            liOk.textContent = words.playingList[words.playingIndex-1];
            ok.okBox.append(liOk);

            score.increment();

            if (score.index === 5) {

                game.win = true;
                timer.overTimer();

            } else {

                next.nextWord();

            }

        } else {

            game.relaunch();
            
        }

    },

}


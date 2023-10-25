const level = {

    box: document.querySelector(".game"),

    selector: 0,

    init: function() {

        level.createButtons();
        level.putListeners();

    },

    createButtons: function() {

        for (let index = 1; index <= 5; index++) {

            const lvl = document.createElement("button");
            lvl.classList.add("lvl");
            lvl.dataset.level = index;
            lvl.textContent = index;
            level.box.append(lvl);

            if (dico.list.length < 9 && index == 1) {
                level.box.removeChild(level.box.lastChild);
            }
            if (dico.list.length < 8 && index == 2) {
                level.box.removeChild(level.box.lastChild);
            }
            if (dico.list.length < 7 && index == 3) {
                level.box.removeChild(level.box.lastChild);
            }
            if (dico.list.length < 6 && index == 4) {
                level.box.removeChild(level.box.lastChild);
            }
            if (dico.list.length < 5 && index == 5) {
                level.box.removeChild(level.box.lastChild);
            }

        }

        score.scoreTitle.classList.add("level_select");
        score.scoreTitle.textContent = "Sélectionnez votre niveau";

    },

    killButtons: function() {

        while (level.box.firstChild) {

            level.box.removeChild(level.box.firstChild);
            
          }

    },

    putListeners: function() {

        const levels = document.querySelectorAll(".lvl");

        for (const lvl of levels) {
            lvl.addEventListener("click", level.handleLevelClick);
        }

    },

    handleLevelClick: function(event) {

        const lvlButton = event.currentTarget;
        level.selector = lvlButton.dataset.level;

        words.available = words.onPlayingList[level.selector -1];

        game.playButton.classList.remove("play-button--beforeLevelChoice");
        game.playButton.classList.remove("play-button--whenOver");
        game.playButton.textContent = "PLAY";
        
    },

}


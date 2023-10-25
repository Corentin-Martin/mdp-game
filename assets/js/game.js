const game = {

    playButton: document.querySelector(".play-button"),

    overStatus: null,

    onGame: null,

    win: null,

    welcomeText: document.querySelector(".welcome-text"),
    welcomeLevels: document.querySelector(".welcome-levels"),

    p2: document.createElement("p"),
    p: document.createElement("p"),

    pDicoLength: document.createElement("p"),

    resultBox: document.querySelector(".results"),

    lifeTimerBox: document.querySelector(".life-timer"),

    init: function() {

        music.preGame.play();

        level.init();

        game.playButton.addEventListener("click", game.handleApp);

        document.addEventListener("keydown", game.handleKeyboard);

    },

    totalInit: function() {

        game.reInit();
        next.reInit();
        passe.reInit();
        ok.reInit();
        words.reInit();
        score.reInit();
        lifes.reInit();
        timer.reInit();
        music.reInit();
        level.init();
        
    },

    handleKeyboard: function(event) {
        if (event.key === "ArrowDown") {next.nextButton.click()};
        if (event.key === "ArrowLeft") {passe.passeButton.click()};
        if (event.key === "ArrowRight") {ok.okButton.click()};
    },

    handleApp: function(event) {

        if (game.win) {
            game.totalInit();
            return;
        }

        if (game.onGame) {
            game.totalInit();
            return;
        }

        if (!game.overStatus) {

            game.overStatus = false;
            game.onGame = true;

            game.removePreGameLayout();

            words.init();
            lifes.init();
            timer.init();
            next.init();
            score.init();
            ok.init();
            passe.init();
            game.buttonWhenOn();

            music.preGame.pause();
            music.onGame.play();

        } else {

            game.totalInit();

        }

    },

    over: function() {

        game.overStatus = true;

        lifes.killLifes();
        lifes.zeroLifes();
        timer.overTimer();
        game.buttonWhenOver();

        music.onGame.pause();
        music.over.play();

        words.divWordsToRest.hidden = true;

    },

    buttonWhenOver: function() {
        
        game.playButton.classList.remove("play-button--whenOn");
        game.playButton.classList.add("play-button--whenOver");
        game.playButton.textContent = "Retour au choix du niveau";

    },

    buttonWhenOn: function() {

        game.playButton.classList.add("play-button--whenOn");

        game.playButton.textContent = "Recommencer ?";

    },

    relaunch: function() {

        words.currentWord.remove();
        words.currentWord.classList.add("current-word");
        words.currentWord.classList.add("current-word--over");
        words.currentWord.textContent = "GAME OVER";
        words.divGame.append(words.currentWord);

    },

    removePreGameLayout: function() {

        game.welcomeText.hidden = true;
        game.resultBox.classList.remove("results--beforeLevelChoice");
        game.lifeTimerBox.classList.remove("life-timer--beforeLevelChoice");
        words.divWordsToRest.classList.remove("wordsToRest--beforeLevelChoice");

        next.nextButton.classList.remove("button--beforeLevelChoice");

        ok.okButton.classList.remove("button--beforeLevelChoice");

        level.killButtons();

    },

    youWin: function() {

        lifes.killLifes();
        game.buttonWhenOver();
        words.divWordsToRest.hidden = true;

        const life = document.createElement("li");
        life.classList.add("heart");
        life.classList.add("heart--win");
        game.lifeTimerBox.classList.add("life-timer--win");
        life.textContent = "YOU WIN";
        lifes.lifeBox.prepend(life);

        game.win = true;

        music.onGame.pause();
        music.win.play();

    },

    reInit: function() {
        game.resultBox.classList.add("results--beforeLevelChoice");
        game.welcomeText.hidden = false;

        document.querySelector(".welcome-start").hidden = true;

        game.p2.textContent = "Quel niveau voulez-vous tenter maintenant ?";

        game.welcomeText.prepend(game.p2);

        let span = document.createElement("span");
        span.classList.add("bold");

        if (game.win) {
            span.textContent = " que vous avez réussi ! Félicitations !";
        }

        if (game.overStatus) {
            span.textContent = " que vous n'avez malheureusement pas réussi pour le moment...";
        }

        if (game.onGame && !game.overStatus && !game.win) {
            span.textContent = " que vous n'avez pas terminé.";
        }
        
        game.p.textContent = "Vous venez du niveau " + level.selector;
        
        game.p.append(span);

        game.welcomeText.prepend(game.p);

        game.pDicoLength.textContent = "Info : Il reste encore " + dico.list.length + " mots dans le dictionnaire de jeu !";

        game.welcomeText.append(game.pDicoLength);

        if (dico.list.length < 4) {

            game.welcomeLevels.hidden = true;
            game.p2.hidden = true;
            game.pDicoLength.textContent = "Il n'y a plus assez de mots dans le dictionnaire du jeu. Veuillez recharger la page pour continuer à jouer.";
            score.scoreTitle.hidden = true;
            game.playButton.hidden = true;

            let button = document.createElement("button");
            button.textContent = "Rechargez la page";
            button.addEventListener("click", function(){location.reload()});
            game.welcomeText.append(button);

        }

        game.lifeTimerBox.classList.remove("life-timer--10seconds");
        game.lifeTimerBox.classList.remove("life-timer--win");
        game.lifeTimerBox.classList.add("life-timer--beforeLevelChoice");
        game.playButton.classList.remove("play-button--whenOver");
        game.playButton.classList.remove("play-button--whenOn");
        game.playButton.textContent = "Sélectionnez un niveau";
        game.overStatus = false;
        game.win = false;
        game.onGame = false;
    }

}


document.addEventListener('DOMContentLoaded', game.init);
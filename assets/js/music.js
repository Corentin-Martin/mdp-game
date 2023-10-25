const music = {

    preGame: new Audio("./assets/music/pregame-music.mp3"),

    onGame: new Audio("./assets/music/ongame-music.mp3"),

    over: new Audio("./assets/music/over-music.mp3"),

    win: new Audio("./assets/music/win-music.mp3"),

    reInit: function() {
        music.over.pause();
        music.onGame.pause();
        music.win.pause();
        music.preGame.play();
    }
}
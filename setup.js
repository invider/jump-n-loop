function setup() {

    if (env.config.newgame) {
        trap('startGame')
    } else {
        trap('mainMenu')
    }
}

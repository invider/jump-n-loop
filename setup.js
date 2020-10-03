function setup() {

    if (env.config.game) {
        trap('startGame')
    } else {
        trap('mainMenu')
    }
}

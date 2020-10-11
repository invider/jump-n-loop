function gameOver() {
    lab.musicPlayer.stop()

    setTimeout(() => trap('mainMenu'), 2000)
}

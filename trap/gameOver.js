function gameOver() {
    trap('report', {
        type: 'levelFail',
        level: env.level.index,
        at: floor(lab.musicPlayer.beat.currentTime),
    })

    lab.musicPlayer.stop()
    setTimeout(() => trap('mainMenu'), 2000)
}

function gameFinished() {
    trap('credits')

    trap('report', {
        type: 'gameComplete',
        level: level.index,
        at: lab.musicPlayer.beat.currentTime,
    })
}

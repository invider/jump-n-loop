function levelComplete() {
    lab.musicPlayer.downloadBeats()

    let next = env.level.index + 1
    if (next >= res.levels.lvl.length) {
        trap('gameFinished')
        return
    }

    const nextLevel = res.levels.lvl[next] || res.levels.lvl[1]
    
    trap('startLevel', {
        levelId: nextLevel.id,
        jump: true,
    })
}

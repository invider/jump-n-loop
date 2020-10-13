function collectLevels() {
    const dict = {
        name: 'dict',
    }
    res.levels.attach(dict)

    res.levels.lvl.forEach((l, i) => {
        l.id = l.id || 'lvl' + i
        l.index = i
        l.name = l.name || l.id
        l.track = res.tracks[l.name]
        l.beat = res.beats[l.name]
        if (!l.track || (!l.beat && !env.config.record)) {
            throw 'broken level #' + i + ' - ' + l.title
        }
        dict[l.id] = l
    })
}

function setup() {

    lib.util.hideCursor()
    collectLevels()

    _.disable()
    lab.spawn(dna.hud.Transition, {
        fadein: 0,
        keep: .5,
        fadeout: 1,

        onFadeout: function() {
            _.enable()
            if (env.config.newgame) {
                trap('startGame', {
                    difficulty: "normal",
                    lvl: "lvl1",
                    mode: "play",
                })
            } else {
                trap('title')
            }
        }
    })

    env.telcoId = 'jump-n-loop'
}

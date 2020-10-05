function collectLevels() {
    const map = {
        name: 'map',
    }
    res.levels.attach(map)

    res.levels.lvl.forEach((l, i) => {
        l.id = l.id || 'lvl' + i
        l.index = i
        map[l.id] = l
    })
}

function setup() {

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
}

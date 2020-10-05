function mainMenu() {
    const menu = lab.spawn('hud/Menu', {})

    const soundLevels = []
    for (let i = 0; i <= 10; i++) {
        soundLevels.push((i * 10) + '%')
    }

    const levelIds = []
    const levelTitles = []

    res.levels.lvl.forEach((l, i) => {
        levelIds.push(l.id)
        levelTitles.push(`${i} - ${l.title}`)
    })

    menu.selectFrom({
        items: [
            {
                title: 'new game',
                onSelect: function(menu) {
                    _.disable()
                    lab.spawn(dna.hud.Transition, {
                        fadein:  .7,
                        keep:    .5,
                        fadeout: .7,

                        onFadeout: function() {
                            _.enable()
                            menu.hide();
                            trap('startGame', menu.options());
                        }
                    })
                }
            },
            //{ section: true, title: 'difficulty' },
            {
                option: true,
                title: 'difficulty',
                id: 'difficulty',
                options: [ 'easy', 'normal', 'hard', 'hardcore' ],
                current: 1,
                limit: true,
            },
            {
                option: true,
                title: 'level',
                id: 'lvl',
                //options: [ 'lvl1', 'lvl2', 'lvl3' ],
                options: levelTitles,
                values: levelIds,
                limit: true
            },
            {
                option: true,
                title: 'volume',
                id: 'volume',
                options: soundLevels,
                limit: true,
                sync: function() {
                    const level = limit(this.current/10, 0, 1)
                    env.sfxVolume = level
                },
                syncIn: function() {
                    env.sfxVolume = env.sfxVolume || env.tune.defaultVolume
                    const level = floor(env.sfxVolume * 10)
                    this.current = level
                },
            },
            {
                title: 'credits',
                onSelect: function(menu) {
                    _.disable()
                    lab.spawn(dna.hud.Transition, {
                        fadein:  .7,
                        keep:    .5,
                        fadeout: .7,

                        onFadeout: function() {
                            _.enable()
                            menu.hide();
                            trap('credits');
                        }
                    })
                }
            },
            {
                option: true,
                title: 'mode',
                id: 'mode',
                options: [ 'play', 'record' ],
                limit: true,

                syncIn: function() {
                    if (env.config.record) {
                        this.current = 1
                    } else {
                        this.hidden = true
                        this.disabled = true
                    }
                },
            },
        ],
    })
}

function mainMenu() {
    const menu = lab.spawn('hud/Menu', {})

    let levels = []
    for (let i = 0; i <= 10; i++) {
        levels.push((i * 10) + '%')
    }

    menu.selectFrom({
        items: [
            {
                title: 'new game',
                onSelect: function(menu) {
                    menu.hide()
                    trap('startGame')
                }
            },
            //{ section: true, title: 'difficulty' },
            {
                option: true,
                title: 'difficulty',
                options: [ 'easy', 'normal', 'hard', 'hardcore' ],
                limit: true,
            },
            {
                option: true,
                title: 'volume',
                options: levels,
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
        ],
    })
}

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
                    menu.hide();
                    trap('startGame', menu.options());
                }
            },
            //{ section: true, title: 'difficulty' },
            {
                option: true,
                title: 'difficulty',
                id: 'difficulty',
                options: [ 'easy', 'normal', 'hard', 'hardcore' ],
                limit: true,
            },
            {
                option: true,
                title: 'mode',
                id: 'mode',
                options: [ 'play', 'record' ],
                limit: true
            },
            {
                option: true,
                title: 'level',
                id: 'level',
                options: [ 'lvl1', 'lvl2' ],
                limit: true
            },
            {
                option: true,
                title: 'volume',
                id: 'volume',
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

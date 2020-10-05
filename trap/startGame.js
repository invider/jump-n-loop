function startGame(options) {
    env.options = options

    const cam = lab.spawn('SlideCamera', {
        name: 'cam',
        speed: ry(.2),
        x: 0,
        y: 0,
    })

    const hero = lab.spawn('Hero', {
        hits: env.tune.hits[options.difficulty],
    })
    _$.hero = hero
    lab.control.player.bindAll(hero)

    trap('startLevel', {
        levelId: options.lvl,
        jump: false,
    })
}

function startGame(options) {
    env.options = options

    const cam = lab.spawn('SlideCamera', {
        Z: 11,
        name: 'cam',
        speed: ry(.4),
        x: 0,
        y: 0,
        zoomOnPlusMinus: true,
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

function startGame(options) {

    const cam = lab.spawn('SlideCamera', {
        name: 'cam',
        speed: ry(.2),
        x: 0,
        y: 0,
    })

    const planet = cam.spawn('Planet', {
        name: 'planet',
        x: 0,
        y: 0,
        //r: ry(.24),
        r: ry(.4),
        options: options 
    })
    _$.planet = planet

    const hero = lab.spawn('Hero', {
        hits: env.tune.hits[options.difficulty],
    })
    _$.hero = hero
    hero.land(planet)
    cam.target = hero.target

    if (_$.musicPlayer) _$.musicPlayer.stop()
    _$.musicPlayer = lab.spawn('MusicPlayer', options)

    lab.control.player.bindAll(hero)
}

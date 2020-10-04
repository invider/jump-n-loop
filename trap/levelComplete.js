function levelComplete() {
    log('COMPLETE')

    const hero = _$.hero
    const planet = _$.planet

    const nx = planet.x + rx(1)
    const ny = planet.y - ry(.5)
    const options = planet.options

    const newPlanet = lab.cam.spawn('Planet', {
        x: nx,
        y: ny,
        r: ry(.4),
        options: options,
    })

    hero.hits = env.tune.hits[options.difficulty]
    hero.teleport()
    hero.land(newPlanet)
    lab.cam.target = hero.target

    if (_$.musicPlayer) _$.musicPlayer.stop()
    _$.musicPlayer = lab.spawn('MusicPlayer', options)
}

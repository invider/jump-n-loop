function startLevel(opt) {
    const level = res.levels.dict[opt.levelId] || res.levels.lvl[0]
    env.level = level
    log(`Starting #${level.index} - ${level.title}`)
    lab.spawn('hud/LevelTitle', {
        title: level.title,
        x: rx(.5),
        y: ry(.12),
    })

    const hero = _$.hero
    let planet = _$.planet
    const nx = planet? planet.x + rx(1) : 0
    const ny = planet? planet.y - ry(.5) : 0
    if (planet) hero.teleport()

    planet = lab.cam.spawn('Planet', {
        x: nx,
        y: ny,
        //r: ry(.24),
        r: ry(.4),
    })
    _$.planet = planet

    hero.hits = env.tune.hits[env.options.difficulty]
    hero.land(planet)
    lab.cam.target = hero.target

    if (_$.musicPlayer) _$.musicPlayer.stop()
    _$.musicPlayer = lab.spawn('MusicPlayer', opt.levelId)
}

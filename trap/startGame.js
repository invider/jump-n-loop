function startGame() {
    const planet = lab.spawn('Planet', {
        name: 'planet',
        x: rx(.5),
        y: ry(.5),
        r: ry(.24),
    })

    const hero = lab.spawn('Hero')
    _$.hero = hero
    hero.land(planet)
    lab.spawn('MusicPlayer')

    lab.control.player.bindAll(hero)
}

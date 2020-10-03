function startGame() {
    const hero = lab.spawn('Hero')
    _$.hero = hero
    hero.land(lab.planet)
    lab.spawn('MusicPlayer')

    lab.control.player.bindAll(hero)
}

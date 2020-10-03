function startGame() {
    const hero = lab.spawn('Hero')
    _$.hero = hero
    hero.land(lab.planet)

    lab.control.player.bindAll(hero)
}

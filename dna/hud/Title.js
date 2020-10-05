class Title {

    constructor(st) {
        augment(this, st)
    }

    onSpawn() {
        lab.control.player.bindAll(this)
    }

    activate(id) {
        switch(id) {
            case 1: this.close(); break;
        }
    }

    evo(dt) {
        if (this.ttl <= 0) return

        this.ttl -= dt
        if (this.ttl < 0) {
            this.close()
        }
    }

    draw(dt) {
        baseMiddle()
        alignCenter()
        font(env.style.titleFont)
        fill(env.style.titleColor)

        text(this.title, rx(.5), ry(.5))
    }

    close() {
        const screen = this

        _.disable()
        lab.control.player.unbindAll()
        lab.spawn(dna.hud.Transition, {
            fadein: 1,
            keep: .5,
            fadeout: 1,

            onFadeout: function() {
                defer(() => screen.__.detach(screen))
                _.enable()
                trap('mainMenu')
            }
        })
    }
}

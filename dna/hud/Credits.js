class Credits extends sys.LabFrame {

    constructor(st) {
        super(st)
    }

    init() {
        const scroll = this
        lab.control.player.bindAll(scroll)
        setTimeout(() => scroll.roll(), 1000)
    }

    roll() {
        // scoll the credits
        const speed = 30
        const time = ry(.6) / speed

        const scroll = this.spawn('text/scroll', {
            name: 'scroll',
            layer: this,
            rx: 50,
            ry: 80,
            period: 1.7,
            time: time,       // how long display each line
            fadein: 4,
            fadeout: 4,
            speed: -speed,
            txt: res.txt.credits,
            font: env.style.font,
            color: '#FFFFFF',
        })

        const totalTime = (scroll.txt.length * scroll.period) + time
        this.attach({
            name: 'control',
            ttl: totalTime,
            evo: function(dt) {
                if (this.ttl > 0) {
                    this.ttl -= dt
                    if (this.ttl <= 0) {
                        this.__.close()
                    }
                }
            },
            draw: function() {
                //fill('#606060')
                //rect(rx(.5), ry(.5), 100, 100)
            },
        })
    }

    activate(id) {
        log(id)
        switch(id) {
            case 1: this.close(); break;
        }
    }

    close() {
        const credits = this

        _.disable()
        lab.control.player.unbindAll()
        lab.spawn(dna.hud.Transition, {
            fadein: 1,
            keep: .5,
            fadeout: 1,

            onFadeout: function() {
                defer(() => credits.__.detach(credits))
                _.enable()
                if (env.config.newgame) {
                    trap('startGame')
                } else {
                    trap('mainMenu')
                }
            }
        })
    }
}

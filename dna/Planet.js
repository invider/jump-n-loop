// default values
const df = {
    x: rx(.5),
    y: ry(.5),
    r: ry(.1),
    angle: 0
}

let id = 0

class Planet extends sys.LabFrame {

    constructor(st) {
        super()
        augment(this, df)
        augment(this, st)
        this.rotationSpeed = env.tune.rotationSpeed;
    }

    onSpawn() {
        // for (let i = 0; i < 7; i++) {
        //     this.spawn('surface/Body', {
        //         name: 'tree' + (++id),
        //         a: rnd(TAU),
        //     })
        // }
    }

    collide(dt) {
        const hero = this.hero
        if (!hero) return

        for (let i = 0; i < this._ls.length; i++) {
            const e = this._ls[i]
            if (e.touch) e.touch(hero)
        }
    }

    evo(dt) {
        this.angle = lib.math.normalizeAngle(this.angle - this.rotationSpeed * dt)

        for (let i = 0; i < this._ls.length; i++) {
            const e = this._ls[i]
            if (e.evo && !e.paused) e.evo(dt)
        }
        this.collide(dt)
    }

    draw() {
        save()
        translate(this.x, this.y)
        rotate(this.angle)

        lineWidth(2)
        stroke(.52, .5, .5)
        circle(0, 0, this.r)

        line(0, this.r, 0, this.r + 16)
        line(0, -this.r, 0, -this.r - 8)

        for (let i = 0; i < this._ls.length; i++) {
            const e = this._ls[i]
            if (e.draw && !e.hidden) e.draw()
        }

        restore()
    }
}

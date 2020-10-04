// default values
const df = {
    x: rx(.5),
    y: ry(.5),
    r: ry(.1),
    angle: 0,
    color: hsl(.4, .3, .4),
    surfaceWidth: 4,
    surfaceColor: hsl(.4, .5, .5),
}

let id = 0

class Planet extends sys.LabFrame {

    constructor(st) {
        super()
        this.name = 'planet' + (++id)
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
    isRecording(){
        return this.options.mode == "record";
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

        // planet body
        fill(this.color)
        circle(0, 0, this.r)

        // planet surface
        lineWidth(this.surfaceWidth)
        stroke(this.surfaceColor)
        circle(0, 0, this.r - this.surfaceWidth/2)

        // axes
        line(0, this.r, 0, this.r + 16)
        //line(0, -this.r, 0, -this.r - 8)

        for (let i = 0; i < this._ls.length; i++) {
            const e = this._ls[i]
            if (e.draw && !e.hidden) e.draw()
        }
        restore()
    }
}

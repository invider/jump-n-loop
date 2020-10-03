// default values
const df = {
    x: rx(.5),
    y: ry(.5),
    r: ry(.1),
    angle: 0,
    rotationSpeed: .1 * TAU,
}

class Planet extends sys.LabFrame {

    constructor(st) {
        super()
        augment(this, df)
        augment(this, st)
    }

    onSpawn() {
        this.spawn('surface/Body', {
            name: 'tree1',
            a: .4,
        })
        this.spawn('surface/Body', {
            name: 'tree2',
            a: PI,
        })
        this.spawn('surface/Body', {
            name: 'tree3',
            a: 1.5 * PI,
        })
    }

    evo(dt) {
        this.angle = lib.math.normalizeAngle(this.angle - this.rotationSpeed * dt)

        for (let i = 0; i < this._ls.length; i++) {
            const e = this._ls[i]
            if (e.evo && !e.paused) e.evo(dt)
        }
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

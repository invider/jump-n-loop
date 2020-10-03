// default values
const df = {
    x: rx(.5),
    y: ry(.5),
    r: ry(.1),
    angle: 0,
    rotationSpeed: TAU,
}

class Planet extends sys.LabFrame {

    constructor(st) {
        super()
        augment(this, df)
        augment(this, st)
    }

    evo(dt) {
        this.angle = lib.math.normalizeAngle(this.angle - this.rotationSpeed * dt)
    }

    draw() {
        save()
        translate(this.x, this.y)
        rotate(this.angle)

        lineWidth(2)
        stroke(.52, .5, .5)
        circle(0, 0, this.r)

        line(0, this.r, 0, this.r + 10)
        line(0, -this.r, 0, -this.r - 10)

        restore()
    }
}

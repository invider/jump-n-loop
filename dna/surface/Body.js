const df = {
    a: 0,
    h: 0,
}

class Body {

    constructor(st) {
        augment(this, df)
        augment(this, st)

        this.aspeed = TAU / RND(4, 12)
    }

    evo(dt) {
        this.a += this.aspeed * dt
    }

    draw() {
        save()
        rotate(this.a)
        translate(0, this.__.r + this.h)

        lineWidth(2)
        fill(.01, .5, .5)
        rect(-5, 0, 10, 20)

        restore()
    }
}

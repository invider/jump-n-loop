const df = {
    angle: 0,
    h: 0,
    ttl: 5,
    lifeTime: 0
}

class Body {

    constructor(st) {
        augment(this, df)
        augment(this, st)
    }

    evo(dt) {
        this.lifeTime += dt;
        if (this.lifeTime > this.ttl){
            defer(() => this.__.detach(this))
        }
    }

    draw() {
        save()
        rotate(this.angle);
        translate(0, this.__.r + this.h)

        lineWidth(2)
        fill(.01, .5, .5)
        rect(-15, 0, 30, 40)

        restore()
    }
}

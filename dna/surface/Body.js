const df = {
    angle: 0,
    h: 0,
    angleWidth: .02,
    bodyHeight: 10,

    // ttl: 3.3, // just after touch
    ttl: 6.5,
}

class Body {

    constructor(st) {
        augment(this, df)
        augment(this, st)
    }

    touch(hero) {
        if (hero.angle >= this.angle - this.angleWidth
                    && hero.angle <= this.angle + this.angleWidth
                    && hero.h <= this.bodyHeight
                    && hero.lastHit !== this) {
            // collision!
            hero.hit(this)
        }
    }

    evo(dt) {
        this.ttl -= dt
        if (this.ttl < 0){
            defer(() => this.__.detach(this))
        }
    }

    draw() {
        save()
        rotate(this.angle);
        translate(0, this.__.r + this.h)

        lineWidth(2)
        fill(.01, .5, .5)
        triangle(0, 15, -7, 0, 7, 0)

        restore()
    }
}

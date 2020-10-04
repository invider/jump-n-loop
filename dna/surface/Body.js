const df = {
    angle: 0,
    h: 0,
    angleWidth: .02,
    bodyHeight: 10,
    color: hsl(.01, .5, .5),

    hideTime: 0.2,
    ttl: 6,
    //ttl: 3.3, // just after touch
}

class Body {

    constructor(st) {
        augment(this, df)
        augment(this, st)
        this.ttl = this.ttl + rnd() // add some variety
    }

    init() {
        const r = this.__.r
        const a = 0
        const emitter = lib.vfx.implosion(this.__,
            cos(a) * r,
            sin(a) * r,
            this.color)

        const ea = this.angle + PI/2
        const edraw = emitter.draw
        emitter.draw = function() {
            save()
            rotate(ea)
            edraw.apply(this)
            restore()
        }
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
        this.hideTime -= dt
        if (this.ttl < 0){
            this.kill()
        }
    }

    draw() {
        if (this.hideTime > 0) return
        save()
        rotate(this.angle);
        translate(0, this.__.r + this.h)

        lineWidth(2)
        fill(this.color)
        triangle(0, 15, -7, 0, 7, 0)

        restore()
    }

    kill() {
        const planet = this.__
        const body = this

        defer(() => planet.detach(body))

        const r = planet.r
        const a = 0
        const emitter = lib.vfx.blowup(this.__,
            cos(a) * r,
            sin(a) * r,
            this.color)

        const ea = this.angle + PI/2
        const edraw = emitter.draw
        emitter.draw = function() {
            save()
            rotate(ea)
            edraw.apply(this)
            restore()
        }
    }
}

const df = {
    name: 'hero',
    angle: 0,
    h: 0,
    x: rx(.5),
    y: ry(.5),
    hits: 5,
    jumps: 0,
}

class Hero {

    constructor(st) {
        augment(this, df)
        augment(this, st)
    }

    land(planet) {
        this.surface = true
        this.angle = PI
        this.h = 0
        this.__.detach(this)
        planet.attach(this)
    }

    jump(h) {
        if (this.jumps > 2) return
        if (this.jumps > 0) h = h/2
        this.h += h
        this.jumps ++
    }

    activate(id) {
        switch(id) {
            case 1: this.jump(env.tune.jump); break; 
        }
    }

    hit(body) {
        this.hits --
        this.lastHit = body
        this.jumps = 0
        this.jump(env.tune.hitJump)
    }


    evo(dt) {
        this.angle = lib.math.normalizeAngle(
            this.angle + this.__.rotationSpeed * dt)

        // gravity
        if (this.h > 0) {
            this.h = max(this.h - env.tune.gravity * dt, 0)
            if (this.h === 0) this.jumps = 0
        }
    }

    draw() {
        save()
        rotate(this.angle)
        translate(0, this.__.r + this.h)

        lineWidth(4)
        fill(.5, .5, .5)
        rect(-10, 0, 20, 40)

        restore()
    }
}

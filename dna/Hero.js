const df = {
    name: 'hero',
    angle: 0,
    h: 0,
    x: rx(.5),
    y: ry(.5),
    hits: 5,
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
        this.h = h
    }

    activate(id) {
        switch(id) {
            case 1: this.jump(env.tune.jump); break; 
        }
    }

    hit(body) {
        this.lastHit = body
        this.jump(env.tune.hitJump)
    }


    evo(dt) {
        this.angle = lib.math.normalizeAngle(
            this.angle + this.__.rotationSpeed * dt)

        // gravity
        if (this.h > 0) {
            this.h = max(this.h - env.tune.gravity * dt, 0)
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

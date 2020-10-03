const df = {
    a: 0,
    h: 0,
    x: rx(.5),
    y: ry(.5),
}

class Hero {

    constructor(st) {
        augment(this, df)
        augment(this, st)
    }

    land(planet) {
        this.surface = true
        this.a = PI
        this.h = 0
        this.__.detach(this)
        planet.attach(this)
    }

    jump(h) {
        this.h = 60
    }

    activate(id) {
        switch(id) {
            case 5: this.jump(); break; 
        }
    }

    evo(dt) {
        this.a = lib.math.normalizeAngle(
            this.a + this.__.rotationSpeed * dt)

        // gravity
        if (this.h > 0) {
            this.h = max(this.h - env.tune.gravity * dt, 0)
        }
    }

    draw() {
        save()
        rotate(this.a)
        translate(0, this.__.r + this.h)

        lineWidth(4)
        fill(.5, .5, .5)
        rect(-15, 0, 30, 50)

        restore()
    }
}

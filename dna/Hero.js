const df = {
    name: 'hero',
    angle: 0,
    h: 0,
    x: rx(.5),
    y: ry(.5),
    hits: 5,
    jumps: 0,
    color: hsl(.55, .5, .5),
    blood: hsl(0.97, .82, .47),
}

class Hero {

    constructor(st) {
        augment(this, df)
        augment(this, st)
        this.target = {
            x: 0,
            y: 0,
        }
    }

    land(planet) {
        this.landed = true
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
        lab.musicPlayer.beatTimer.record();
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

        lib.vfx.ouch(lab.cam, this.x, this.y, hsl(.4, .5, .5))

        if (this.hits <= 0) {
            this.kill()
        } else {
            this.jump(env.tune.hitJump)
            this.updateTarget()
            //lib.vfx.jet(lab.cam, this.x, this.y, hsl(.55, .5, .5))
            // TODO play hit sfx
        }
    }

    updateTarget() {
        if (this.landed) {
            const p = this.__
            const a = p.angle + this.angle + PI/2
            const r = p.r - ry(.2)
            const h = this.h
            this.target.x = p.x + cos(a) * r
            this.target.y = p.y + sin(a) * r
            this.x = p.x + cos(a) * (p.r + h)
            this.y = p.y + sin(a) * (p.r + h)
        } else {
            this.target.x = this.x
            this.target.y = this.y
        }
    }

    evo(dt) {
        this.angle = lib.math.normalizeAngle(
            this.angle + this.__.rotationSpeed * dt)

        // gravity
        if (this.h > 0) {
            this.h = max(this.h - env.tune.gravity * dt, 0)
            if (this.h === 0) this.jumps = 0
        }

        this.updateTarget()
    }

    draw() {
        save()
        rotate(this.angle)
        translate(0, this.__.r + this.h)

        lineWidth(4)
        fill(this.color)
        rect(-10, 0, 20, 35)

        restore()
    }

    kill() {
        this.dead = true
        const hero = this
        defer(() => hero.__.detach(hero))
        lib.vfx.death(lab.cam, this.x, this.y, this.blood)

        trap('gameOver')
    }
}

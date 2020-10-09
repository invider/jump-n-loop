const H = 35
const W = 20
const MAX_JUMPS = 1

const df = {
    name: 'hero',
    angle: 0,
    h: 0,
    dh: 0,
    x: rx(.5),
    y: ry(.5),
    w: W,
    timer: 0,
    hits: 5,
    jumps: 0,
    color: hsl(.55, .5, .5),
    parts: hsl(.6, .5, .6),
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
        _$.planet = planet
    }

    jump(h, controlled) {
        if (this.jumps > MAX_JUMPS) return
        if (controlled && this.jumps > 0) h = h/2
        //this.h += h
        this.dh = h
        this.jumps ++
        lab.musicPlayer.beatTimer.record();

        if (controlled) sfx(res.sfx.jump, env.mixer.jump)
    }

    activate(id) {
        switch(id) {
            case 1: this.jump(env.tune.jump, true); break; 
        }
    }

    hit(body) {
        if (!this.god) this.hits --
        this.lastHit = body
        this.jumps = 0

        lib.vfx.ouch(lab.cam, this.x, this.y, this.parts)

        if (this.hits <= 0) {
            this.kill()
        } else {
            this.jump(env.tune.hitJump)
            this.updateTarget()
            //lib.vfx.jet(lab.cam, this.x, this.y, hsl(.55, .5, .5))
            sfx(res.sfx.scratch, env.mixer.hit)
        }
    }

    touchdown() {
        lib.vfx.touchdown(lab.cam, this.x + this.w/2, this.y,
            this.__.surfaceColor, 1)
        lib.vfx.touchdown(lab.cam, this.x, this.y,
            this.__.surfaceColor, .5)
        lib.vfx.touchdown(lab.cam, this.x - this.w/2, this.y,
            this.__.surfaceColor, .3)
        sfx(res.sfx.touchdown, env.mixer.touchdown)
    }

    updateTarget() {
        if (this.landed) {
            const p = this.__
            const a = p.angle + this.angle + PI/2
            const r = p.r - ry(.2) / lab.cam.scale

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
        this.timer += dt
        this.angle = lib.math.normalizeAngle(
            this.angle + this.__.rotationSpeed * dt)

        if (this.dh !== 0) {
            this.h += this.dh * dt
            if (this.h < 0) {
                // touchdown!
                this.h = 0
                this.dh = 0
                this.jumps = 0
                this.touchdown()
            } else {
                // gravity
                this.dh -= env.tune.gravity * dt
            }
        }
        /*
        // gravity
        if (this.h > 0) {
            this.h = max(this.h - env.tune.gravity * dt, 0)
            if (this.h === 0) {
                this.jumps = 0
                this.touchdown()
            }
        }
        */

        this.updateTarget()
    }

    drawEye(x, y) {
        const w = 6
        fill('#ffffff')
        rect(x-w/2, y-w/2, w, w)

        fill('#000000')
        rect(x-2, y-2, 2, 2)
    }

    drawBody() {
        const period = (this.timer*2) % 1

        const BY = .25 * H
        const EY = .8 * H

        fill(this.color)
        rect(-W/2, BY, W, H-BY)

        this.drawEye(0,     EY)
        this.drawEye(-W*.5, EY)

        lineWidth(2)
        stroke(this.color)

        let leftY = 0
        let rightY = BY/2
        if (this.h === 0) {
            leftY = period < .5? 0 : BY/2
            rightY = period < .5? BY/2 : 0
        }
        line(.4*W,  BY, .4*W, leftY)
        line(-.2*W, BY, -.2*W, rightY)
    }

    draw() {
        save()
        rotate(this.angle)
        translate(0, this.__.r + this.h)

        this.drawBody()

        restore()
    }

    teleport() {
        lib.vfx.teleport(lab.cam, this.x, this.y, this.color)
        sfx(res.sfx.teleport, env.mixer.teleport)
    }

    kill() {
        this.dead = true
        const hero = this
        defer(() => hero.__.detach(hero))
        lib.vfx.death(lab.cam, this.x, this.y, this.blood)
        sfx(res.sfx.destiny, env.mixer.die)

        trap('gameOver')
    }
}

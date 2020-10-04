
function ouch(target, x, y, color) {
    const s = ry(.001)
    target.spawn(dna.Emitter, {
        x: x,
        y: y,
        dx: -70*s,
        color: color,
        lifespan: 0.05,
        force: 1000,
        radius: 0,
        size: 2*s, vsize: 2*s,
        speed: 200*s, vspeed: 50*s,
        angle: PI, spread: 0.3 * PI,
        minLifespan: .4, vLifespan: 0.4,
        drawParticle: function() {
            fill(this.color)
            rect(floor(this.x), floor(this.y), this.r, this.r)
        }
    })
}

function death(target, x, y, color) {
    const s = ry(.001)
    target.spawn(dna.Emitter, {
        x: x,
        y: y,
        dx: -50 * s,
        color: color,
        lifespan: .3,
        force: 2000,
        radius: 0,
        size: 2*s, vsize: 4*s,
        speed: 150*s, vspeed: 100*s,
        angle: PI, spread: PI,
        minLifespan: 0.5, vLifespan: 0.2,
        drawParticle: function() {
            fill(this.color)
            rect(floor(this.x), floor(this.y), this.r, this.r)
        }
    })
}

function touchdown(target, x, y, color, intencity) {
    const s = ry(.001)
    target.spawn(dna.Emitter, {
        x: x,
        y: y,
        //dx: -70*s,
        color: color,
        lifespan: 0.01,
        force: 2000 * intencity,
        radius: 0,
        size: 4*s, vsize: 0,
        speed: 100*s, vspeed: 40*s,
        angle: 0.96*PI, spread: 0.1 * PI,
        minLifespan: .4, vLifespan: 0.6,
        drawParticle: function() {
            fill(this.color)
            rect(floor(this.x), floor(this.y), this.r, this.r)
        }
    })
}


function hintAt(text, x, y, color) {
    color = color || env.style.color.c3
    lab.screen.battle.vfx.spawn(dna.hud.fadeText, {
        text: text,
        font: env.style.font,
        fillStyle: color,
        align: 'left',
        ttl: 4,
        tti: 0.3,
        ttf: 1,

        x: x,
        y: y,
        dx: RND(12) - 6,
        dy: -4 -RND(10),
    })
}

function mintAt(text, x, y, color) {
    color = color || env.style.color.c2
    lab.screen.battle.vfx.spawn(dna.hud.fadeText, {
        text: text,
        font: env.style.font,
        fillStyle: color,
        align: 'left',
        ttl: 4,
        tti: 0.3,
        ttf: 1,

        x: x,
        y: y,
        dx: RND(12) - 6,
        dy: 4 + RND(10),
    })
}

function debris(x, y, color) {
    color = color || env.style.color.c1
    lab.screen.battle.vfx.spawn(dna.Emitter, {
        x: x,
        y: y,
        color: color,
        lifespan: 0.1,
        force: 1500,
        radius: 0,
        size: 1,
        speed: 8, vspeed: 8,
        angle: 0, spread: 2*Math.PI,
        minLifespan: 0.4, vLifespan: 0.6,
        drawParticle: function() {
            fill(this.color)
            rect(floor(this.x), floor(this.y), this.r, this.r)
        }
    })
}

function explosion(x, y, color) {
    color = color || env.style.color.c1
    lab.screen.battle.vfx.spawn(dna.Emitter, {
        x: x,
        y: y,
        color: color,
        lifespan: 0.1,
        force: 2500,
        radius: 0,
        size: 1,
        speed: 15, vspeed: 0,
        angle: 0, spread: 2*Math.PI,
        minLifespan: 0.8, vLifespan: 0.4,
        drawParticle: function() {
            fill(this.color)
            rect(floor(this.x), floor(this.y), this.r, this.r)
        }
    })
}

function deflect(x, y, color) {
    color = color || env.style.color.c3
    lab.screen.battle.vfx.spawn(dna.Emitter, {
        x: x,
        y: y,
        color: color,
        lifespan: 0.05,
        force: 1000,
        radius: 0,
        size: 1,
        speed: 10, vspeed: 0,
        angle: 0, spread: 2*Math.PI,
        minLifespan: 0.4, vLifespan: 0.2,
        drawParticle: function() {
            fill(this.color)
            rect(floor(this.x), floor(this.y), this.r, this.r)
        }
    })
}


function jet(target, x, y, color) {
    const s = ry(.001)
    target.spawn(dna.Emitter, {
        x: x,
        y: y,
        color: color,
        lifespan: 0.05,
        force: 1000,
        radius: 0,
        size: 2*s, vsize: 2*s,
        speed: 100*s, vspeed: 10*s,
        angle: 0, spread: PI,
        minLifespan: 1, vLifespan: 0.5,
        drawParticle: function() {
            fill(this.color)
            rect(floor(this.x), floor(this.y), this.r, this.r)
        }
    })
}

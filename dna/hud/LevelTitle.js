const df = {
    x: 0,
    y: 0,

    hold:    1.5,
    fadein:  2,
    keep:    1,
    fadeout: 2,
    state:   0,
    timer:   0,
}

class LevelTitle {

    constructor(st) {
        augment(this, df)
        augment(this, st)
        this.timer = this.hold
    }

    evo(dt) {
        this.timer -= dt
        switch(this.state) {
            case 0:
                if (this.timer < 0) {
                    this.state = 1
                    this.timer = this.fadein
                }
                break

            case 1:
                if (this.timer < 0) {
                    this.state = 2
                    this.timer = this.keep
                }
                break
            case 2:
                if (this.timer < 0) {
                    this.state = 3
                    this.timer = this.fadeout
                }
                break

            case 3:
                if (this.timer < 0) {
                    const title = this
                    this.state = 4
                    defer(() => title.__.detach(title))
                }
                break
        }
    }

    draw() {
        save()
        if (this.state < 1 || this.state > 3) return

        switch(this.state) {
            case 1:
                alpha(1 - this.timer/this.fadein)
                break
            case 2:
                alpha(1)
                break
            case 3:
                alpha(this.timer/this.fadeout)
                break
        }
        baseMiddle()
        alignCenter()
        fill('#ffffff')
        text(this.title, this.x, this.y)

        restore()
    }
}

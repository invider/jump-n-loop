// default values
const df = {
    x: rx(.06),
    y: rx(.06),
    r: ry(.01),
    lifetime:0
}

class Beat extends sys.LabFrame {

    constructor(st) {
        super()
        augment(this, df)
        augment(this, st)
    }

    onSpawn() {
       
    }

    evo(dt) {
        this.lifetime += dt;
        if (this.lifetime > 0.3){
            defer(() => this.__.detach(this))
        }
    }

    draw() {
        save()
        translate(this.x, this.y)
        lineWidth(2)
        fill(.87, .5, .5)
        circle(0, 0, this.r)
        restore()
    }
}

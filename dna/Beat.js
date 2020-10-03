// default values
const df = {
    x: rx(.1),
    y: ry(.1),
    r: ry(.1),
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
            kill(this);
        }
    }

    draw() {
        save()
        translate(this.x, this.y)
        lineWidth(2)
        stroke(.52, .5, .5)
        circle(0, 0, this.r)
        restore()
    }
}

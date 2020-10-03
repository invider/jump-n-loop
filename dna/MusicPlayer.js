// default values
const df = {
    
}

class MusicPlayer {

    constructor(st) {
        this.timer = 0;
        this.currentJsonPos = 0;
        augment(this, df)
        augment(this, st)
        this.lvl = "lvl1";
    }

    onSpawn() {
        res.sfx.lvl1.play();
    }

    evo(dt) {
        //res.sfx.lvl1.pause();
        this.timer = $.res.sfx[this.lvl].currentTime;
        if (res.beats[this.lvl][this.currentJsonPos] <= this.timer) {
            this.currentJsonPos ++;
            trap("beat");
        }
    }

    draw() {
        
    }
}

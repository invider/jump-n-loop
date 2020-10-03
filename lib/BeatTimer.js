class BeatTimer {
    constructor(lvl){
        this.lvl = lvl;
        this.currentJsonPos = 0;
        this.timer = 0;
    }

    evo(dt){
        this.timer += dt;
        if (res.beats[this.lvl][this.currentJsonPos] <= this.timer) {
            this.currentJsonPos ++;
            return true;
        } else {
            return false;
        }
    }

}
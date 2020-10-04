class BeatTimer {
    constructor(st){
        this.lvl = "lvl1"
        this.currentJsonPos = 0;
        this.timer = 0;
        this.record = false;
        augment(this, st);
        this.recordedBeats = [];
    }
    record(){
        if (this.record){
            this.recordedBeats.push(this.timer);
        }
    }
    evo(dt){
        this.timer += dt;
        if (!this.record && res.beats[this.lvl][this.currentJsonPos] <= this.timer) {
            this.currentJsonPos ++;
            return true;
        } else {
            return false;
        }
    }
}
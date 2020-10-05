
let id = 0
class BeatTimer {
    constructor(st){
        this.lvl = "lvl1"
        this.currentJsonPos = 0;
        this.timer = 0;
        this.recordMode = false;
        augment(this, st);
        this.recordedBeats = [];
    }

    record(){
        if (this.recordMode){
            this.recordedBeats.push(this.timer);

            // spawn a dummy body
            _$.planet.spawn("surface/Body", {
                name: 'dummy' + (++id),
                angle: _$.hero.angle,
                touch: false,
                ttl: 4,
                hideTime: 0,
            })
        }
    }

    download() {
        if (env.config.record) {
            lib.util.downloadJSON("lvl", this.recordedBeats)
        }
    }

    evo(dt){
        this.timer += dt;
        if (!this.recordMode && res.beats[this.lvl][this.currentJsonPos] <= this.timer) {
            this.currentJsonPos ++;
            return true;
        } else {
            return false;
        }
    }
}

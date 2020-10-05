const df = {
    lvl: 'lvl1',
    timer: 0,
    currentJsonPos: 0,
    recordMode: false,
}

let id = 0
class BeatTimer {

    constructor(st){
        augment(this, df)
        augment(this, st)
        this.recordedBeats = []
        if (this.recordMode) env.status = 'recording'
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
            lib.util.downloadJSON(this.level.name, this.recordedBeats)
        }
    }

    evo(dt){
        this.timer += dt;
        if (!this.recordMode && this.level.beat[this.currentJsonPos] <= this.timer) {
            this.currentJsonPos ++;
            return true;
        } else {
            return false;
        }
    }
}

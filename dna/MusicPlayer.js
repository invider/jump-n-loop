// default values
const df = {
    
}

class MusicPlayer {

    constructor(st) {
        st = st || {};
        this.started = 0;
        this.name = "musicPlayer";
        augment(this, df)
        augment(this, st)
        this.lvl = st.lvl || "lvl1";
    }

    onSpawn() {
        this.beatTimer = new lib.BeatTimer({lvl: this.lvl, recordMode: _$.planet.isRecording()});
        this.offsetBeatTimer = new lib.BeatTimer({lvl: this.lvl, recordMode: _$.planet.isRecording()});
    }
    
    evo(dt) {
        if (this.offsetBeatTimer.evo(dt)){
            if (!_$.planet.isRecording()){
                trap("spawnObstacle");
            }
        }

        if (this.offsetBeatTimer.timer >= env.tune.spawnOffset - env.tune.musicOffset){
            if (this.beatTimer.evo(dt)){
                trap("beat");
            }
            if (!this.started){
                res.sfx[this.lvl].volume = env.sfxVolume || .7
                res.sfx[this.lvl].play();
                this.started = true;
            }
        }
    }

    draw() {
        
    }
}

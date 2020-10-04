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

    stop() {
        if (!this.beat) return
        this.beat.pause()
        this.beat.currentTime = 0
        this.started = false
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
                // start the beat
                const beat = res.sfx[this.lvl] || res.sfx.lvl1
                beat.volume = env.sfxVolume || .7
                beat.pause()
                beat.currentTime = 0
                beat.play();
                this.beat = beat
                this.started = true;
            }
        }
    }

    draw() {
        
    }
}

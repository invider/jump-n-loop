const WAITING = 0
const PLAYING = 1
const STOPED = 2

// default values
const df = {
}

class MusicPlayer {

    constructor(st) {
        st = st || {};
        this.status = WAITING;
        this.name = "musicPlayer";
        augment(this, df)
        augment(this, st)
        this.lvl = st.lvl || "lvl1";
        this.beat = res.sfx[this.lvl]
    }

    onSpawn() {
        this.beatTimer = new lib.BeatTimer({lvl: this.lvl, recordMode: _$.planet.isRecording()});
        this.offsetBeatTimer = new lib.BeatTimer({lvl: this.lvl, recordMode: _$.planet.isRecording()});
    }

    stop() {
        if (!this.beat) return
        this.beat.pause()
        this.beat.currentTime = 0
        this.status = STOPED
    }

    start() {
        // start the beat
        const beat = this.beat
        beat.volume = env.sfxVolume || .7
        beat.pause()
        beat.currentTime = 0
        beat.play();
        this.beat = beat
        this.status = PLAYING
    }
    
    evo(dt) {
        if (this.status < STOPED && this.offsetBeatTimer.evo(dt)){
            if (!_$.planet.isRecording()){
                trap("spawnObstacle");
            }
        }

        if (this.status < STOPED && this.offsetBeatTimer.timer >= env.tune.spawnOffset - env.tune.musicOffset){

            if (this.status === WAITING) this.start()

            if (this.beatTimer.evo(dt)){
                trap("beat");
            }

            if (this.beat.currentTime === this.beat.duration) {
                this.stop()
                trap('levelComplete')
            }
        }
    }
}

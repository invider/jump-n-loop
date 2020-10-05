const WAITING = 0
const PLAYING = 1
const STOPED = 2

// default values
const df = {
}

class MusicPlayer {

    constructor(level) {
        this.status = WAITING;
        this.name = "musicPlayer";
        augment(this, df)
        this.level = level
        this.beat = level.track
    }

    onSpawn() {
        this.beatTimer = new lib.BeatTimer({lvl: this.level.id, recordMode: _$.planet.isRecording()});
        this.offsetBeatTimer = new lib.BeatTimer({lvl: this.level.id, recordMode: _$.planet.isRecording()});
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
        beat.volume = (env.sfxVolume || .7) * env.mixer.musicLevel
        beat.pause()
        beat.currentTime = 0
        beat.play();
        this.beat = beat
        this.status = PLAYING
    }

    pause() {
        this.beat.pause()
        this.paused = true
    }

    resume() {
        this.beat.play()
        this.paused = false
    }

    downloadBeats() {
        this.beatTimer.download()
    }
    
    evo(dt) {
        if (this.status < STOPED && this.offsetBeatTimer.evo(dt)){
            trap("spawnObstacle");
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

    draw() {
        if (this.status === PLAYING) {
            const left = this.beat.duration - this.beat.currentTime
            const min = floor(left/60)
            const sec = floor(left%60)
            const time = `${min}:${sec}`

            baseBottom()
            alignRight()
            fill('#ffffff')
            text(time, rx(1) - 10, ry(1) - 10)
        }
    }
}

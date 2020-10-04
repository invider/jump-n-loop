// default values
const df = {
    
}

class MusicPlayer {

    constructor(st) {
        st = st || {};
        this.started = 0;
        augment(this, df)
        augment(this, st)
        this.lvl = st.lvl || "lvl1";
        this.beatTimer = new lib.BeatTimer(this.lvl);
        this.offsetBeatTimer = new lib.BeatTimer(this.lvl);
    }

    onSpawn() {
    }
    
    evo(dt) {
        if (this.offsetBeatTimer.evo(dt)){
            trap("spawnObstacle");
        }

        if (this.offsetBeatTimer.timer >= env.tune.spawnOffset - env.tune.musicOffset){
            if (this.beatTimer.evo(dt)){
                trap("beat");
            }
            if (!this.started){
                res.sfx[this.lvl].volume = env.sfxVolume
                res.sfx[this.lvl].play();
                this.started = true;
            } 
        }
    }

    draw() {
        
    }
}

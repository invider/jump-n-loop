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
        this.beatTimer = new lib.BeatTimer(this.lvl, 0);
        this.offsetBeatTimer = new lib.BeatTimer(this.lvl, env.tune.spawnOffset);
    }

    onSpawn() {
    }
    
    evo(dt) {
        if (!this.started){
            res.sfx[this.lvl].play();
            this.started = true;
        } else {
            if (this.offsetBeatTimer.evo(dt)){
                trap("spawnObstacle");
            }
            if (this.beatTimer.evo(dt)){
                trap("beat");
            }
        }
    }

    draw() {
        
    }
}

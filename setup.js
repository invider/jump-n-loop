function setup() {
    _.disable()
    lab.spawn(dna.hud.Transition, {
        fadein: 0,
        keep: .5,
        fadeout: 1,

        onFadeout: function() {
            _.enable()
            if (env.config.newgame) {
                trap('startGame')
            } else {
                trap('title')
            }
        }
    })
}

function credits(hide) {
    log('creddddits')
    lab.spawn(dna.hud.Transition, {
        fadein:  .7,
        keep:    .5,
        fadeout: .7,

        onKeep: function() {
            if (hide) hide()
        },

        onFadeout: function() {
            _.enable()
            lab.spawn('hud/Credits', {
                name: 'credits'
            })
        }
    })
}

function handleControl(e) {
    switch(e.code) {

        case 'KeyY':
            lab.musicPlayer.downloadBeats()
            break

        case 'KeyP':
            _$.pause()
            lab.musicPlayer.pause()
            break

        case 'Escape':
            // TODO reset the game?
            break

        case 'F8':
            _$.lib.img.screenshot('jump-n-loop')
            break
    }
}

function keyDown(e) {
    if (_$.paused) {
        _$.resume()
        lab.musicPlayer.resume()
        return
    }

    const action = env.bind.keyMap[e.code]
    if (action) {
        lab.control.player.act(action.id, 0)
    } else {
        handleControl(e)
    }
}

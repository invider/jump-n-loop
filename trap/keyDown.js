function handleControl(e) {
    switch(e.code) {
        case 'KeyY':
            lib.util.downloadJSON("lvl.json", lab.musicPlayer.beatTimer.recordedBeats);
            break;
        case 'KeyP':
            _$.pause()
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
        return
    }

    const action = env.bind.keyMap[e.code]
    if (action) {
        lab.control.player.act(action.id, 0)
    } else {
        handleControl(e)
    }
}

const keyboard = [
    [ 'Space' ],
    [ 'KeyX' ],
    [ 'ShiftRight' ],
    [ 'ShiftLeft'  ],
    [ 'Enter' ],
    [ 'ArrowUp' ],
]

const keyMap = {}

const padMap = [
    [0, 1, 3, 2],
    [0, 1, 3, 2],
    [0, 1, 3, 2],
    [0, 1, 3, 2],
]

function indexKeys() {
    for (let p = 0; p < keyboard.length; p++) {
        const actions = keyboard[p]
        for (let a = 0; a < actions.length; a++) {
            const key = actions[a]
            keyMap[key] = {
                id: a,
                player: p + padMap.length,
            }
        }
    }
}

function init() {
    indexKeys()
}

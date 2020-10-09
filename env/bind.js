const keyboard = [
    [ 'Space', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight' ],
    [ 'KeyX' ],
    [ 'ShiftRight' ],
    [ 'ShiftLeft'  ],
    [ 'Enter' ],
]

const keyMap = {}

const padMap = [
    [0, 12, 14, 13, 15, 1],
    [0, 12, 14, 13, 15, 1],
    [0, 12, 14, 13, 15, 1],
    [0, 12, 14, 13, 15, 1],
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

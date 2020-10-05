const B = 20
const W = 12
const H = 20
const S = 5

function draw() {
    if (!_$.hero || _$.hero.hits <= 0) return

    let x = rx(1) - B
    let y = B

    fill(.45, .5, .5)
    for (let i = 0; i < _$.hero.hits; i++) {
        rect(x, y, W, H)
        x -= W + S
    }
}

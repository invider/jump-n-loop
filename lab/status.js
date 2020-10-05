const Z = 1001

function draw() {
    if (!env.status) return

    baseBottom()
    alignLeft()
    fill(.15, .5, .5)
    font(env.style.font)

    text('' + env.status, 20, ry(1) - 20)
}

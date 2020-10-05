function draw() {
    if (!env.status) return

    baseBottom()
    alignLeft()
    font(env.style.font)

    text('' + env.status, 20, ry(1) - 20)
}

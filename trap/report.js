function report(e) {
    console.dir(e)

    const tpkg = {}
    const z = []
    z.push(floor(env.time))

    let y = 0
    switch(e.type) {
        case 'levelStart':    y = 1; z.push(e.level); break;
        case 'levelComplete': y = 2; z.push(e.level); break;
        case 'levelFail':     y = 3; z.push(e.level); z.push(e.at); break;
        case 'gameComplete':  y = 9; z.push(); break;
        default: throw `unknown event [${e.type}]`
    }

    tpkg.y = y
    tpkg.z = z
    trap('telco', tpkg)
}

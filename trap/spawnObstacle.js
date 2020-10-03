let id = 0;
function spawnObstacle(e) {
    console.log("spawn")
    lab.planet.spawn("surface/Body", {
        angle: - lab.planet.angle + PI + env.tune.rotationSpeed * env.tune.spawnOffset,
        name: 'tree' + (++id)
    });
}

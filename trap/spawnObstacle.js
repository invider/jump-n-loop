let id = 0;
function spawnObstacle(e) {

    lab.planet.spawn("surface/Body", {
        angle: lib.math.normalizeAngle( -lab.planet.angle
            + PI + env.tune.rotationSpeed * env.tune.spawnOffset),
        name: 'tree' + (++id)
    });
}

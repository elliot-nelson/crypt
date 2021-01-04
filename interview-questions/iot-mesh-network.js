/**
 * From: https://buttondown.email/cassidoo/archive/you-may-encounter-many-defeats-but-you-must-not/
 *
 * You’re trying to build an IoT mesh network. Signals can only travel the maximum of 5
 * units. You’re given coordinates for the switch, the light, and the mesh hubs (which
 * capture and forward signals). Return true if the switch can successfully toggle the
 * light.
 *
 * Examples:
 *   $ let network = { switch: [0,1], hub: [[2,1], [2,5]], light: [1,6] }
 *   $ canToggle(network)
 *   $ true
*/

// First, define what "distance" means. We'll assume that this is X/Y cartesian coordinates.
function distance(from, to) {
    return Math.sqrt((from[0] - to[0]) ** 2 + (from[1] - to[1]) ** 2);
}

// Next, we need to determine if one node can reach another node. Here's a simple implementation
// using recursion (if using recursion, don't forget to remove the visited node from the list,
// or you'd recurse forever!)
//
// A possible optimization is to start by sorting nodes (hubs) by further distance first, so we
// prefer to travel more ground.
//
// If the networks get complicated (more lights, switches, and hubs), then after 10 or so nodes,
// you'll want to remove the recursion and replace the body of this function with a breadth-first
// search.
function isReachable(from, to, nodes) {
    if (distance(from, to) <= 5) return true;

    for (let i = 0; i < nodes.length; i++) {
        if (distance(from, nodes[i]) <= 5) {
            if (isReachable(nodes[i], to, nodes.filter((item, idx) => idx !== i))) return true;
        }
    }

    return false;
}

// Finally, our canToggle function is just a check if the switch can reach the light.
function canToggle(network) {
    return isReachable(network.switch, network.light, network.hub);
}

describe('canToggle', function () {
    it('returns true if the light is reachable', function () {
        let network = { switch: [0,1], hub: [[2,1], [2,5]], light: [1,6] };
        expect(canToggle(network)).toBe(true);
    });

    it('returns false if the light is not reachable', function () {
        let network = { switch: [0,0], hub: [[0,1], [0,2], [0,8]], light: [3,8] };
        expect(canToggle(network)).toBe(false);
    });
});

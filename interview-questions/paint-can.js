/**
 * From: https://buttondown.email/cassidoo/archive/make-a-difference-about-something-other-than/
 *
 * Given a room size, and the square footage a paint can can cover, return how many cans of paint
 * you need to buy to paint a room. Assume the room has four walls. If you’d like to expand this,
 * you can add doors, windows, or any other room features that might make the problem
 * interesting to solve.
 *
 * Example:
 *   room = { length: 12, width: 10, height: 9 }
 *   canCoverage = 200
 *   $ numberOfCans(room, canCoverage)
 *   $ 2 // (12x9x2)+(10x9x2) = 396, so two cans will cover it
 */

// This version adds a basic "features" list that just takes anything with width/height
// (so you could use this for doors, windows, maybe some kind of built-ins, etc.).
//
// To make it more interesting I added an optional rounding so instead of always returning
// the integer number of cans to purchase, you can specify a rounding of 0.5 cans (or 0.25
// cans, 0.1 cans, etc.). I could see this being useful in a room planning setting -- you
// still want to itemize out by room (plus gives you a little padding per room), but avoids
// having tons of `1.08 can` rooms and ending up with many excess cans.
//
// If you wanted to live dangerously you could skip itemization and just buy the number of
// cans for the entire square footage of a project, i.e.:
//
//     let rooms = [...list of 25 rooms...];
//     return Math.ceil(rooms.reduce((sum, room) => sum + numberOfCans(room, 200, 0), 0));
//

function numberOfCans(room, canCoverage, canRounding = 1) {
    let sqft = room.height * (room.length * 2 + room.width * 2);
    sqft -= (room.features || []).map(feature => feature.width * feature.height).reduce((sum, val) => sum + val, 0);

    let cans = sqft / canCoverage;
    if (canRounding) cans = Math.ceil(cans / canRounding) * canRounding;
    return cans;
}

describe('numberOfCans', function () {
    it('returns the number of cans (example)', function () {
        let room = { length: 12, width: 10, height: 9 };
        let canCoverage = 200;
        expect(numberOfCans(room, canCoverage)).toEqual(2);
    });

    it('returns fractional cans to the nearest 0.25 cans', function () {
        let room = { length: 10, width: 12, height: 10 };
        let canCoverage = 195;
        expect(numberOfCans(room, canCoverage, 0.25)).toEqual(2.5);
    });

    it('returns fractional cans with no rounding at all', function () {
        let room = { length: 10, width: 12, height: 10 };
        let canCoverage = 195;
        expect(numberOfCans(room, canCoverage, 0)).toBeCloseTo(2.256410);
    });

    it('removes features like doors and windows', function () {
        let room = { length: 10, width: 12, height: 10, features: [{ width: 4, height: 4 }] };
        let canCoverage = 195;
        expect(numberOfCans(room, canCoverage, 0.25)).toEqual(2.25);
    });
});

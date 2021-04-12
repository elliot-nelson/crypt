/**
 * From: https://buttondown.email/cassidoo/archive/can-words-describe-the-fragrance-of-the-very/
 *
 * Given an array of 0s and 1s that represent a garden, where 0 is a plot that hasn’t been
 * planted on, and 1 is a plot that has been planted on, return true if n plants can be
 * planted without touching another plant.
 *
 * Example:
 *   $ garden = [1,0,0,0,1]
 *   $ canPlant(garden, 1)
 *   $ true // plant at position 2
 *   $ canPlant(garden, 4)
 *   $ false // there are only 3 plots, and two of them can't be planted on
 */

// If we use a simple for-loop, all we're asking for is every slot in the garden where
// there's no planting in slots [-1, 0, 1] relative to us. We can craft the comparison
// so we get edges "for free" (going over the left or right bound of the garden counts
// as not being planted). Last, we need to make sure we don't accidentally count any
// slots twice -- in a for-loop we can just increment the index once more. (Otherwise,
// for a garden like [1,0,0,0,0,1], we might count [1,0,x,x,0,1] as plantable slots.)

function canPlant(garden, count) {
    let plantableSlots = 0;

    for (let i = 0; i < garden.length; i++) {
        if (!garden[i - 1] && !garden[i] && !garden[i + 1]) {
            plantableSlots++;
            i++;

            if (plantableSlots >= count) return true;
        }
    }

    return false;
}

describe('canPlant', function () {
    it('in the example garden allows 1 plant, but not 4 (example)', function () {
        let garden = [1,0,0,0,1];
        expect(canPlant(garden, 1)).toBe(true);
        expect(canPlant(garden, 4)).toBe(false);
    });

    it('can plant edge-to-edge if allowed', function () {
        let garden = [0,0,0,0,0,0,0];
        expect(canPlant(garden, 3)).toBe(true);
        expect(canPlant(garden, 4)).toBe(true);
        expect(canPlant(garden, 5)).toBe(false);
    });

    it('allows planting in discrete patches', function () {
        // first patch is 4 slots, so only 1 planting is allowed
        // second patch is 5 slots so we can fit 2, for a total of 3
        let garden = [1,0,0,0,0,1,1,0,0,0,0,0,1];
        expect(canPlant(garden, 3)).toBe(true);
        expect(canPlant(garden, 4)).toBe(false);
    });
});

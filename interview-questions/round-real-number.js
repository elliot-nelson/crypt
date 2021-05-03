/**
 * From: https://buttondown.email/cassidoo/archive/in-a-time-of-destruction-create-something-maxine
 *
 * Given a positive or negative real number, round it to the next whole integer closer to zero.
 * This means if it’s positive, round down, and if it’s negative, round up. Try to do this in
 * as few characters possible!
 *
 * Test cases:
 *
 *    1.7    =>  1
 *   -2.1    => -2
 *    500.4  =>  500
 *   -369.5  => -369
 *    150    =>  150
 *    -350    => -350
 */

// Also known as "truncation", so "Math.trunc()" is the official right answer... but chopping off
// floating point digits by using bitwise operators is more fun!

function round(value) {
    return value | value;
}

describe('round', function () {
    it('behaves for given examples', function () {
        expect(round(1.7)).toEqual(1);
        expect(round(-2.1)).toEqual(-2);
        expect(round(500.4)).toEqual(500);
        expect(round(-369.5)).toEqual(-369);
        expect(round(150)).toEqual(150);
        expect(round(-350)).toEqual(-350);
    });

    it('behaves for some other corner cases', function () {
        expect(round(0)).toEqual(0);
        expect(round(1.0000001)).toEqual(1);
        expect(round(-1.999999)).toEqual(-1);
        expect(round(-1.0000001)).toEqual(-1);
    });
});

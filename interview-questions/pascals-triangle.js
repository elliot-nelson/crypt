/**
 * From: https://buttondown.email/cassidoo/archive/at-the-end-of-the-day-we-can-endure-much-more/
 *
 * Given a rowIndex, return an array of the values in that row of Pascal’s Triangle.
 * Example:
 *   $ pascals(0)
 *   $ [1]
 *   $ pascals(3)
 *   $ [1,3,3,1]
 */

// This is one of those rare times where writing it as a simple for-loop might be
// easier than using recursion. This version treats the "triangle" as if the left-most
// side was straight up and down (and the right-most side is 45*, with us inserting
// [1] at the end for each new row).
//
// Maybe there's some mathematical trick to calculating a row of Pascal's Triangle.
// I didn't bother to look, but if there is, replace this version with that instead :).

function pascals(rowIndex) {
    let row = [1];

    for (let i = 0; i < rowIndex; i++) {
        row = row.map((value, idx) => (row[idx - 1] || 0) + (row[idx] || 0));
        row.push(1);
    }

    return row;
}

describe('pascals', function () {
    it('returns the example value for rowIndex=0', function () {
        expect(pascals(0)).toEqual([1]);
    });

    it('returns the example value for rowIndex=3', function () {
        expect(pascals(3)).toEqual([1,3,3,1]);
    });

    it('returns what Google says should be row 9', function () {
        expect(pascals(9)).toEqual([1,9,36,84,126,126,84,36,9,1]);
    });
});

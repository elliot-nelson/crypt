/**
 * From: https://buttondown.email/cassidoo/archive/life-can-only-be-understood-backwards-but-it-must/
 *
 * Given a n x m binary matrix filled with 0s and 1s, find the largest rectangle
 * containing only 1s and return its area.
 *
 * Examples:
 *   $ matrix =
 *       [
 *         [“1”,”0”,”1”,”0”,”0”],
 *         [“1”,”0”,”1”,”1”,”1”],
 *         [“1”,”1”,”0”,”1”,”1”],
 *         [“1”,”0”,”0”,”1”,”0”]
 *       ]
 *   $ largestRect(matrix)
 *   $ 4
 */

// First we need to answer the question, given a single top-left coordinate, what's the largest
// possible rectangle? As an example consider this shape:
//
//   111110 // Option 1: 5x1 = 5 squares
//   111000 // Option 2: 2x3 = 6 squares (best)
//   100000 // Option 3: 1x3 = 3 squares
//
// We can explore this space by doing line scans for every line from the left, then finding the
// best possible width for each height, and selecting the one that has the largest area.
function largestRectAt(matrix, x, y) {
    if (matrix[y][x] === '0') return 0;

    // Start by scanning "down" from the current position, collecting the best width for
    // each row. The "width" of a row is just how many 1s we can count until we hit a 0.
    // The "best width" of a row also takes into account the rows above it (no row can
    // have a best width larger than the row above it).
    let widths = [];
    for (let i = 0; y + i < matrix.length; i++) {
        let idx = matrix[y + i].slice(x).indexOf('0');
        if (idx === 0) break;
        widths.push(Math.min(idx === -1 ? matrix[0].length - x : idx, ...widths));
    }

    // The largest rectangle then, is the best width multiplied by the height we found that width at.
    return Math.max(...widths.map((value, idx) => value * (idx + 1)));
}

function largestRect(matrix) {
    let result = 0;

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            result = Math.max(result, largestRectAt(matrix, x, y));
        }
    }

    // Brute force ftw! Unfortunately, there are few obvious improvements over brute force,
    // since even visited squares in the middle of a checked area could be the top-left corner
    // of an even bigger area.
    //
    // If you had to, you could make some situational checks -- for example, any `largestRectAt`
    // call that checks an entire row (all 1s) can skip to the next `y`. Also, as you near the end
    // of the loop, if `(w - x) * (h - y) < result` (in other words, if it's impossible at this
    // square to find a rectangle bigger than the current result), you can also skip to the next `y`.
    //
    // For now though, brute force it is :).

    return result;
}

describe('largestRect', function () {
    it('returns 4 for the example matrix', function () {
        let matrix = [
            ['1','0','1','0','0'],
            ['1','0','1','1','1'],
            ['1','1','0','1','1'],
            ['1','0','0','1','0']
        ];
        expect(largestRect(matrix)).toEqual(4);
    });

    it('returns the best rectangle for a matrix with many rectangles', function () {
        // There's 2 6s, a 9, and a 10 hidden in this matrix
        let matrix = [
            ['1','1','1','0','1','1'],
            ['1','1','1','1','0','1'],
            ['0','1','1','1','1','1'],
            ['1','1','1','1','0','1']
            ['1','0','1','1','1','0']
            ['1','1','1','1','1','0']
        ];
        expect(largestRect(matrix)).toEqual(10);
    });

    it('returns 0 for an empty matrix', function () {
        let matrix = [
            ['0','0','0','0'],
            ['0','0','0','0'],
            ['0','0','0','0']
        ];
        expect(largestRect(matrix)).toEqual(0);
    });

    it('returns MxN for a full matrix', function () {
        let matrix = [
            ['1','1','1','1'],
            ['1','1','1','1'],
            ['1','1','1','1']
        ];
        expect(largestRect(matrix)).toEqual(12);
    });
});

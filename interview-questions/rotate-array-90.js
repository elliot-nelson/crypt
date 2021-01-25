/**
 * From: https://buttondown.email/cassidoo/archive/time-has-a-wonderful-way-of-showing-us-what/
 *
 * Given an n x n array, rotate it 90 degrees without making a new array.
 *
 * Examples:
 *   $ rotate90([[1,2,3],[4,5,6],[7,8,9]])
 *   $ [[7,4,1],[8,5,2],[9,6,3]]
 */

// Normally, you would "map" an array to its rotated version by mutating x/y.
//
// To do it in place, we need to rotate values (or "swap" them) in the existing
// array. Each "swap" rotates 4 values in place at a time, so we only need to keep
// track of one temp value during the swap. A swap looks like this:
//
//    [a] b  c  d [e]    [u] b  c  d [a]
//     f  g  h  i  j      f  g  h  i  j
//     k  l  m  n  o  ->  k  l  m  n  o
//     p  q  r  s  t      p  q  r  s  t
//    [u] v  w  x [y]    [y] v  w  x [e]
//
// We only need to initiate swaps for one diagonal "slice" of the NxN matrix, since
// the swap will cover the rest of the values. Here's some examples of different
// matrix sizes, showing the diagonal slice we'll loop over to initiate swaps. Note
// that EVEN matrices have 1 "swap" in the middle, whereas ODD matrices can ignore the
// center value because it doesn't move.
//
//     3x3       4x4         5x5           6x6
//    =====    =======    =========    ===========
//    a b *    a b c *    a b c d *    a b c d e *      3x3 (2 swaps)
//    * * *    * f * *    * g h * *    * h i j * *      4x4 (4 swaps)
//    * * *    * * * *    * * * * *    * * o * * *      5x5 (6 swaps)
//             * * * *    * * * * *    * * * * * *      6x6 (9 swaps)
//                        * * * * *    * * * * * *      ...
//                                     * * * * * *
//
function rotate90(array) {
    let n = array.length, r = Math.floor(n / 2);

    // Loop through the diagonal slice relevant for this matrix
    for (let y = 0; y < r; y++) {
        for (let x = y; x < n - y - 1; x++) {
            // Perform one "swap" (rotating 4 individual elements in the matrix)
            let temp = array[y][x];
            array[y][x] = array[n - x - 1][y];
            array[n - x - 1][y] = array[n - y - 1][n - x - 1];
            array[n - y - 1][n - x - 1] = array[x][n - y - 1];
            array[x][n - y - 1] = temp;
        }
    }

    // Although this function modifies the array in place, by convention
    // you still want to return it (so you can chain methods, for example).
    return array;
}

describe('rotate90', function () {
    it('rotates all elements in a 2x2 matrix', function () {
        let original = [
            [1, 2],
            [3, 4]
        ];
        let rotated = [
            [3, 1],
            [4, 2]
        ];
        expect(rotate90(original)).toEqual(rotated);
    });

    it('rotates all elements in a 3x3 matrix', function () {
        let original = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        let rotated = [
            [7, 4, 1],
            [8, 5, 2],
            [9, 6, 3]
        ];
        expect(rotate90(original)).toEqual(rotated);
    });

    it('rotates all elements in a 6x6 matrix', function () {
        let original = [
            ['a', 'b', 'c', 'd', 'e', 'f'],
            ['g', 'h', 'i', 'j', 'k', 'l'],
            ['m', 'n', 'o', 'p', 'q', 'r'],
            ['s', 't', 'u', 'v', 'w', 'x'],
            ['y', 'z', '1', '2', '3', '4'],
            ['5', '6', '7', '8', '9', '0']
        ];
        let rotated = [
            ['5', 'y', 's', 'm', 'g', 'a'],
            ['6', 'z', 't', 'n', 'h', 'b'],
            ['7', '1', 'u', 'o', 'i', 'c'],
            ['8', '2', 'v', 'p', 'j', 'd'],
            ['9', '3', 'w', 'q', 'k', 'e'],
            ['0', '4', 'x', 'r', 'l', 'f']
        ];
        expect(rotate90(original)).toEqual(rotated);
    });

    it('rotates an empty matrix', function () {
        expect(rotate90([])).toEqual([]);
    });
});

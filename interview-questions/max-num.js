/**
 * From: https://buttondown.email/cassidoo/archive/i-never-dreamed-about-success-i-worked-for-it/
 *
 * You're given two integer arrays (n and m), and an integer k. Using the digits from n and m,
 * return the largest number you can of length k.
 *
 * Example:
 *   n = [3,4,6,5]
 *   m = [9,0,2,5,8,3]
 *   k = 5
 *   $ maxNum(n, m, k)
 *   $ 98653 // <= 98655!
 */

// This question is worded kind of like a search, but a descending sort should be all
// we need. Right now the two arrays are not very useful -- this might be the first
// volley in a multi-part question where later the arrays matter (for example, maybe
// the next step is to construct the largest number of length `k` using interleaving
// numbers from `n` and `m`).

function maxNum(n, m, k) {
    let digits = n.concat(m).sort((a, b) => b - a);
    return parseInt(digits.slice(0, k).join(''), 10);
}

describe('maxNum', function () {
    it('returns the example', function () {
        let n = [3,4,6,5];
        let m = [9,0,2,5,8,3];
        let k = 5;
        expect(maxNum(n, m, k)).toEqual(98_655);
    });

    it('returns the biggest number if k > max digits', function () {
        let n = [0,1,0,3];
        let m = [0,9,0,4];
        let k = 15;
        expect(maxNum(n, m, k)).toEqual(94_310_000);
    });

    it('returns a single digit for k = 1', function () {
        let n = [1,2,3];
        let m = [4,5,6];
        let k = 1;
        expect(maxNum(n, m, k)).toEqual(6);
    });
});

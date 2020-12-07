/**
 * From: https://buttondown.email/cassidoo/archive/its-not-how-everyone-views-you-but-how-you-view/
 *
 * Given an array of integers and a target value, return the number of pairs of array elements
 * that have a difference equal to a target value.
 *
 * Examples:
 *   $ arrayDiff([1, 2, 3, 4], 1)
 *   $ 3 // 2 - 1 = 1, 3 - 2 = 1, and 4 - 3 = 1
 */

// Because we are returning a count and not the actual pairs, we don't need to compare
// both [1, 4] and [4, 1] -- as long as we match the absolute value, one of the two pairs
// will count and not the other.

// An approach using array reduce (the "modern" approach, all returns)...

function arrayDiff(list, target) {
    return list.reduce((count, a, index) => {
        return list.slice(index + 1).reduce((count, b) => {
            return count + (Math.abs(a - b) === Math.abs(target) ? 1 : 0);
        }, count);
    }, 0);
}

describe('arrayDiff', function () {
    it('returns the number of pairs of elements with target difference', function () {
        expect(arrayDiff([1, 2, 3, 4], 1)).toEqual(3);
        expect(arrayDiff([1, 2, 3, 4], -1)).toEqual(3);
        expect(arrayDiff([1, 2, 3, 4], 0)).toEqual(0);
        expect(arrayDiff([1, 4, 1, 4, 2], 3)).toEqual(4);
    });
});

// A traditional nested for-loop, in my opinion, more efficient and easier to read.

function arrayDiff2(list, target) {
    let count = 0;
    for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
            if (list[i] - list[j] === target || list[j] - list[i] === target)
                count++;
        }
    }
    return count;
}

describe('arrayDiff2', function () {
    it('returns the number of pairs of elements with target difference', function () {
        expect(arrayDiff2([1, 2, 3, 4], 1)).toEqual(3);
        expect(arrayDiff2([1, 2, 3, 4], -1)).toEqual(3);
        expect(arrayDiff2([1, 2, 3, 4], 0)).toEqual(0);
        expect(arrayDiff2([1, 4, 1, 4, 2], 3)).toEqual(4);
    });
});

// A possible follow-up question might be, what if we needed the ACTUAL pairs? That is,
// the function needs to return a list of [a, b] pairs such that `a - b === target`.
// The `arrayDiff2` function above is almost there...

function arrayDiffPairs(list, target) {
    let pairs = [];
    for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
            if (list[i] - list[j] === target) pairs.push([list[i], list[j]]);
            else if (list[j] - list[i] === target) pairs.push([list[j], list[i]]);
        }
    }
    return pairs;
}

describe('arrayDiffPairs', function () {
    it('returns the pairs of elements with target difference', function () {
        expect(arrayDiffPairs([1, 2, 3, 4], 1)).toEqual([[2, 1], [3, 2], [4, 3]]);
        expect(arrayDiffPairs([1, 2, 3, 4], -1)).toEqual([[1, 2], [2, 3], [3, 4]]);
        expect(arrayDiffPairs([1, 2, 3, 4], 0)).toEqual([]);
        expect(arrayDiffPairs([1, 4, 1, 4, 2], 3)).toEqual([[4, 1], [4, 1], [4, 1], [4, 1]]);
    });
});

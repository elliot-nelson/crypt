/**
 * From: https://buttondown.email/cassidoo/archive/we-must-accept-finite-disappointment-but-never/
 *
 * Given an integer array, move all 0s to the end of it while maintaining the relative order
 * of the non-zeroes. Bonus: do this without making a copy of the array!
 *
 * Example:
 *   $ moveZeroes([0,2,0,3,8])
 *   $ [2,3,8,0,0]
 */

// The addition of "don't make a copy" is really interesting because it removes the
// normal javascript splice/split approaches. If an array has a zero anywhere near
// the front then moveZeroes requires at least N assignments, so we might as well
// lean into it and just ripple through the array assigning every element (with
// a small logic check to skip the assignment if we don't need one yet).

function moveZeroes(array) {
    for (let idx = 0, ptr = 0; idx < array.length; idx++, ptr++) {
        while (array[ptr] === 0) ptr++;
        if (idx === ptr) continue;
        array[idx] = array[ptr] || 0;
    }
    return array;
}

describe('moveZeroes', function () {
    it('works for the example', function () {
        expect(
            moveZeroes([0,2,0,3,8])
        ).toEqual([2,3,8,0,0]);
    });

    it('works for another example', function () {
        expect(
            moveZeroes([9,0,8,0,7,6,5,0,4,3,0,2,1,0])
        ).toEqual([9,8,7,6,5,4,3,2,1,0,0,0,0,0]);
    });

    it('succeeds for an all-zero array', function () {
        expect(
            moveZeroes([0,0,0,0,0,0,0,0])
        ).toEqual([0,0,0,0,0,0,0,0]);
    });

    it('succeeds for a large array of random integers', function () {
        // Create an array of 10,000 random integers
        let array = Array.from({ length: 10_000 }, () => Math.floor(Math.random() * 100));

        // Ensure there's at least one zero to move
        array[0] = 0;

        // Use a different, trusted method to create an expectation.
        //
        // NOTE: The ECMAScript standard was updated in 2019 to guarantee that elements
        // "equal" to each other remain in the same place relative to each other in the
        // array after a sort, and Array#sort always edits arrays in-place, so as long
        // you are using nodejs or a modern browser this Array#sort approach is also
        // a pretty good answer to the question!
        let expected = [...array].sort((a, b) => {
            if (a === 0) return 1;
            if (b === 0) return -1;
            return 0;
        });

        expect(moveZeroes(array)).toEqual(expected);
    });
});

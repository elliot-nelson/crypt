/**
 * From: https://buttondown.email/cassidoo/archive/never-be-limited-by-other-peoples-limited/
 *
 * Given a string str containing only the characters x and y, change it into a string
 * such that there are no matching adjacent characters. You’re allowed to delete
 * zero or more characters in the string. Find the minimum number of required deletions.
 *
 * Examples:
 *   $ everyOther('xxyxxy')
 *   $ 2 // str becomes 'xyxy'
 *
 *   $ everyOther('yyyyy')
 *   $ 4 // str becomes 'y'
 */

function everyOther(str) {
    let deletions = 0, chars = [...str];

    // You can easily do this with just string operations as well, but array splice
    // looks a lot nicer than adding sliced strings together.
    //
    // You can collapse this even smaller into a reduce call, but I feel like the
    // obvious next step is to return the resulting STRING, which is easily available
    // with this approach (as opposed to a reduce that just compares every idx to idx+1).
    for (let idx = 0; idx < chars.length; idx++) {
        if (chars[idx] === chars[idx + 1]) {
            chars.splice(idx, 1);
            deletions++;
            idx--;
        }
    }

    return deletions;
}

describe('everyOther', function () {
    it('returns number of characters deleted - example 1', function () {
        expect(everyOther('xxyxxy')).toEqual(2);
    });

    it('returns number of characters deleted - example 2', function () {
        expect(everyOther('yyyyy')).toEqual(4);
    });

    it('can detect and delete unicode characters :)', function () {
        expect(everyOther('x┌┌┌┌┌y')).toEqual(4);
    });

    it('returns zero for empty strings', function () {
        expect(everyOther('')).toEqual(0);
    });
});

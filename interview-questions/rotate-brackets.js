/**
 * From: https://buttondown.email/cassidoo/archive/he-who-asks-is-a-fool-for-five-minutes-but-he-who/
 *
 * Given a string of brackets, return a rotation of those brackets that is balanced. The numbers of
 * opening and closing brackets will always be equal, so [ or ][] won’t be given as inputs.
 *
 * Example:
 *   $ rotateBrackets(‘]][][[‘)
 *   $ ‘[[]][]’ // First rotation yields ‘[]][][‘. Second one yields ‘[[]][]’.
 */

// First, let's define what a "valid" bracket string looks like.

function isValid(input) {
    let count = 0;

    for (let c of input) {
        if (c === '[') count++;
        if (c === ']') count--;
        if (count < 0) return false;
    }

    return count === 0;
}

// Now we can rotate the bracket string until it is valid. I'm using `lastIndexOf` to
// "rotate" to the back bracket (there's no point in rotating one character at a time,
// since a string starting with ']' will never be valid).
//
// If you replace `lastIndexOf('[')` with `indexOf('[', 1)`, then you'd rotate in the
// opposite direction (this potentially will change the result, because most bracket
// strings will have multiple valid versions).

function rotateBrackets(input) {
    while (!isValid(input)) {
        let idx = input.lastIndexOf('[');
        input = input.slice(idx) + input.slice(0, idx);
    }
    return input;
}

describe('rotateBrackets', function () {
    it('returns the example output', function () {
        expect(
            rotateBrackets(']][][[')
        ).toEqual('[[]][]');
    });

    it('returns a valid output for a more complicated string', function () {
        expect(
            rotateBrackets('][]]][[][]][[[][')
        ).toEqual('[[[][][]]][[][]]');
    });

    it('ignores other characters in the string (just for fun)', function () {
        expect(
            rotateBrackets('] [] ]] [[*][*]][[ [] [')
        ).toEqual('[[ [] [] [] ]] [[*][*]]');
    });
});

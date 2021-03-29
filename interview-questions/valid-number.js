/**
 * From: https://buttondown.email/cassidoo/archive/success-is-more-a-function-of-consistent-common/
 *
 * Given a string, return true if the string represents a valid number. A valid number can include
 * integers, a ., -, or +.
 *
 * Examples of valid numbers: “7”, “0011”, “+3.14”, “4.”, “-.9”, “-123.456”, “-0.1”
 *
 * Examples of invalid numbers: “abc”, “1a”, “e8”, “–6”, “-+3”, “95x54e53.”
 */

// This is one of those questions where the list of examples is more meaningful than the
// question itself. As an example, the list of invalid answers invalidates approaches like
// `isNaN(parseFloat(str))`.
//
// Toss the allowed characters into a regular expression, which is a little bit longer just
// to avoid "non-numbers" like "-." (basically, require at least one digit).

function validNumber(str) {
    return !!str.match(/^[+-]?([0-9]+[.]?[0-9]*|[0-9]*[.]?[0-9]+)$/);
}

describe('validNumber', function () {
    it('returns true for valid number examples', function () {
        expect(validNumber('7')).toBe(true);
        expect(validNumber('0011')).toBe(true);
        expect(validNumber('+3.14')).toBe(true);
        expect(validNumber('4.')).toBe(true);
        expect(validNumber('-.9')).toBe(true);
        expect(validNumber('-123.456')).toBe(true);
        expect(validNumber('-0.1')).toBe(true);
    });

    it('returns false for invalid number examples', function () {
        expect(validNumber('abc')).toBe(false);
        expect(validNumber('1a')).toBe(false);
        expect(validNumber('e8')).toBe(false);
        expect(validNumber('–6')).toBe(false);
        expect(validNumber('-+3')).toBe(false);
        expect(validNumber('95x54e53')).toBe(false);
    });

    it('meets some additional constraints not specified', function () {
        expect(validNumber('')).toBe(false);
        expect(validNumber('.')).toBe(false);
        expect(validNumber('+.')).toBe(false);
    });
});

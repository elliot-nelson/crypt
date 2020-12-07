/**
 * From: https://buttondown.email/cassidoo/archive/people-rarely-succeed-unless-they-have-fun-in/
 *
 * Given two non-negative integers n1 and n2 represented as strings, return the product
 * of n1 and n2, also represented as a string. Neither input will start with 0, and
 * don't just convert it to an integer and do the math that way.
 *
 * Examples:
 *    $ stringMultiply('123', '456')
 *    $ '56088'
 */

// Let's create digit-based math from scratch! First we'll define the digits that
// exist in this system. Note that we can add or subtract these digits if we want,
// or replace them with random characters, as nothing else in this solution will
// rely on the fact that a digit is a "digit". (No `c - '0'` type stuff.)

let DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Next, we need to know how to ADD two individual digits together, by finding their
// indices in the list of digits and adding them together. This can potentially produce
// 1 (but only 1) carryover digit.
function stringAddDigit(a, b) {
    let index = DIGITS.indexOf(a || DIGITS[0]) + DIGITS.indexOf(b || DIGITS[0]);

    return (index >= DIGITS.length ? DIGITS[1] : '') + DIGITS[index % DIGITS.length];
}

// Now that we can add individual digits, let's expand to adding larger numbers. My method
// here is to have a list of numbers being added, and loop through digit places, adding all
// the digits in that place together. This makes it easy to track carry digits -- we just add
// another number to the list of numbers we're adding.
//
// As soon as our result is zero and place is as far as left as our largest number, we're done.
function stringAdd(...numbers) {
    let final = '';

    for (let place = 1; ; place++) {
        let digit = numbers.reduce((sum, value) => {
            let result = stringAddDigit(sum, value[value.length - place]);
            if (result.length > 1) {
                numbers.push(result[0] + DIGITS[0].repeat(place));
                result = result[1];
            }
            return result;
        }, DIGITS[0]);

        if (digit === DIGITS[0] && place > Math.max(0, ...numbers.map(n => n.length))) break;

        final = digit + final;
    }

    return final;
}

// Next, we move on to multiplication. First we can define multiplying two individual digits
// together in classic math fashion -- `3 * 6` is just `6 + 6 + 6`, so we can use our adding
// function above to define multiplication.
function stringMultiplyDigit(a, b) {
    return stringAdd(...new Array(DIGITS.indexOf(a || DIGITS[0])).fill(b || DIGITS[0]));
}

// Last, multiplying two numbers of any length. First we'll multiply every digit in A by
// every digit in B (with appropriate number of zeroes at the back), then add up all the products
// together to come up with the final answer.
function stringMultiply(a, b) {
    let products = [];

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) {
            products.push(stringMultiplyDigit(a[a.length - 1 - i], b[b.length - 1 - j]) + DIGITS[0].repeat(i + j));
        }
    }

    return stringAdd(...products);
}

describe('stringMultiply', function () {
    it('multiplies the example numbers', function () {
        expect(stringMultiply('123', '456')).toEqual('56088');
        expect(stringMultiply('456', '123')).toEqual('56088');
    });

    it('multiplies a bunch of other random sizes together', function () {
        expect(stringMultiply('9', '9')).toEqual('81');
        expect(stringMultiply('1000', '1000')).toEqual('1000000');
        expect(stringMultiply('1111', '1111')).toEqual('1234321');
    });
});

// We can have more fun with digit definitions now!

describe('stringMultiply in other bases', function () {
    afterEach(function () {
        // Reset to normal decimal
        DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    });

    it('multiplies binary numbers', function () {
        DIGITS = ['0', '1'];

        expect(stringMultiply('111', '101')).toEqual('100011');      // 7 * 5 = 35
    });

    it('multiplies hex numbers', function () {
        DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

        expect(stringMultiply('ff', 'ff')).toEqual('fe01');          // 255 * 255 = 65025
        expect(stringMultiply('1ae', '30ff1')).toEqual('524c6ce');   // 430 * 200689 = 86296270
    });

    it('multiplies numbers in an alien number system', function () {
        DIGITS = ['o', 'i', 's', 'e', 't'];

        expect(stringMultiply('too', 'so')).toEqual('ieooo');        // 100 * 10 = 1000
    });
});

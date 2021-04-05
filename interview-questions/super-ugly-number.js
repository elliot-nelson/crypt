/**
 * From: https://buttondown.email/cassidoo/archive/to-understand-is-to-invent-jean-piaget/
 *
 * Given an integer n and a sorted array of prime integers called primes, return the nth
 * “super ugly number”. A “super ugly number” is a positive number whose all prime
 * factors are in the array primes.
 *
 * Example:
 *   $ superUgly(1, [2,3,5])
 *   $ 1
 *   $ superUgly(11, [2,7,13,19])
 *   $ 28
 */

// This approach isn't particularly optimized, but it is made up of chunks that
// could (maybe?) be optimized later.
//
// First, ye olde "get all the prime factors" algorithm.

function primeFactors(value) {
    let factors = [];
    let divisor = 2;

    while (value >= 2) {
        if (value % divisor === 0) {
            value /= divisor;
            factors.push(divisor);
        } else {
            divisor++;
        }
    }

    return factors;
}

// Now that we have that, it's easy to ask "is this number made of these factors?"

function isProductOfPrimeFactors(value, factors) {
    return primeFactors(value).filter(prime => !factors.includes(prime)).length === 0;
}

// For fun, let's make a generator function that returns an endless iterator over
// all "super ugly numbers" for the given factors.
//
// (If there's a clever math way to use the factors list to jump to the "next" number
// from the previous one, then a generator function makes even more sense -- all the
// smarts go here, throw away the factor calculations above, and just yield numbers
// until the caller stops iterating.)

function* superUglyNumbers(factors) {
    for (let value = 1; ; value++) {
        if (isProductOfPrimeFactors(value, factors)) yield value;
    }
}

// Now we can use that generator function in our answer.

function superUgly(n, primes) {
    let iterator = superUglyNumbers(primes);
    for (let i = 1; i < n; i++) iterator.next();
    return iterator.next().value;
}

describe('superUgly', function () {
    it('returns the first example', function () {
        expect(superUgly(1, [2, 3, 5])).toBe(1);
    });

    it('returns the second example', function () {
        expect(superUgly(11, [2, 7, 13, 19])).toBe(28);
    });

    it('can calculate 2^8 (by asking for the 9th number)', function () {
        expect(superUgly(9, [2])).toBe(256);
    });

    it('returns correct numbers for combos without 2, 3', function () {
        expect(superUgly(5, [5, 13, 17])).toBe(25);
    });
});

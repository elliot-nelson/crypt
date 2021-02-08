/**
 * From: https://buttondown.email/cassidoo/archive/without-struggle-there-is-no-progress-frederick/
 *
 * Implement a ProductList class that has two methods, add(n) (which pushes the value n to
 * the back of the list) and product(m) (which returns the product of the last m numbers
 * in the list).
 *
 * Usage:
 *   ProductList p = new ProductList();
 *   p.add(7);         // [7]
 *   p.add(0);         // [7,0]
 *   p.add(2);         // [7,0,2]
 *   p.add(5);         // [7,0,2,5]
 *   p.add(4);         // [7,0,2,5,4]
 *   p.product(3);     // return 40 because 2 * 5 * 4
 */

class ProductList {
    constructor() {
        this._values = [];
    }

    add(...values) {
        // We might as well make ProductList#add work like common collections (Array#push,
        // Array#concat) and support multiple values for brevity.
        this._values.push(...values);
    }

    product(count) {
        // For "invalid" situations (where there's no real values to multiply), a return of 0
        // seems like the appropriate response.
        if (count <= 0) return 0;
        if (this._values.length === 0) return 0;

        // Now that we know count is positive and there's at least one value, it's safe to
        // do a slice > reduce.
        return this._values.slice(-count).reduce((result, value) => result * value);
    }
}

describe('ProductList', function () {
    describe('product', function () {
        it('multiplies the last N values off the list (example)', function () {
            let p = new ProductList();
            p.add(7);
            p.add(0);
            p.add(2);
            p.add(5);
            p.add(4);
            expect(p.product(3)).toEqual(40);
        });

        it('does not consume the values in the list', function () {
            let p = new ProductList();
            p.add(5, 6, 7);
            expect(p.product(2)).toEqual(42);
            p.add(8);
            expect(p.product(2)).toEqual(56);
        });

        it('returns the product of all values, if N > list length', function () {
            let p = new ProductList();
            p.add(1, 2, 3, 4, 5, 6, 2);
            expect(p.product(100)).toEqual(1440);
        });

        it('returns 0 if the list is empty', function () {
            let p = new ProductList();
            expect(p.product(10)).toEqual(0);
        });

        it('returns 0 if provided count is <= 0', function () {
            let p = new ProductList();
            p.add(1, 2, 3);
            expect(p.product(0)).toEqual(0);
            expect(p.product(-3)).toEqual(0);
        });
    });
});

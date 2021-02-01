/**
 * From: https://buttondown.email/cassidoo/archive/the-most-certain-sign-of-wisdom-is-cheerfulness/
 *
 * You are given a snapshot of a queue of stocks that have changing prices coming in from a stream.
 * Remove the outdated stocks from the queue.
 *
 * Examples:
 *   $ snapshot = [
 *       { sym: ‘GME’, cost: 280 },
 *       { sym: ‘PYPL’, cost: 234 },
 *       { sym: ‘AMZN’, cost: 3206 },
 *       { sym: ‘AMZN’, cost: 3213 },
 *       { sym: ‘GME’, cost: 325 }
 *     ]
 *   $ stockQueue(snapshot)
 *   $ [{ sym: ‘PYPL’, cost: 234 },
 *      { sym: ‘AMZN’, cost: 3213 },
 *      { sym: ‘GME’, cost: 325 }]
 */

// There are many ways to skin this cat -- for example, given this exact data,
// we could wrap it in a big `Object.entries(snapshot.reduce(...)).map()` (collapse
// it into a hash and then spool it back out again).
//
// However, I think the solution that best fits the spirit of the question is to
// assume that there might be many other important fields in each record (like an ID
// for example), and we really want the exact ENTRIES in the list, without the previous
// matching entries.
function stockQueue(snapshot) {
    let result = [];

    for (let entry of snapshot) {
        result = result.filter(existing => existing.sym !== entry.sym);
        result.push(entry);
    }

    // Other fun ways to improve performance:
    //  - If the data has many duplicates, but is of manageable size, you could
    //    reverse it, run the loop above once, then reverse it back, eliminating
    //    all duplicates in one run.
    //
    //  - If the data has few duplicates, but is very big, you can improve perf
    //    by keeping a small hash of seen symbols (if you've never seen a symbol
    //    yet, you can skip the `.filter()` call).

    return result;
}

describe('stockQueue',function () {
    it('returns the queue without the previous duplicate entries (example)', function () {
        let snapshot = [
            { sym: 'GME', cost: 280 },
            { sym: 'PYPL', cost: 234 },
            { sym: 'AMZN', cost: 3206 },
            { sym: 'AMZN', cost: 3213 },
            { sym: 'GME', cost: 325 }
        ];
        expect(stockQueue(snapshot)).toEqual([
            { sym: 'PYPL', cost: 234 },
            { sym: 'AMZN', cost: 3213 },
            { sym: 'GME', cost: 325 }
        ]);
    });

    it('returns the actual latest snapshot entries', function () {
        let snapshot = [
            { sym: 'GME', cost: 33, id: 309 },
            { sym: 'AAPL', cost: 400, id: 54 },
            { sym: 'GME', cost: 340, id: 311 },
            { sym: 'GME', cost: 390, id: 313 },
            { sym: 'AAPL', cost: 410, id: 59 }
        ];
        expect(stockQueue(snapshot)).toEqual([
            { sym: 'GME', cost: 390, id: 313 },
            { sym: 'AAPL', cost: 410, id: 59 }
        ]);
    });
});

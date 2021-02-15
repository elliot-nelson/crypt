/**
 * From: https://buttondown.email/cassidoo/archive/to-know-how-much-there-is-to-know-is-the/
 *
 * Given a string str and a dictionary dict containing a list of non-empty words, add
 * spaces in str to construct a “sentence” where each word is a valid word in dict.
 * Return all possible sentences. You are allowed to reuse the words in dict.
 *
 * Example:
 *   $ str = “penpineapplepenapple”
 *   $ dict = [“apple”, “pen”, “applepen”, “pine”, “pineapple”]
 *   $ makeSentence(str, dict)
 *   $ [
 *       "pen pine apple pen apple",
 *       "pen pineapple pen apple",
 *       "pen pine applepen apple"
 *     ]
 */

// Normally I'd suggest the simplest possible approach, which would be a recursive
// `makeSentence` function. It doesn't take much for that to get out of hand though, so
// here is a simple breadth-first-search approach instead (using a stack to keep track of
// "states" we are interested in, where each state is what's left in the sentence and
// the string of words we've assembled so far).
//
// This is about as good as it gets if you always want to return all possible sentences.
// If we had a different goal (maybe a specific sentence in mind, or criteria for best
// sentence) we could play with the behavior by going breadth-first or depth-first
// and changing the order of words in the dictionary, and early exiting when we found
// an appropriate sentence.
function makeSentence(str, dict) {
    let results = [];
    let stack = [ [str, []] ];

    while (stack.length > 0) {
        let [remaining, words] = stack.shift();

        if (remaining.length === 0 && words.length > 0) {
            results.push(words.join(' '));
        }

        for (let dictWord of dict) {
            if (remaining.startsWith(dictWord)) {
                stack.push([remaining.slice(dictWord.length), [...words, dictWord]]);
            }
        }
    }

    return results;
}

describe('makeSentence', function () {
    it('returns all possible sentences (example)', function () {
        let str = 'penpineapplepenapple';
        let dict = ['apple', 'pen', 'applepen', 'pine', 'pineapple'];

        expect(makeSentence(str, dict)).toEqual(jasmine.arrayWithExactContents([
            'pen pine apple pen apple',
            'pen pineapple pen apple',
            'pen pine applepen apple'
        ]));
    });

    it('will not return sentences with leftover word fragments at the end', function () {
        let str = 'fizzbuzzjarskywalkerbuzzjar';
        let dict = ['fizz', 'buzz', 'buzzjar', 'skywalker', 'skybuzz', 'walkerbuzz'];

        // Lots of ways to combine the words above, but only one way that
        // ends in "buzzjar", i.e. no leftover letters.
        expect(makeSentence(str, dict)).toEqual([
            'fizz buzzjar skywalker buzzjar'
        ]);
    });

    it('returns an empty array if there are no possible sentences', function () {
        let str = 'catdogcow';
        let dict = ['cat', 'dog'];
        expect(makeSentence(str, dict)).toEqual([]);
    });
});

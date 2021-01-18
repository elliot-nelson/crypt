/**
 * From: https://buttondown.email/cassidoo/archive/if-you-dont-design-your-own-life-plan-chances-are/
 *
 * Design a hashmap without using any built-in libraries. You should include the following functions:
 *
 *   put(key, value):
 *     Insert a (key, value) pair into the hashmap. If the value already exists, update the value.
 *   get(key):
 *     Returns the value to which key is mapped, or -1 if this map contains nothing for key.
 *   remove(key):
 *     Remove the mapping for the value in key if it exists.
 */

class CornedBeefHash {
    constructor() {
        // A default initial size for the number of "hash buckets" in this hashmap.
        //
        // The way a hash typically works is you need a function that maps your keys
        // to unique integers, but then each integer goes into a "bucket". Accessing a value
        // involves a very fast component (picking the bucket) and then a slower component
        // (looking through the bucket for the match).
        //
        // The goal is to minimize the slow component. As a hashmap fills up, the size of
        // the buckets will increase, lowering the speed from O(1) to O(N), so you want to
        // periodically "resize" the hash by increasing the number of buckets.
        //
        // For fun, I've included a rehash method to do just that.
        this.rehash(10);
    }

    // Strategy for putting a value:
    //   Hash the key and select the bucket slot.
    //   Search that slot for a matching hash - if it exists, update the value.
    //   If it doesn't exist, add a new entry with that value.
    //   Optionally - if an individual list is too long, rehash the hashmap for speed.
    put(key, value) {
        let hash = this.hash(key);
        let list = this._buckets[hash % this._size];

        for (let entry of list) {
            if (entry.key === key) {
                entry.value = value;
                return value;
            }
        }

        list.push({ key, value });

        // If we just added an entry to a list and that list is over a threshold, we want to _rehash_
        // all existing entries into a larger hashmap, to reduce the time spent on the O(1) component.
        if (list.length > this._size / 10) {
            this.rehash(this._size * 10);
        }

        return value;
    }

    // Strategy for getting a value:
    //   Hash the key and select the bucket slot.
    //   Search that slot for a matching hash - if it exists, return the value.
    //   Return -1 if it doesn't exist.
    get(key) {
        let hash = this.hash(key);
        let list = this._buckets[hash % this._size];

        for (let entry of list) {
            if (entry.key === key) {
                return entry.value;
            }
        }

        // TODO: returning `-1` means we can't meaningfully store `-1` -- I'd vote for `undefined`.
        return -1;
    }

    // Strategy for removing a value:
    //   Hash the key and select the bucket slot.
    //   Search that slot for a matching hash - if it exists, delete it.
    remove(key) {
        let hash = this.hash(key);
        let list = this._buckets[hash % this._size];

        for (let i = 0; i < list.length; i++) {
            if (list[i].key === key) {
                list.splice(i, 1);
                break;
            }
        }
    }

    // The most important part of a hashmap is how it "hashes" key values into integers.
    // There's two parts here: conversion of key to something hashable, and then the
    // algorithm used to hash.
    //
    // The first part determines whether keys are just strings and numbers or can be
    // arrays and objects too. Our class uses plain old javascript "===" to compare keys,
    // so by default only numbers and strings will be useful keys.
    //
    // The second part (producing hash code for the key) determines how efficient your
    // hash map is. A poorly-designed hash code produces more collisions, which in
    // turn reduces hash performance from O(1) towards O(N).
    //
    // This is a bad hash code function but it's easy to implement (and easy to replace later).
    hash(key) {
        key = String(key);
        let sum = 0;
        for (let i = 0; i < key.length; i++) {
            sum += key.charCodeAt(i);
        }
        return sum;
    }

    // Rehash function to increase the number of buckets in the hashmap. If the hash
    // already has entries, each entry must be slotted into a new bucket.
    //
    // NOTE: There are actually some pretty cool algorithms for this as well that
    // avoid having to re-calculate every new bucket slot.
    rehash(size) {
        // Initialize an empty array [] in each bucket slot.
        let buckets = Array(size).fill(undefined).map(u => []);

        // Re-hash every existing element (if they exist).
        if (this._buckets) {
            for (let list of this._buckets) {
                for (let entry of list) {
                    buckets[this.hash(entry.key) % size].push(entry);
                }
            }
        }

        // Set the size (number of buckets) in this hash
        this._size = size;

        // Set the list of buckets
        this._buckets = buckets;
    }
}

describe('CornedBeefHash', function () {
    it('gets and sets values', function () {
        let subject = new CornedBeefHash();

        subject.put('hello', 17);
        subject.put('goodbye', 34);

        expect(subject.get('hello')).toEqual(17);
        expect(subject.get('goodbye')).toEqual(34);
    });

    it('deletes values', function () {
        let subject = new CornedBeefHash();

        subject.put('goodbye', 34);
        subject.remove('goodbye');

        expect(subject.get('goodbye')).toEqual(-1);
    });

    it('behaves correctly after randomly inserting and deleting many values', function () {
        let subject = new CornedBeefHash();
        let hash = {};

        for (let i = 0; i < 10_000; i++) {
            if (Math.random() < 0.8) {
                let key = String(Math.random());
                let value = String(Math.random());
                subject.put(key, value);
                hash[key] = value;
            } else {
                let keys = Object.keys(hash);
                let key = keys[Math.floor(Math.random() * keys.length)];
                subject.remove(key);
                delete hash[key];
            }
        }

        // After 10,000 iterations, where we randomly inserted values 80% of
        // the time and randomly deleted keys 20% of the time, our Corned Beef Hash
        // and a built-in POJO should have identical contents.
        //
        // Our Corned Beef Hash is not the fastest... if you bump 10,000 iterations
        // to 100,000 iterations, this test will take minutes to run.
        Object.keys(hash).forEach(key => {
            expect(subject.get(key)).toEqual(hash[key]);
        });
    });
});

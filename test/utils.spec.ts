import {merkleRoot, next_pow_of_two} from "../src/lib/utils";

describe("Test next_pow_of_two", () => {
    test("1 is 1", () => {
        expect(next_pow_of_two(1)).toBe(1)
    })
    test("0 is 1", () => {
        expect(next_pow_of_two(0)).toBe(1)
    })
    test("2 is 2", () => {
        expect(next_pow_of_two(2)).toBe(2)
    })
    test("3 is 4", () => {
        expect(next_pow_of_two(3)).toBe(4)
    })
    test("4 is 4", () => {
        expect(next_pow_of_two(4)).toBe(4)
    })
    test("6 is 8", () => {
        expect(next_pow_of_two(6)).toBe(8)
    })
    test("9 is 16", () => {
        expect(next_pow_of_two(1)).toBe(1)
    })
})

describe("merkleRoot", () => {
    test("2 chunks merkleize", () => {
        const rootHash = merkleRoot([Buffer.alloc(32), Buffer.alloc(32)], 1)
        expect(rootHash).toStrictEqual(Buffer.from("f5a5fd42d16a20302798ef6ed309979b43003d2320d9f0e8ea9831a92759fb4b", "hex"))
    })

    test("4 chunks merkleize", () => {
        const bufs = [...Array(4).keys()].map((_) => Buffer.alloc(32))
        const rootHash = merkleRoot(bufs, 2)
        expect(rootHash).toStrictEqual(Buffer.from("db56114e00fdd4c1f85c892bf35ac9a89289aaecb1ebd0a96cde606a748b5d71", "hex"))
    })

    test("8 chunks merkleize", () => {
        const bufs = [...Array(8).keys()].map((_) => Buffer.alloc(32))
        const rootHash = merkleRoot(bufs, 3)
        expect(rootHash).toStrictEqual(Buffer.from("c78009fdf07fc56a11f122370658a353aaa542ed63e44c4bc15ff4cd105ab33c", "hex"))
    })
})
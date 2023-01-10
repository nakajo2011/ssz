import {next_pow_of_two} from "../src/utils";

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
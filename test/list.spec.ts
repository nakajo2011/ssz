import {Uint8} from "../src/lib/basic_type";
import {List} from "../src/lib/composit_type";
import {generateArray} from "./test_util";

describe('List test', () => {
    describe('chunks length', () => {
        describe('Uint8 List', () => {
            describe('chunk size', () => {
                test('length 4, elements size 2, then chunk size is 1', () => {
                    const listuint8 = new List(Uint8, generateArray(2, Uint8), 4)
                    expect(listuint8.chunks).toBe(1)
                })
                test('length 32, elements size 2, then chunk size is 1', () => {
                    const listuint8 = new List(Uint8, generateArray(2, Uint8), 32)
                    expect(listuint8.chunks).toBe(1)
                })
                test('length 33, elements size 2, then chunk size is 2', () => {
                    const listuint8 = new List(Uint8, generateArray(2, Uint8), 33)
                    expect(listuint8.chunks).toBe(2)
                })
                test('length 256, elements size 2, then chunk size is 8', () => {
                    const listuint8 = new List(Uint8, generateArray(2, Uint8), 256)
                    expect(listuint8.chunks).toBe(8)
                })
            })
            describe('size out of error', () => {
                test("length 2, elements size 3, then throw out of length error", () => {
                    expect(() => new List(Uint8, generateArray(3, Uint8), 2)).toThrow("Out of size. maxLength is 2, but elements length is 3.")
                })
            })
        })

        describe('List elements are [0x01, 0x02]', () => {
            const subject = (): List<Uint8> => {
                return new List<Uint8>(Uint8, generateArray(2, Uint8), 32)
            }
            test('serialized to 0x0102', () => {
                expect(subject().serialize()).toStrictEqual(Buffer.from('0102', 'hex'))
            })
            test('pack to 0x0102 0000...00', () => {
                expect(subject().pack()).toStrictEqual(Buffer.from([
                    0x01, 0x02,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0
                ]))
            })
        })

        describe('List elements are [0x01, 0x02] and maxLength is 128', () => {
            const subject = (): List<Uint8> => {
                return new List<Uint8>(Uint8, generateArray(2, Uint8), 128)
            }
            test('serialized to 0x0102', () => {
                expect(subject().serialize()).toStrictEqual(Buffer.from('0102', 'hex'))
            })
            test('pack to 0x0102 0000...00, size is 128bytes', () => {
                expect(subject().pack()).toStrictEqual(Buffer.from([
                    0x01, 0x02,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0,

                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,

                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,

                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                ]))
            })
        })

        describe('List elements are[0x01, 0x02 ... 0x21]', () => {
            const subject = (): List<Uint8> => {
                return new List<Uint8>(Uint8, generateArray(33, Uint8), 64)
            }
            test('when vec length is 33 then serialize size is 33', () => {
                expect(subject().serialize().length).toBe(33)
            })
            test('serialized to 0x01020304...21', () => {
                expect(subject().serialize()).toStrictEqual(Buffer.from([
                    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
                    0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10,
                    0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18,
                    0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f, 0x20,
                    0x21
                ]))
            })
            test('pack to 0x01020304..., 0x21 00000. it is expand to two chunks buffer.', () => {
                expect(subject().pack()).toStrictEqual(Buffer.from([
                    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
                    0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10,
                    0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18,
                    0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f, 0x20,
                    0x21,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0
                ]))
            })
        })
    })
})
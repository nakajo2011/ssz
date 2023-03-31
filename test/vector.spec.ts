import {Vector} from "../src/lib/composit_type";
import {Uint128, Uint8} from "../src/lib/basic_type";
import {generateArray, generateArrayAsBigInt} from "./test_util";

describe('Vector test', () => {
    describe('chunks length', () => {
        describe('Uint8 Vector', () => {
            test('length 2, then chunk size is 1', () => {
                const vecUint8 = new Vector(generateArray(2, Uint8))
                expect(vecUint8.chunks).toBe(1)
            })
            test('length 31, then chunk size is 1', () => {
                const vecUint8 = new Vector(generateArray(31, Uint8))
                expect(vecUint8.chunks).toBe(1)
            })
            test('length 32, then chunk size is 1', () => {
                const vecUint8 = new Vector(generateArray(32, Uint8))
                expect(vecUint8.chunks).toBe(1)
            })
            test('length 33, then chunk size is 2', () => {
                const vecUint8 = new Vector(generateArray(33, Uint8))
                expect(vecUint8.chunks).toBe(2)
            })
        })
    })

    describe('Uint8 Vector', () => {
        describe('Vector elements are [0x01, 0x02]', () => {
            const subject = (): Vector<Uint8> => {
                return new Vector<Uint8>(generateArray(2, Uint8))
            }
            test('serialized to 0x0102', () => {
                expect(subject().serialize()).toStrictEqual(Buffer.from('0102', 'hex'))
            })
            test('pack to 0x0102 0000...00', () => {
                expect(subject().pack()).toStrictEqual([
                    Buffer.from([
                        0x01, 0x02,
                        0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0
                    ])
                ])
            })
        })

        describe('Vector elements are[0x01, 0x02 ... 0x21]', () => {
            const subject = (): Vector<Uint8> => {
                return new Vector<Uint8>(generateArray(33, Uint8))
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
                expect(subject().pack()).toStrictEqual(
                    [
                        Buffer.from([
                            0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
                            0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10,
                            0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18,
                            0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f, 0x20,
                        ]),
                        Buffer.from([
                            0x21,
                            0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0
                        ])
                    ])
            })
        })
    })

    describe('Uint128 Vector', () => {
        describe('Vector elements are [1, 2, 3, 4, 5]', () => {
            const subject = (): Vector<Uint128> => {
                return new Vector<Uint128>(generateArrayAsBigInt(5, Uint128))
            }
            test('serialized to [1, 2, 3, 4, 5] uint128', () => {
                expect(subject().serialize()).toStrictEqual(Buffer.from(
                    '0100000000000000000000000000000002000000000000000000000000000000030000000000000000000000000000000400000000000000000000000000000005000000000000000000000000000000',
                    'hex'))
            })
            test('pack', () => {
                expect(subject().pack()).toStrictEqual([
                    Buffer.from('0100000000000000000000000000000002000000000000000000000000000000', 'hex'),
                    Buffer.from('0300000000000000000000000000000004000000000000000000000000000000', 'hex'),
                    Buffer.from('0500000000000000000000000000000000000000000000000000000000000000', 'hex'),
                ])
            })
            test('merkleize', () => {
                expect(subject().merkleize()).toStrictEqual(
                    Buffer.from(
                        '916d6bb40b4c2d26e074a202a3c8b831e137d1c0c7d1a974a3d333cd364d3db4',
                        'hex'))
            })
        })
    })
})
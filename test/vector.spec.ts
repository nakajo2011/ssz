import {Vector} from "../src/composit_type";
import {BasicBase, Uint8} from "../src/basic_type";

const generateArray = <T extends BasicBase>(length: number, ctor: { new (val:number): T}): T[] => {
    const vec: T[] = Array(length)

    for(let i:number = 0; i < length; i++) {
        vec[i] = new ctor(i+1)
    }
    return vec
}

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
                expect(subject().pack()).toStrictEqual(Buffer.from([
                    0x01, 0x02,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0
                ]))
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
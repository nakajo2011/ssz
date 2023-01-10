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

    describe('serialize', () => {
        describe('Uint8 Vector', () => {
            test('0x01 0x02 vec value is 0x0102 000...00', () => {
                const vecUint8 = new Vector<Uint8>(generateArray(2, Uint8))
                expect(vecUint8.serialize()).toStrictEqual(Buffer.from('0102000000000000000000000000000000000000000000000000000000000000', 'hex'))
            })
        })

        describe('Uint8 Vector', () => {
            test('when vec length is 33 then serialize size is 64', () => {
                const vecUint8 = new Vector<Uint8>(generateArray(2, Uint8))
                expect(vecUint8.value).toStrictEqual(Buffer.from('0102000000000000000000000000000000000000000000000000000000000000', 'hex'))
            })
        })
    })
})
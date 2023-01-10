import {BITS_PER_CHUNK} from "./constants";

export const count_chunk = (size: number, bit_size: number): number =>
    Math.floor((bit_size * size + (BITS_PER_CHUNK - 1)) / BITS_PER_CHUNK)

export const next_pow_of_two = (i: number): number => {
    if(i === 0 || i === 1) {
        return 1
    } else {
        let pow_len = 0
        let base = i
        while(base !== 0 && base <= i) {
            base = base >> 1
            pow_len += 1
        }
        let res = Math.pow(2, pow_len-1)
        if(res < i) {
            res = Math.pow(2, pow_len)
        }
        return res
    }
}

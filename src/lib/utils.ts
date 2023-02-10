import {BITS_PER_CHUNK} from "./constants";
import {createHash} from "node:crypto";

export const count_chunk = (size: number, bit_size: number): number =>
    Math.floor(((bit_size * size) + (BITS_PER_CHUNK - 1)) / BITS_PER_CHUNK)

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

export const sha256 = (val: Buffer) => createHash('sha256').update(val).digest()

export const merkleizeAsBinary = (lh:Buffer, rh:Buffer): Buffer => {
    const res = Buffer.alloc(lh.length + rh.length)
    lh.copy(res, 0)
    rh.copy(res, lh.length)
    return sha256(res)
}

export const merkleRoot = (leafs: Buffer[], maxDepth: number): Buffer => {
    const binaryTree = Array<Buffer|null>(maxDepth)
    for (let leaf of leafs) {
        let depth = 0
        while (depth <= maxDepth) {
            if (binaryTree[depth]) {
                const merkle = merkleizeAsBinary(binaryTree[depth] as Buffer, leaf)
                binaryTree[depth] = null
                leaf = merkle
                depth += 1
            } else {
                binaryTree[depth] = leaf
                break
            }
        }
    }
    return binaryTree[maxDepth] as Buffer
}
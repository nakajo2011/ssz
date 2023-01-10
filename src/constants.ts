import {createHash} from "node:crypto";

export const BITS_PER_BYTE = 8
export const BYTES_PER_CHUNK = 32
export const BITS_PER_CHUNK = 256

export const sha256 = (val: Buffer) => createHash('sha256').update(val).digest()
export const zeroHash: Buffer = sha256(Buffer.alloc(32, 0))

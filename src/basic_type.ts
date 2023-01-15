/**
 * SSZ Basic Type(uintN, boolean)
 */
import {BYTES_PER_CHUNK} from "./constants";


export interface SSZType {
    readonly value: Buffer
    serialize(): Buffer
    hash_tree_root(): Buffer
    pack(): Buffer
    merkleize(): Buffer
    chunk_count(): number
    is_variable_size(): boolean
}

export abstract class BasicBase implements SSZType {
    readonly value: Buffer
    protected constructor(val: Buffer) {
        this.value = val
    }

    val(): bigint {
        return BigInt("0x" + this.value.toString("hex"))
    }

    /**
     * BYTES_PER_CHUNK = 32
     * serialize is 32bytes little endian.
     */
    serialize(): Buffer {
        const res = Buffer.alloc(this.value.length)
        this.value.copy(res)
        return res.reverse()
    }

    hash_tree_root(): Buffer {
        return this.merkleize()
    }

    pack(): Buffer {
        const res = Buffer.alloc(BYTES_PER_CHUNK)
        this.serialize().copy(res, 0)
        return res
    }

    merkleize(): Buffer {
        return this.pack()
    }

    is_variable_size(): boolean {
        return false;
    }

    chunk_count(): number {
        return 1
    }
}

abstract class UintBasePrimitive extends BasicBase {
    protected constructor(val: number, size: number) {
        const buf = Buffer.alloc(size)
        buf.writeUintBE(val, 0, size)
        super(buf)
    }
}

export class Uint8 extends UintBasePrimitive {
    constructor(val: number = 0) {
        super(val, 1)
    }
}

export class Uint16 extends UintBasePrimitive {
    constructor(val: number = 0) {
        super(val, 2)
    }
}

export class Uint32 extends UintBasePrimitive {
    constructor(val: number = 0) {
        super(val, 4)
    }
}

abstract class UintBaseBigInt extends BasicBase {
    readonly byteSize: number
    protected constructor(val: string | bigint, size: number) {
        const buf: Buffer = Buffer.alloc(size)
        let hexStr: string
        if (typeof val === "bigint") {
            hexStr = val.toString(16)
        } else {
            hexStr = val.toString()
            if(hexStr.toString().startsWith("0x")) {
                hexStr = hexStr.substring(2)
            }
        }
        hexStr = '0'.repeat((size * 2) - hexStr.length) + hexStr
        buf.write(hexStr, 'hex')
        super(buf)
        this.byteSize = size
    }
}

export class Uint64 extends UintBaseBigInt {
    constructor(val: string | bigint = "0x00") {
        super(val, 8)
    }

}

export class Uint128 extends UintBaseBigInt {
    constructor(val:  string | bigint) {
        super(val, 16)
    }
}

export class Uint256 extends UintBaseBigInt {
    constructor(val:  string | bigint) {
        super(val, 32)
    }
}

export class SSZBoolean extends BasicBase {
    constructor(_bool: boolean) {
        const buf = Buffer.alloc(1, 0)
        buf[0] = _bool ? 1: 0
        super(buf)
    }
}
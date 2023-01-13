import {BasicBase, SSZBoolean, SSZType, Uint16, Uint32, Uint8} from "./basic_type";
import {BITS_PER_BYTE, BYTES_PER_CHUNK, BYTES_PER_LENGTH_OFFSET, sha256} from "./constants";
import {count_chunk} from "./utils";
import assert from "node:assert";

const bitSize = <T extends SSZType>(val: T): number => {
    if(val instanceof Uint8) {
        return 8
    } else if(val instanceof Uint16) {
        return 16
    } else {
        throw "unknown type"
    }
}

const sum = (list: number[]): bigint => {
    let res = BigInt(0)
    list.map((a) => {
        res = res + BigInt(a)
    })
    return res
}

export abstract class CompositeBase<T extends SSZType> implements SSZType {
    readonly abstract value: Buffer;
    readonly abstract payload: Array<T>
    readonly abstract chunks: number
    readonly abstract size: number

    abstract hash_tree_root(): Buffer;

    abstract serialize(): Buffer;

    abstract merkleize(): Buffer;

    abstract pack(): Buffer;

    abstract is_variable_size(): boolean;

}

export class Vector<T extends BasicBase> extends CompositeBase<T> {
    readonly value: Buffer
    readonly payload: Array<T>
    readonly chunks: number
    readonly size: number

    constructor(vec: Array<T>) {
        super()
        if(vec.length === 0) {
            throw "vector must have one or more elements."
        }
        this.payload = vec
        this.size = vec.length
        this.chunks = count_chunk(bitSize(vec[0]), this.size)
        this.value = Buffer.alloc(vec.length * bitSize(vec[0]) / BITS_PER_BYTE, 0)

        this._build()
    }

    private _build(): void {
        let offset = 0
        if(this.payload[0] instanceof SSZBoolean) {
            // nothing implements
        } else {
            for(const v of this.payload) {
                v.value.copy(this.value, offset)
                offset += bitSize(v) / BITS_PER_BYTE
            }
        }
    }

    hash_tree_root(): Buffer {
        return sha256(this.serialize());
    }

    serialize(): Buffer {
        return this.value;
    }

    merkleize(): Buffer {
        throw "not yet implement.";
    }

    pack(): Buffer {
        const packed = Buffer.alloc(this.chunks * BYTES_PER_CHUNK, 0)
        this.value.copy(packed)
        return packed
    }

    is_variable_size(): boolean {
        return false;
    }
}

export abstract class Container extends CompositeBase<SSZType> {

    readonly payload: SSZType[]
    readonly value: Buffer
    readonly size: number
    readonly chunks: number

    protected constructor(args: SSZType[]) {
        super()
        this.payload = args

        const fixed_parts: (SSZType|null)[] = this.payload.map((v) => !v.is_variable_size() ? v : null)
        const variable_parts: (SSZType|null)[] = this.payload.map((v) =>
            v.is_variable_size() ? v : null)

        const fixed_length: number[] =  fixed_parts.map((v) => v === null ? BYTES_PER_LENGTH_OFFSET : v.serialize().length)
        const variable_length: number[] = variable_parts.map((v) => v === null ? 0 : v.serialize().length)
        const total_length = sum(fixed_length) + sum(variable_length)
        assert(total_length < BigInt("010000000000000000000000000000000000000000000000000000000000000000"),
            "contents size is too large.")

        this.size = Number(total_length)
        this.chunks = count_chunk(8, this.size)

        const variable_offsets: Buffer[] = this.payload.map((v, i) =>
            new Uint32(Number(sum(fixed_length) + sum(variable_length.slice(0, i)))).serialize()
        )

        this.value = Buffer.alloc(this.size, 0)
        let offset = 0
        fixed_parts.map((v, i) => {
            if(v === null) {
                variable_offsets[i].copy(this.value, offset)
                offset += 4
            } else {
                v.serialize().copy(this.value, offset)
                offset += v.serialize().length
            }
        })
        variable_parts.map((v) => {
            if(v !== null) {
                v.serialize().copy(this.value, offset)
                offset += v.serialize().length
            }
        })
    }

    serialize(): Buffer {
        return this.value
    }

    pack(): Buffer {
        return Buffer.alloc(4)
    }

    hash_tree_root(): Buffer {
        return Buffer.alloc(0)
    }

    merkleize(): Buffer {
        return Buffer.alloc(4)
    }

    is_variable_size(): boolean {
        return true
    }
}
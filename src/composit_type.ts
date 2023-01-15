import {BasicBase, SSZType, Uint32} from "./basic_type";
import {BITS_PER_BYTE, BYTES_PER_CHUNK, BYTES_PER_LENGTH_OFFSET} from "./constants";
import {count_chunk, merkleRoot, next_pow_of_two} from "./utils";
import assert from "node:assert";

const sum = (list: number[]): bigint => {
    let res = BigInt(0)
    list.map((a) => {
        res = res + BigInt(a)
    })
    return res
}

export abstract class CompositeBase<T extends SSZType> implements SSZType {
    readonly abstract value: Buffer
    readonly abstract payload: Array<T>
    readonly abstract chunks: number
    readonly abstract size: number

    abstract hash_tree_root(): Buffer

    abstract serialize(): Buffer

    abstract merkleize(): Buffer

    abstract pack(): Buffer

    abstract is_variable_size(): boolean
    abstract chunk_count(): number

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
        this.chunks = count_chunk(vec[0].serialize().length * BITS_PER_BYTE, this.size)
        this.value = Buffer.alloc(vec.length * vec[0].serialize().length, 0)

        this._build()
    }

    private _build(): void {
        let offset = 0
        for(const v of this.payload) {
            v.serialize().copy(this.value, offset)
            offset += v.serialize().length
        }
    }

    hash_tree_root(): Buffer {
        return this.merkleize()
    }

    serialize(): Buffer {
        return this.value;
    }

    merkleize(): Buffer {
        const limit = next_pow_of_two(this.chunks)
        const leafs = [...Array(limit).keys()].map(() => Buffer.alloc(BYTES_PER_CHUNK))
        let offset = 0
        for(const buf of leafs) {
            this.value.copy(buf, 0, offset, offset+BYTES_PER_CHUNK)
            offset += BYTES_PER_CHUNK
        }
        const maxDepth = Math.log2(limit)
        return merkleRoot(leafs, maxDepth)
    }

    pack(): Buffer {
        const packed = Buffer.alloc(this.chunks * BYTES_PER_CHUNK, 0)
        this.value.copy(packed)
        return packed
    }

    is_variable_size(): boolean {
        return false;
    }

    chunk_count(): number {
        return this.chunks
    }
}

export class List<T extends BasicBase> extends CompositeBase<T> {
    readonly value: Buffer
    readonly payload: Array<T>
    readonly chunks: number
    readonly size: number

    constructor(ctor: (new () => T), list: Array<T> = [], maxLength: number) {
        if(list.length > maxLength) {
            throw `Out of size. maxLength is ${maxLength}, but elements length is ${list.length}.`
        }
        super()
        this.payload = list
        this.size = maxLength
        const elem = new ctor()
        this.chunks = count_chunk(elem.serialize().length * BITS_PER_BYTE, this.size)
        this.value = Buffer.alloc(list.length * elem.serialize().length, 0)

        this._build()
    }

    private _build(): void {
        let offset = 0
        for(const v of this.payload) {
            v.serialize().copy(this.value, offset)
            offset += v.serialize().length
        }
    }

    hash_tree_root(): Buffer {
        return this.merkleize()
    }

    serialize(): Buffer {
        return this.value;
    }

    merkleize(): Buffer {
        const limit = next_pow_of_two(this.chunks)
        const leafs = [...Array(limit).keys()].map(() => Buffer.alloc(BYTES_PER_CHUNK))
        let offset = 0
        for(const buf of leafs) {
            this.value.copy(buf, 0, offset, offset+BYTES_PER_CHUNK)
            offset += BYTES_PER_CHUNK
        }
        const maxDepth = Math.log2(limit)
        return merkleRoot(leafs, maxDepth)
    }

    pack(): Buffer {
        const packed = Buffer.alloc(this.chunks * BYTES_PER_CHUNK, 0)
        this.value.copy(packed)
        return packed
    }

    is_variable_size(): boolean {
        return true;
    }

    chunk_count(): number {
        return this.chunks
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
        this.chunks = this.payload.length

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
        return this.merkleize()
    }

    merkleize(): Buffer {
        const limit = next_pow_of_two(this.chunk_count())
        const buffers = [...Array(limit).keys()].map(() => Buffer.alloc(BYTES_PER_CHUNK))
        this.payload.forEach((p, i) => {
            buffers[i] = p.hash_tree_root()
        })
        return merkleRoot(buffers, Math.log2(buffers.length))
    }

    is_variable_size(): boolean {
        return this.payload.reduce<boolean>((p:boolean, c:SSZType) => p || c.is_variable_size(), false)
    }

    chunk_count(): number {
        return this.payload.length;
    }
}
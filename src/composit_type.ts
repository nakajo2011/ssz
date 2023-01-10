import {BasicBase, SSZBoolean, SSZType, Uint16, Uint8} from "./basic_type";
import {BITS_PER_BYTE, BYTES_PER_CHUNK, sha256} from "./constants";
import {count_chunk} from "./utils";


const bitSize = <T extends SSZType>(val: T): number => {
    if(val instanceof Uint8) {
        return 8
    } else if(val instanceof Uint16) {
        return 16
    } else {
        throw "unknown type"
    }
}

export abstract class CompositeBase<T extends BasicBase> implements SSZType {
    readonly abstract value: Buffer;
    readonly abstract payload: Array<T>
    readonly abstract chunks: number

    abstract hash_tree_root(): Buffer;

    abstract serialize(): Buffer;

    abstract merkleize(): Buffer;

    abstract pack(): Buffer;

}

export class Vector<T extends BasicBase> extends CompositeBase<T> {
    readonly value: Buffer
    readonly payload: Array<T>
    readonly chunks: number
    readonly size: number

    constructor(vec: Array<T>) {
        super()
        this.payload = vec
        this.size = vec.length
        this.chunks = count_chunk(bitSize(vec[0]), this.size)
        this.value = Buffer.alloc(this.chunks * BYTES_PER_CHUNK, 0)

        this._build()
    }

    private _build(): void {
        let offset = 0
        for(const v of this.payload) {
            if(v instanceof SSZBoolean) {
                // nothing implements
            } else {
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
        throw "not yet implement.";
    }
}

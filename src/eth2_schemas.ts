import {Container, List, Vector} from "./composit_type";
import {Uint64, Uint8} from "./basic_type";
import {MAX_VALIDATORS_PER_COMMITTEE} from "./constants";

export class Bytes extends Vector<Uint8> {
    constructor(vec = "0x00", size: number) {
        let uint8vec: Uint8[] = []
        if(vec !== "0x00") {
            if (vec.startsWith('0x')) {
                vec = vec.substring(2)
            }
            const buf = Buffer.from(vec, 'hex')
            uint8vec = new Array<Uint8>(buf.length)
            Buffer.from(vec, 'hex').forEach((v, i) => {
                uint8vec[i] = new Uint8(v)
            })
        } else {
            // default value not check length
            uint8vec = [...Array(size).keys()].map(() => new Uint8())
        }
        super(uint8vec)
        if(uint8vec.length !== size) {
            throw this.constructor.name + " must be " + size + "bytes value"
        }
    }
}

export class Bytes32 extends Bytes {
    constructor(vec = "0x00") {
        super(vec, 32)
    }
}
export class Gwei extends Uint64{}

/**
 * @description BLSPubkey	Bytes48	a BLS12-381 public key
 */

export class BLSPubkey extends Bytes {
    constructor(vec: string) {
        super(vec, 48);
    }
}

/**
 * @description BLSSignature Bytes96 a BLS12-381 signature
 */
export class BLSSignature extends Bytes {
    constructor(vec = "0x00") {
        super(vec, 96);
    }
}

/**
 * DepositData
 * class DepositData(Container):
 *     pubkey: BLSPubkey
 *     withdrawal_credentials: Bytes32
 *     amount: Gwei
 *     signature: BLSSignature  # Signing over DepositMessage
 */
export class DepositData extends Container {
    readonly pubkey: BLSPubkey
    readonly withdrawal_credentials: Bytes
    readonly amount: Gwei
    readonly signature: BLSSignature
    constructor(pubkey: BLSPubkey, withdrawal_credentials: Bytes, amount: Gwei, signature: BLSSignature) {
        super([pubkey, withdrawal_credentials, amount, signature])
        this.pubkey = pubkey
        this.withdrawal_credentials = withdrawal_credentials
        this.amount = amount
        this.signature = signature
    }
}

export class Epoch extends Uint64 {}
export class Slot extends Uint64 {}
export class CommitteeIndex extends Uint64 {}
export class ValidatorIndex extends Uint64 {}
export class Root extends Bytes32 {}

/**
 * class Checkpoint(Container):
 *     epoch: Epoch
 *     root: Root
 */
export class Checkpoint extends Container {
    readonly epoch: Epoch
    readonly root: Root

    constructor(epoch: Epoch = new Epoch(), root:Root = new Root()) {
        super([epoch, root])
        this.epoch = epoch
        this.root = root
    }
}

/**
 * class AttestationData(Container):
 *     slot: Slot
 *     index: CommitteeIndex
 *     # LMD GHOST vote
 *     beacon_block_root: Root
 *     # FFG vote
 *     source: Checkpoint
 *     target: Checkpoint
 */
export class AttestationData extends Container {
    readonly slot: Slot
    readonly index: CommitteeIndex
    readonly beacon_block_root: Root
    readonly source: Checkpoint
    readonly target: Checkpoint

    constructor(slot: Slot = new Slot(),
                index: CommitteeIndex = new CommitteeIndex(),
                beacon_block_root: Root = new Root(),
                source: Checkpoint = new Checkpoint(),
                target: Checkpoint = new Checkpoint()) {
        super([slot, index, beacon_block_root, source, target])
        this.slot = slot
        this.index = index
        this.beacon_block_root = beacon_block_root
        this.source = source
        this.target = target
    }
}

/**
 * class IndexedAttestation(Container):
 *     attesting_indices: List[ValidatorIndex, MAX_VALIDATORS_PER_COMMITTEE]
 *     data: AttestationData
 *     signature: BLSSignature
 *
 * MAX_VALIDATORS_PER_COMMITTEE	uint64(2**11) (= 2,048)
 */
export class IndexedAttestation extends Container {
    readonly attesting_indices: List<ValidatorIndex>
    readonly data: AttestationData
    readonly signature: BLSSignature

    constructor(attesting_indices: List<ValidatorIndex> = new List(ValidatorIndex, [], MAX_VALIDATORS_PER_COMMITTEE),
                data: AttestationData = new AttestationData(),
                signature: BLSSignature = new BLSSignature()) {
        if(attesting_indices.size !== MAX_VALIDATORS_PER_COMMITTEE) {
            throw "Invalid attesting_indices size!"
        }
        super([attesting_indices, data, signature]);
        this.attesting_indices = attesting_indices
        this.data = data
        this.signature = signature
    }
}
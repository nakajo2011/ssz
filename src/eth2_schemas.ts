import {Container, Vector} from "./composit_type";
import {Uint64, Uint8} from "./basic_type";

export class Bytes extends Vector<Uint8> {
    constructor(vec: string, size: number) {
        if(vec.startsWith('0x')) {
            vec = vec.substring(2)
        }
        const buf = Buffer.from(vec, 'hex')
        const uint8vec = new Array<Uint8>(buf.length)
        Buffer.from(vec, 'hex').forEach((v, i) => {
            uint8vec[i] = new Uint8(v)
        })
        super(uint8vec)
        if(uint8vec.length !== size) {
            throw this.constructor.name + " must be " + size + "bytes value"
        }
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
    constructor(vec: string) {
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
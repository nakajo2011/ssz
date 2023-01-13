import {BLSPubkey, BLSSignature, Bytes, DepositData, Gwei} from "../src/eth2_schemas";
import * as fs from "fs";
import {uncompressSync} from "snappy"

describe("Container test", () => {
    describe("DepsositData", () => {
        test("serialize", () => {
            const depositData: DepositData = new DepositData(
                new BLSPubkey("0x6520084850420d1dfb4432a929dfcc5632bfda9930b58031465b314a326a565bf3d66bd66e8d997cfe4d358ae2e248f0"),
                new Bytes("0xac16207efbbae531fa3355f9ffc079cc1372194dc973cfa8faa4bc52699fb25c", 32),
                new Gwei(BigInt("1778195238878610085")),
                new BLSSignature("0xcfd0fd3c4620e890ea79b3854bbb25f514c21aa70955fc78314c9c7fd151710e60680ad90be70177688f40f25b9e5c642b6f9e233f2ba5df64c63d0da6ccb43f34a6324b27ad5d4b392ac771e648bc64a6aabd5298d25e3f02b2bffd40b85f34")
            )

            const snappy = fs.readFileSync("test/resources/DepositData/ssz_random/case_0/serialized.ssz_snappy", "hex")
            const serializedData = uncompressSync(Buffer.from(snappy, 'hex'))
            expect(depositData.serialize()).toStrictEqual(serializedData)
        })
    })
})
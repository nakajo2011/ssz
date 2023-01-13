import {BLSPubkey, BLSSignature, Bytes, DepositData, Gwei} from "../src/eth2_schemas";
import {readSerializeData} from "./test_util";

describe("DepsositData", () => {
    describe("serialize", () => {
        test("case_0", () => {
            const depositData: DepositData = new DepositData(
                new BLSPubkey("0x6520084850420d1dfb4432a929dfcc5632bfda9930b58031465b314a326a565bf3d66bd66e8d997cfe4d358ae2e248f0"),
                new Bytes("0xac16207efbbae531fa3355f9ffc079cc1372194dc973cfa8faa4bc52699fb25c", 32),
                new Gwei(BigInt("1778195238878610085")),
                new BLSSignature("0xcfd0fd3c4620e890ea79b3854bbb25f514c21aa70955fc78314c9c7fd151710e60680ad90be70177688f40f25b9e5c642b6f9e233f2ba5df64c63d0da6ccb43f34a6324b27ad5d4b392ac771e648bc64a6aabd5298d25e3f02b2bffd40b85f34")
            )
            const serializedData = readSerializeData("DepositData", "case_0")
            expect(depositData.serialize()).toStrictEqual(serializedData)
        })
        test("case_1", () => {
            const depositData: DepositData = new DepositData(
                new BLSPubkey("0x1b73557fdcd2ec363c273f8e88d59be446a42e3f139f6a3f620e91fefd0c8edcfe4fcdb8658f4b3fb20a3228d8b9683a"),
                new Bytes("0xcf3cf75461e9ff7755f87facf7744a24f2ee4b5d3ce2af510d0b013229444d44", 32),
                new Gwei(BigInt("9672649532028223324")),
                new BLSSignature("0x26650a4dd9be8d5bee07fc687ab0d57b7f26dd252a9b4e194ac436c39c6c9439929c3a0aa136e0bb8f66b349b10c3cf2aa0294a8a3d6a9cc5c3a16d9103ee00b62bb10a5f629bcffdfc8bf4838d5544e9db76ca37d2ea6e27f878c0f78ce6d90")
            )
            const serializedData = readSerializeData("DepositData", "case_1")
            expect(depositData.serialize()).toStrictEqual(serializedData)
        })
    })
})
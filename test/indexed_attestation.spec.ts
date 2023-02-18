import {
    AttestationData, BLSSignature,
    Checkpoint,
    CommitteeIndex,
    Epoch,
    IndexedAttestation,
    Root,
    Slot,
    ValidatorIndex
} from "../src/lib/eth2_schemas";
import {List} from "../src/lib/composit_type";
import {MAX_VALIDATORS_PER_COMMITTEE} from "../src/lib/constants";
import {readHashRoot, readSerializeData} from "./test_util";

describe('IndexedAttestation Test', () => {
    test('is_variable_type is true', () => {
        const subject = new IndexedAttestation()
        expect(subject.is_variable_size()).toBeTruthy()
    })

    describe('case_0', () => {
        const subject = new IndexedAttestation(
                new List(ValidatorIndex, [
                        new ValidatorIndex(BigInt("14836584338896001841")),
                        new ValidatorIndex(BigInt("5644513999730246312")),
                        new ValidatorIndex(BigInt("5390719578532468900"))
                    ],
                    MAX_VALIDATORS_PER_COMMITTEE),
                new AttestationData(
                    new Slot(BigInt("15812246900578746673")),
                    new CommitteeIndex(BigInt("2764935407589719959")),
                    new Root("0x7c7b89bb2766f117cf553e005764ef0e99ab4b8b270d3f8a81f81120043123eb"),
                    new Checkpoint( // source
                        new Epoch(BigInt("13478911193707197911")),
                        new Root("0xa901742fadec276872af72edfee8ae39baeccdba31049f09ac8a196311c38452")),
                    new Checkpoint( // target
                        new Epoch(BigInt("3510360685719591030")),
                        new Root("0xf362b5b18e0a00572dcdefa99668a86d781e82d0fe2aca2df9ee37554310e807"))),
                new BLSSignature("0x2061dd283483a7a8f549f9fb3768278f511a2124e84a7c66aa4656ea45a9dacd4fd7961051b12356ad58880347242cd83b58137575e2639742c2c477826a0bcc6b0a4aca055cbdad6488631f345081db218f9b5d520e453fa525d72bba2bccd1")
        )
        test('serialize', () => {
            const serializedData = readSerializeData("IndexedAttestation", "case_0")
            expect(subject.serialize()).toStrictEqual(serializedData)
        })
        test('hash_tree_root', () => {
            const rootData = readHashRoot("IndexedAttestation", "case_0")
            expect(subject.hash_tree_root()).toStrictEqual(rootData)
        })
    })
})
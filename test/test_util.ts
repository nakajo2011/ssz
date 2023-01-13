import fs from "fs";
import {uncompressSync} from "snappy";

export const readSerializeData = (containerName:string, caseName:string):Buffer => {
    const snappy = fs.readFileSync(`test/resources/${containerName}/ssz_random/${caseName}/serialized.ssz_snappy`, "hex")
    const serializedData = uncompressSync(Buffer.from(snappy, 'hex'))
    if(serializedData instanceof Buffer) {
        return serializedData
    } else {
        return Buffer.from(serializedData, 'hex')
    }

}
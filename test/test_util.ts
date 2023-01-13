import fs from "fs";
import {uncompressSync} from "snappy";
import * as yaml from "js-yaml"

export const readSerializeData = (containerName:string, caseName:string):Buffer => {
    const snappy = fs.readFileSync(`test/resources/${containerName}/ssz_random/${caseName}/serialized.ssz_snappy`, "hex")
    const serializedData = uncompressSync(Buffer.from(snappy, 'hex'))
    if(serializedData instanceof Buffer) {
        return serializedData
    } else {
        return Buffer.from(serializedData, 'hex')
    }

}

type RootsYAML = {
    root: string
}

export const readHashRoot = (containerName:string, caseName:string):Buffer => {
    const roots = yaml.load(fs.readFileSync(`test/resources/${containerName}/ssz_random/${caseName}/roots.yaml`, 'utf-8')) as RootsYAML
    return Buffer.from(roots.root.substring(2), 'hex')
}
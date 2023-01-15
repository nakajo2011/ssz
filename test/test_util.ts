import fs from "fs";
import {uncompressSync} from "snappy";
import * as yaml from "js-yaml"
import {BasicBase} from "../src/basic_type";

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

export const generateArray = <T extends BasicBase>(length: number, ctor: { new (val:number): T}): T[] => {
    const vec: T[] = Array(length)

    for(let i:number = 0; i < length; i++) {
        vec[i] = new ctor(i+1)
    }
    return vec
}

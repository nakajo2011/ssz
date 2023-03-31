import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {BasicBase, SSZBoolean, SSZType, Uint128, Uint16, Uint256, Uint32, Uint64, Uint8} from "../lib/basic_type";
import {CompositeParamState} from "./compositeTypeSlice";
import {BasicParamState} from "./basicTypeSlice";
import {List, Vector} from "../lib/composit_type";

type basicFactoryParam = {
    type_name: string,
    value: string,
}

// stateの型定義
export type ResultState = {
    hash_tree_root?: string
    serialize?: string
    errorMsg?: string
};

type FactoryReturn = {
    instance?: SSZType
    errorMsg?: string
}

const basic_type_factory = (state: basicFactoryParam) => {
    const res: FactoryReturn = {instance: undefined, errorMsg: undefined}
    try {
        console.log(state.type_name)
        const value = state.value
        switch (state.type_name) {
            case "Uint8":
                res.instance = new Uint8(parseInt(value))
                break
            case "Uint16":
                res.instance = new Uint16(parseInt(value))
                break
            case "Uint32":
                res.instance = new Uint32(parseInt(value))
                break
            case "Uint64":
                res.instance = new Uint64(BigInt(value))
                break
            case "Uint128":
                res.instance = new Uint128(BigInt(value))
                break
            case "Uint256":
                res.instance = new Uint256(BigInt(value))
                break
            case "Boolean":
                res.instance = new SSZBoolean(value !== '0')
                break
            default:
                res.instance = undefined
        }
    } catch (e) {
        console.error(e)
        if(e instanceof Error) {
            res.errorMsg = e.toString()
        } else if(typeof e == 'string') {
            res.errorMsg = e
        } else {
            res.errorMsg = String(e).toString()
        }
    }
    return res
}

const conv = (fr: FactoryReturn): ResultState => {
    if(fr.instance) {
        return {
            hash_tree_root: fr.instance.hash_tree_root().toString('hex'),
            serialize: fr.instance.serialize().toString('hex'),
            errorMsg: undefined
        }
    } else {
        return {
            hash_tree_root: undefined,
            serialize: undefined,
            errorMsg: fr.errorMsg
        }
    }
}
const toArray = (values: string[], type_name: string): BasicBase[] => {
    const list =  values.map((s) => {
        return basic_type_factory({type_name: type_name, value: s}).instance
    })
    return list.filter((s): s is BasicBase => s !== undefined)
}

const composite_type_factory = (state: CompositeParamState): ResultState => {
    const res: FactoryReturn = {instance: undefined, errorMsg: undefined}
    try {
        console.log(state.composite_type_name)
        const value = JSON.parse(state.value) as string[]
        switch (state.composite_type_name) {
            case "Vector":
                res.instance = new Vector(toArray(value, state.basic_type_name))
                break
            case "List":
                res.instance = new List(Uint8, toArray(value, state.basic_type_name), 4)
                break
            default:
                res.instance = undefined
                res.errorMsg = `type: ${state.composite_type_name}<${state.basic_type_name}> is not support yet.`
                break
        }
    } catch (e) {
        console.error(e)
        if(e instanceof Error) {
            res.errorMsg = e.toString()
        } else if(typeof e == 'string') {
            res.errorMsg = e
        } else {
            res.errorMsg = String(e).toString()
        }
    }
    return res
}

const initialState: ResultState = {
    hash_tree_root: undefined,
    serialize: undefined,
    errorMsg: undefined
};

const resultSlice = createSlice({
    name: 'result_param',
    initialState,
    reducers: {
        changeBasicParam: (state, action: PayloadAction<BasicParamState>) => ({
            ...conv(basic_type_factory(action.payload))
        }),
        changeCompositeParam: (state, action: PayloadAction<CompositeParamState>) => ({
            ...conv(composite_type_factory(action.payload)),
        }),
    },
})

export const { changeBasicParam, changeCompositeParam } = resultSlice.actions;

export default resultSlice.reducer
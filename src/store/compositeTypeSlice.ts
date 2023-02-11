import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Vector} from "../lib/composit_type";
import {Uint8} from "../lib/basic_type";

// sszで指定できる型をunionで定義
export const BasicTypeOptions = {
    Uint8: "Uint8",
    Uint16: "Uint16",
    Uint32: "Uint32",
    Uint64: "Uint64",
    Uint128: "Uint128",
    Uint256: "Uint256",
    Boolean: "Boolean"
} as const;
export const CompositeTypeOptions = {
    Vector: "Vector",
    List: "List",
} as const;
type BasicTypeOptions = typeof BasicTypeOptions[keyof typeof BasicTypeOptions];
type CompositeTypeOptions = typeof CompositeTypeOptions[keyof typeof CompositeTypeOptions];

// stateの型定義
export type State = {
    composite_type_name: CompositeTypeOptions;
    basic_type_name: BasicTypeOptions
    value: string
};

// 初期状態
const initialState: State = {
    composite_type_name: 'Vector',
    basic_type_name: 'Uint8',
    value: "[1, 2]"
};

// createSliceでreducerとactionを同時に定義
const compositeTypeSlice = createSlice({
    name: 'change',
    initialState,
    reducers: {
        changeCompositeType: (state, action: PayloadAction<CompositeTypeOptions>) => ({
            ...state,
            composite_type_name: action.payload,
            value: '[1, 2]'
        }),
        changeBasicType: (state, action: PayloadAction<BasicTypeOptions>) => ({
            ...state,
            basic_type_name: action.payload,
            value: '[1, 2]'
        }),
        changeValue: (state, action: PayloadAction<string>) => ({
            ...state,
            value: action.payload,
        }),
    },
})

// action creatorもこんな風に取り出して公開できて、dispatchでReactから利用できる
export const { changeCompositeType, changeBasicType, changeValue } = compositeTypeSlice.actions
export default compositeTypeSlice.reducer
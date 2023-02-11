import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

type BasicTypeOptions = typeof BasicTypeOptions[keyof typeof BasicTypeOptions];
type TypeOptions = BasicTypeOptions

// stateの型定義
export type State = {
    type_name: TypeOptions
    value: string
};

// 初期状態
const initialState: State = {
    type_name: 'Uint8',
    value: "20"
};

// createSliceでreducerとactionを同時に定義
const basicTypeSlice = createSlice({
    name: 'change',
    initialState,
    reducers: {
        changeType: (state, action: PayloadAction<TypeOptions>) => ({
            type_name: action.payload,
            value: "20"
        }),
        changeValue: (state, action: PayloadAction<string>) => ({
            ...state,
            value: action.payload,
        }),
    },
})

// action creatorもこんな風に取り出して公開できて、dispatchでReactから利用できる
export const { changeType, changeValue } = basicTypeSlice.actions;

export default basicTypeSlice.reducer
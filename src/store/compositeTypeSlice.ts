import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {BasicTypeOptions} from "./basicTypeSlice";

export const CompositeTypeOptions = {
    Vector: "Vector",
    List: "List",
} as const;
type CompositeTypeOptions = typeof CompositeTypeOptions[keyof typeof CompositeTypeOptions];

// stateの型定義
export type CompositeParamState = {
    composite_type_name: CompositeTypeOptions;
    basic_type_name: BasicTypeOptions
    value: string
};

// 初期状態
const initialState: CompositeParamState = {
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
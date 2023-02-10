import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';

// sszで指定できる型をunionで定義
export const TypeOptions = {
    Uint8: "Uint8",
    Uint16: "Uint16",
    Uint32: "Uint32",
    Uint64: "Uint64",
    Uint128: "Uint128",
    Uint256: "Uint256",
    Boolean: "Boolean"
} as const;
type TypeOptions = typeof TypeOptions[keyof typeof TypeOptions];

// stateの型定義
export type State = {
    type_name: TypeOptions;
    value: string
};

// 初期状態
const initialState: State = {
    type_name: 'Uint8',
    value: "20"
};

// createSliceでreducerとactionを同時に定義
const slice = createSlice({
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
export const { changeType, changeValue } = slice.actions;

// storeを作るヘルパー複数のreducerをまとめる機能もあり
export const store = configureStore({
    reducer: slice.reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

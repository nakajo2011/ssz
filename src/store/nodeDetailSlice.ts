import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// stateの型定義
export type NodeDetailState = {
    value?: string
};

const initialState: NodeDetailState = {
    value: "test",
};

const nodeDetailSlice = createSlice({
    name: 'nodeClicked',
    initialState,
    reducers: {
        nodeClicked: (state, action: PayloadAction<string>) => {
            console.log("nodeClicked called", state.value)
            return ({
                value: action.payload
            })
        }
    },
})

export const { nodeClicked } = nodeDetailSlice.actions;

export default nodeDetailSlice.reducer
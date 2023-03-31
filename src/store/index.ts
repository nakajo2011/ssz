import {combineReducers, configureStore} from '@reduxjs/toolkit'
import compositeTypeSlice from "./compositeTypeSlice"
import resultSlice from "./resultSlice";
import nodeDetailSlice from "./nodeDetailSlice";


export const store = configureStore({
    reducer: combineReducers({
        composite: compositeTypeSlice,
        sszResult: resultSlice,
        nodeDetail: nodeDetailSlice,
    }),
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

import { configureStore } from "@reduxjs/toolkit";
import todoAsyncSlicer from "./slicers/todoAsyncSlicer";
import timeSession from "./slicers/timeSession";
import themeSlicer from "./slicers/themeSlicer";




const store = configureStore({
    reducer: {
        todosAll: todoAsyncSlicer.reducer,
        session: timeSession.reducer,
        theme: themeSlicer.reducer,
    }
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
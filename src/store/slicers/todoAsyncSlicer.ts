import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITodoType } from "../../types/types";
import axios from "axios";


interface initialStateProps {
    list: ITodoType[];
    loading: boolean;
    error: string | null;
}

const initialState: initialStateProps = {
    list: [],
    loading: false,
    error: null,
}

const dataTodos: string | undefined = process.env.REACT_APP_TODOS


export const createTodo = createAsyncThunk(
    'createtodos/async',
    async (todo: ITodoType) => {
        if (!dataTodos) {
            console.error("EXTERNAL URL is not defined");
            return [];
        }

        try {
            const response = await axios.post(dataTodos + '.json', todo)

            return response.data
        } catch (error) {
            return [];
        }
    }
)

export const completeTodo = createAsyncThunk(
    'completeTodo',
    async ({ name, val }: { name: string | undefined, val: boolean }) => {
        if (!dataTodos) {
            console.error("EXTERNAL URL is not defined");
            return [];
        }

        try {
            await axios.patch(dataTodos + `/${name}.json`, {
                ready: val,
            });

        } catch (error) {
            return []
        }
    }
)

export const changeTime = createAsyncThunk(
    'changeTime',
    async ({ name, time }: { name: string | undefined, time: number }) => {
        if (!dataTodos) {
            console.error("EXTERNAL URL is not defined");
            return [];
        }

        try {
            await axios.patch(dataTodos + `/${name}.json`, {
                time,
            });

        } catch (error) {
            return []
        }
    }
)



export const deleteTodo = createAsyncThunk(
    'todos/delete',
    async (name: string | undefined) => {

        if (!dataTodos) {
            console.error("EXTERNAL URL is not defined");
            return [];
        }

        try {
            await axios.delete(dataTodos + `/${name}.json`)
        } catch (error) {
            throw new Error('Failed to delete todo.');
        }
    }
);


export const fetchTodosAll = createAsyncThunk<ITodoType[]>(
    'todos/async',
    async () => {
        if (!dataTodos) {
            return [];
        }

        try {
            const response = await axios.get(dataTodos + '.json')


            const keys = Object.keys(response.data).map(value => value)

            return (Object.values(response.data).map((value, index) => {

                return {
                    ...(value as ITodoType),
                    name: keys[index]
                }
            }))
        } catch (error) {
            return []
        }
    }
)



const todoAsyncSlicer = createSlice({
    name: 'async',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder

            .addCase(fetchTodosAll.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(fetchTodosAll.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload
            })
            .addCase(fetchTodosAll.rejected, state => {
                state.loading = false;
                state.error = 'erro';
            })


            .addCase(createTodo.pending, state => {
                state.loading = true;
                state.error = null
            })
            .addCase(createTodo.fulfilled, state => {
                state.loading = false;
            })
            .addCase(createTodo.rejected, state => {
                state.loading = false;
                state.error = 'erro';
            })


            .addCase(completeTodo.pending, state => {
                state.loading = true;
                state.error = null
            })
            .addCase(completeTodo.fulfilled, state => {
                state.loading = false;
            })
            .addCase(completeTodo.rejected, state => {
                state.loading = false;
                state.error = 'erro';
            })


            .addCase(deleteTodo.pending, state => {
                state.loading = true;
                state.error = null
            })
            .addCase(deleteTodo.fulfilled, state => {
                state.loading = false;
            })
            .addCase(deleteTodo.rejected, state => {
                state.loading = false;
                state.error = 'erro';
            })


            .addCase(changeTime.pending, state => {
                state.loading = true;
                state.error = null
            })
            .addCase(changeTime.fulfilled, state => {
                state.loading = false;
            })
            .addCase(changeTime.rejected, state => {
                state.loading = false;
                state.error = 'erro';
            });

    }
})



export default todoAsyncSlicer
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { loadTodosFunc } from "../services";
import { getId } from "../utils";


interface TodoItem {
    id: number;
    title: string;
    done: boolean;
}

interface TodoState {
    items: TodoItem[];
    status: 'init' | 'loading' | 'error' | 'success'
}

const initialState: TodoState = {
    items: [],
    status: 'init'
}

const slice = createSlice({
    name: 'todo', 
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<{title: string}>) {
            //Immutable
            // state.items = [
            //     ...state.items,
            //     {
            //         id: getId(),
            //         title: action.payload.title,
            //         done: false
            //     }
            // ]
            //Mutable
                state.items.push({
                id: getId(),
                title: action.payload.title,
                done: false
            })
        },
        toggleTodoDone(state, action: PayloadAction<{id: number}>) {
            const item = state.items.find((item) => {
                item.id === action.payload.id
            })

            if (!item) {
                return;
            }

            item.done = !item.done;
        },
        deleteTodo(state, action: PayloadAction<{id: number}>) {
            const index = state.items.findIndex((item) => {
                item.id === action.payload.id
            })

            if (index === -1) {
                return;
            }

            state.items.splice(index, 1);
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadTodosThunk.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(loadTodosThunk.fulfilled, (state, action) => {
            state.status = 'success';
            state.items = action.payload;
        })
        .addCase(loadTodosThunk.rejected, (state) => {
            state.status = 'error'
        })
    }
})

export const loadTodosThunk = createAsyncThunk('todo/get', () => {
    return loadTodosFunc();
})

export const { reducer: todoReducer, actions: todoActions } = slice;
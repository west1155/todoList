import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { todolistAPI } from "../api/todolist-api";
import { initialState } from "./initialState";
import { TodoListType } from "../AppWithRedux";
import { FilterValuesType } from "../components/todolist/TodoList";
import {fetchTasksThunk} from "./tasks-slice";

export const fetchTodolistsThunk = createAsyncThunk(
    'todolists/fetchTodolists',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await todolistAPI.getTodoLists();
            const todolists = response.data.map((tl: any) => ({
                id: tl.id,
                title: tl.title,
                filter: 'All' as FilterValuesType,
            }));
            dispatch(todolistsSlice.actions.setTodolists(todolists));
            for (const tl of todolists) {
                dispatch(fetchTasksThunk(tl.id));
            }

        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const changeTodolistTitleTC = createAsyncThunk(
    'todolists/changeTodolistTitle',
    async (param: { id: string, title: string }, { rejectWithValue, dispatch }) => {
        try {
            await todolistAPI.updateTodolist(param.id, param.title);
            dispatch(todolistsSlice.actions.changeTodolistTitle(param));
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const removeTodolistTC = createAsyncThunk(
    'todolists/removeTodolist',
    async (todolistId: string, { rejectWithValue, dispatch }) => {
        try {
            await todolistAPI.deleteTodolist(todolistId);
            dispatch(todolistsSlice.actions.removeTodolist(todolistId));
            return { todolistId };
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addTodolistTC = createAsyncThunk(
    'todolists/addTodolist',
    async (title: string, { rejectWithValue, dispatch }) => {
        try {
            const response = await todolistAPI.createTodolist(title);
            dispatch(fetchTodolistsThunk());
            return { todolist: response.data.data.item };
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const changeTodolistFilterTC = createAsyncThunk(
    'todolists/changeTodolistFilter',
    async (param: { id: string, filter: FilterValuesType }, { rejectWithValue, dispatch }) => {
        try {
            dispatch(todolistsSlice.actions.changeTodolistFilter(param));
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: initialState as TodoListType[],
    reducers: {
        /*addTodolist(state, action: PayloadAction<{ id: string, title: string }>) {
            state.push({
                id: action.payload.id,
                title: action.payload.title,
                filter: 'All',
            });
        },*/

        removeTodolist(state, action: PayloadAction<string>) {
            return state.filter(tl => tl.id !== action.payload);
        },

        changeTodolistTitle(state, action: PayloadAction<{ id: string, title: string }>) {
            const todolist = state.find(tl => tl.id === action.payload.id);
            if (todolist) {
                todolist.title = action.payload.title;
            }
        },

        changeTodolistFilter(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const todolist = state.find(tl => tl.id === action.payload.id);
            if (todolist) {
                todolist.filter = action.payload.filter;
            }
        },
        setTodolists(state, action: PayloadAction<TodoListType[]>) {
            return action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodolistsThunk.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});


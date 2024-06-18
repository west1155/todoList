import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { todolistAPI } from "../api/todolist-api";
import {initialTodoListsState} from "./initialState";
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
            return { id: param.id, title: param.title, filter: 'All' as FilterValuesType };
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
            return { todolist: response.data.data.item };
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: initialTodoListsState,
    reducers: {

        changeTodolistFilterReducer(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.todolists.findIndex(tl => tl.id === action.payload.id);
            if (index > -1) {
                state.todolists[index].filter = action.payload.filter;
            }
        },
        setTodolists(state, action: PayloadAction<TodoListType[]>) {
            state.todolists = action.payload.map(tl => ({...tl, filter: 'All' as FilterValuesType}));
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchTodolistsThunk.pending, (state) => {
                state.status = 'loading';
            })

            .addCase(fetchTodolistsThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })

            .addCase(fetchTodolistsThunk.fulfilled, (state, action) => {
            return action.payload;
            })






            .addCase(addTodolistTC.fulfilled, (state, action) => {
                state.todolists.push({...action.payload.todolist, filter: 'All' as FilterValuesType});
            })

            .addCase(addTodolistTC.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            .addCase(addTodolistTC.pending, (state) => {
                state.status = 'loading';
            })






            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                const index = state.todolists.findIndex(tl => tl.id === action.payload.todolistId);
                if (index > -1) {
                    state.todolists.splice(index, 1);
                }
            })

            .addCase(removeTodolistTC.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            .addCase(removeTodolistTC.pending, (state) => {
                state.status = 'loading';
            })







            .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
                const payload : TodoListType = action.payload!;
                if (payload) {
                    const todolist = state.todolists.find(tl => tl.id === payload.id);
                    if (todolist) {
                        todolist.title = payload.title;
                    }
                }
            })
            .addCase(changeTodolistTitleTC.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(changeTodolistTitleTC.pending, (state) => {
                state.status = 'loading';
            })

    },

});


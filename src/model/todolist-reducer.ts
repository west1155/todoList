import {TodoListType} from "../AppWithReducers";
import {FilterValuesType} from "../components/todolist/TodoList";
import {initialState} from "./initialState";
import {todolistAPI} from "../api/todolist-api";
import {createAsyncThunk} from "@reduxjs/toolkit";




export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    payload: {
        title: string,
        id: string
    }

}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

export type TodolistType = {
    id: string
    title: string
    filter: string
}

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: TodolistType[]
}

export type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType | SetTodolistsActionType

export const todolistsReducer = (state: TodoListType[] = initialState, action: ActionsType) => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            const newTodolist: TodoListType = {
                id: action.payload.id,
                title: action.payload.title,
                filter: 'All'
            }
            return [...state, newTodolist]
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state];
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: 'All'}))
        }

        default:
            return state
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId } as const
}

export const AddTodolistAC = (title: string, id: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', payload:{title, id} } as const
}

export const ChangeTodoListTitleAC = (todolistID: string, title: string) : ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistID ,title: title} as const
}

export const ChangeTodoListFilterAC = (todolistID: string, filter: FilterValuesType) : ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistID ,filter: filter} as const
}

export const SetTodoListsAC = (todolists: TodoListType[]): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}


//Thunk for Todolists

export const fetchTodolistsThunk = createAsyncThunk(
    'todolist/fetchTodolists',
    async (_, thunkAPI) => {
        try {
            const response = await todolistAPI.getTodoLists();
            const mappedData: TodolistType[] = response.data.map((tl: any) => ({
                id: tl.id,
                title: tl.title,
            }));
            thunkAPI.dispatch(SetTodoListsAC(mappedData));
        } catch (err) {
            let error: any = err;
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const removeTodolistThunk = createAsyncThunk(
    'todolist/removeTodolist',
    async (todolistId: string, thunkAPI) => {
        try {
            await todolistAPI.deleteTodolist(todolistId);
            thunkAPI.dispatch(RemoveTodolistAC(todolistId));
        } catch (err) {
            let error: any = err;
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const addTodolistThunk = createAsyncThunk(
    'todolist/addTodolist',
    async (title: string, thunkAPI) => {
        try {
            const response = await todolistAPI.createTodolist(title);
            if (response.data.resultCode === 0) {
                thunkAPI.dispatch(AddTodolistAC(title, response.data.data.item.id));
            } else {
                return thunkAPI.rejectWithValue(response.data.messages[0]);
            }
        } catch (err) {
            let error: any = err;
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateTodolistFilterThunk = createAsyncThunk(
    'todolist/updateTodolistFilter',
    async (param: {todolistId: string, filter: FilterValuesType}, thunkAPI) => {
        try {
            await todolistAPI.updateTodolist(param.todolistId, param.filter);
            thunkAPI.dispatch(ChangeTodoListFilterAC(param.todolistId, param.filter));
        } catch (err) {
            let error: any = err;
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateTodolistTitleThunk = createAsyncThunk(
    'todolist/updateTodolistTitle',
    async (param: {todolistId: string, title: string}, thunkAPI) => {
        try {
            await todolistAPI.updateTodolist(param.todolistId, param.title);
            thunkAPI.dispatch(ChangeTodoListTitleAC(param.todolistId, param.title));
        } catch (err) {
            let error: any = err;
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const todolistThunks = {
    fetchTodolistsThunk,
    removeTodolistThunk,
    addTodolistThunk,
    updateTodolistFilterThunk,
    updateTodolistTitleThunk
}

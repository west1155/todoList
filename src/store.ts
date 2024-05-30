import {tasksReducer} from "./model/tasks-reducer";
import {todolistsReducer} from "./model/todolist-reducer";
import {thunk} from "redux-thunk";
import {combineReducers} from 'redux'
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./model/app-reducer";


const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;

export const dispatch = store.dispatch





// to make store available in the browser console


/*

(window as any).store = store;

// Option 2: Declaring the property on the window object
declare global {
    interface Window {
        store: typeof store;
    }
}
*/
// @ts-ignore
window.store = store
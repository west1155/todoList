import {tasksReducer} from "./model/tasks-reducer";
import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./model/todolist-reducer";


const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>




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
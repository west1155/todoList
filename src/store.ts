import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { todolistsSlice } from "./model/todoList-slice";
import { tasksSlice } from "./model/tasks-slice";
import { authSlice } from "./model/auth-slice";

const rootReducer = combineReducers({
  todoLists: todolistsSlice.reducer,
  tasks: tasksSlice.reducer,
  auth: authSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// @ts-ignore
window.store = store;

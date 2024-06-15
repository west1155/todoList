import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {todolistAPI, UpdateTaskModelType} from "../api/todolist-api";
import {initialStateTask} from "./initialState";
import {TaskType} from "../AppWithRedux";
import {AppRootStateType} from "../store";

export type TasksStateType = {
    [key: string]: TaskType[];
};

export const fetchTasksThunk = createAsyncThunk(
    'tasks/fetchTasks',
    async (todolistId: string, {dispatch, rejectWithValue}) => {
        try {
            const response = await todolistAPI.getTasks(todolistId);
            const tasks = response.data.items.map((task: any) => ({
                ...task,
                isDone: task.status !== 0
            }));
            return {todolistId, tasks};
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const addTaskThunk = createAsyncThunk(
    'tasks/addTask',
    async (param: { todolistId: string, title: string }, {dispatch, rejectWithValue}) => {
        try {
            const response = await todolistAPI.createTask(param.todolistId, param.title);
            return {todolistId: param.todolistId, task: response.data.data.item};
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const changeTaskStatusThunk = createAsyncThunk(
    'tasks/changeTaskStatus',
    async (param: { todolistId: string, taskId: string, taskStatus: boolean }, {getState, rejectWithValue}) => {
        try {

            const state = getState() as AppRootStateType;
            const task = state.tasks[param.todolistId].find(task => task.id === param.taskId);

            const updatedTask: UpdateTaskModelType = {
                title: task?.title || '',
                description: '',
                completed: param.taskStatus,
                status: param.taskStatus ? 1 : 0,
                priority: 0,
                startDate: '',
                deadline: ''
            };

            await todolistAPI.updateTask(param.todolistId, param.taskId, updatedTask);
            return {todolistId: param.todolistId, taskId: param.taskId, taskStatus: param.taskStatus};
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const changeTaskTitleThunk = createAsyncThunk(
    'tasks/changeTaskTitle',
    async (param: { todolistId: string, taskId: string, title: string }, {dispatch, rejectWithValue}) => {
        try {
            await todolistAPI.updateTask(param.todolistId, param.taskId, {
                title: param.title,
                description: '',
                completed: false,
                status: 0,
                priority: 0,
                startDate: '',
                deadline: ''
            });
            return {todolistId: param.todolistId, taskId: param.taskId, title: param.title};
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const removeTaskThunk = createAsyncThunk(
    'tasks/removeTask',
    async (param: { todolistId: string, taskId: string }, {dispatch, rejectWithValue}) => {
        try {
            await todolistAPI.deleteTask(param.todolistId, param.taskId);
            return {todolistId: param.todolistId, taskId: param.taskId};
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialStateTask as TasksStateType,
    reducers: {
        changeTaskTitle(state, action: PayloadAction<{ todolistId: string, taskId: string, title: string }>) {
            const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId);
            if (task) {
                task.title = action.payload.title;
            }
        },
        setTasks(state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) {
            state[action.payload.todolistId] = action.payload.tasks;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasksThunk.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks;
            })
            .addCase(addTaskThunk.fulfilled, (state, action) => {
                state[action.payload.todolistId].push(action.payload.task);
            })
            .addCase(removeTaskThunk.fulfilled, (state, action) => {
                state[action.payload.todolistId] = state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId);
            })
            .addCase(changeTaskStatusThunk.fulfilled, (state, action) => {
                const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId);
                if (task) {
                    task.isDone = action.payload.taskStatus;
                }
            });
    }

});

export const {
    setTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;

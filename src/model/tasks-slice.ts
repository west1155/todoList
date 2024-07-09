import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { todolistAPI, UpdateTaskModelType } from "../api/todolist-api";
import { TaskType } from "../AppWithRedux";
import { AppRootStateType } from "../store";
import { initialTaskState } from "./initialState";
import axios, { AxiosError } from "axios";

type FetchTasksThunkReturn = { todolistId: string; tasks: TaskType[] };

interface APIError {
  message: string;
  status: number;
}

export const fetchTasksThunk = createAsyncThunk(
  "tasks/fetchTasks",
  async (todolistId: string, thunkAPI) => {
    try {
      const response = await todolistAPI.getTasks(todolistId);
      const tasks: TaskType[] = response.data.items.map((task: TaskType) => ({
        ...task,
        isDone: task.status !== 0,
      }));
      return { todolistId, tasks };
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>;
      if (axios.isAxiosError(err)) {
        const error = err.response?.data
          ? err.response.data.error
          : err.message;
        return thunkAPI.rejectWithValue(error);
      } else {
        const error: APIError = {
          message: err.message,
          status: 500,
        };
        return thunkAPI.rejectWithValue(error);
      }
    }
  },
);

export const addTaskThunk = createAsyncThunk(
  "tasks/addTask",
  async (
    param: { todolistId: string; title: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = await todolistAPI.createTask(
        param.todolistId,
        param.title,
      );
      return { todolistId: param.todolistId, task: response.data.data.item };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const changeTaskStatusThunk = createAsyncThunk(
  "tasks/changeTaskStatus",
  async (
    param: { todolistId: string; taskId: string; taskStatus: boolean },
    { getState, rejectWithValue },
  ) => {
    try {
      const state = getState() as AppRootStateType;
      const task = state.tasks.tasks[param.todolistId].find(
        (task: TaskType) => task.id === param.taskId,
      );

      const updatedTask: UpdateTaskModelType = {
        title: task?.title || "",
        description: "",
        completed: param.taskStatus,
        status: param.taskStatus ? 1 : 0,
        priority: 0,
        startDate: "",
        deadline: "",
      };

      await todolistAPI.updateTask(param.todolistId, param.taskId, updatedTask);
      return {
        todolistId: param.todolistId,
        taskId: param.taskId,
        taskStatus: param.taskStatus,
      };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const changeTaskTitleThunk = createAsyncThunk(
  "tasks/changeTaskTitle",
  async (
    param: { todolistId: string; taskId: string; title: string },
    { getState, rejectWithValue },
  ) => {
    try {
      const state = getState() as AppRootStateType;
      const task = state.tasks.tasks[param.todolistId].find(
        (task: TaskType) => task.id === param.taskId,
      );

      const updatedTask: UpdateTaskModelType = {
        title: param.title,
        description: "",
        completed: task?.isDone || false,
        status: task?.isDone ? 1 : 0,
        priority: 0,
        startDate: "",
        deadline: "",
      };

      await todolistAPI.updateTask(param.todolistId, param.taskId, updatedTask);
      return {
        todolistId: param.todolistId,
        taskId: param.taskId,
        title: param.title,
      };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const removeTaskThunk = createAsyncThunk(
  "tasks/removeTask",
  async (
    param: { todolistId: string; taskId: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      await todolistAPI.deleteTask(param.todolistId, param.taskId);
      return { todolistId: param.todolistId, taskId: param.taskId };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialTaskState,
  reducers: {
    setTasks(
      state,
      action: PayloadAction<{ todolistId: string; tasks: TaskType[] }>,
    ) {
      state.tasks[action.payload.todolistId] = action.payload.tasks;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchTasksThunk.fulfilled,
        (
          state: any,
          action: PayloadAction<{ todolistId: string; tasks: TaskType[] }>,
        ) => {
          state.tasks[action.payload.todolistId] = action.payload.tasks;
        },
      )

      .addCase(fetchTasksThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(addTaskThunk.fulfilled, (state: any, action: any) => {
        state.tasks[action.payload.todolistId].push(action.payload.task);
      })
      .addCase(addTaskThunk.rejected, (state: any, action: any) => {
        state.error = action.payload as string;
      })

      .addCase(removeTaskThunk.fulfilled, (state: any, action: any) => {
        state.tasks[action.payload.todolistId] = state.tasks[
          action.payload.todolistId
        ].filter((task: any) => task.id !== action.payload.taskId);
      })
      .addCase(removeTaskThunk.rejected, (state: any, action: any) => {
        state.error = action.payload as string;
      })

      .addCase(changeTaskStatusThunk.fulfilled, (state: any, action: any) => {
        const task = state.tasks[action.payload.todolistId].find(
          (task: any) => task.id === action.payload.taskId,
        );
        if (task) {
          task.isDone = action.payload.taskStatus;
        }
      })
      .addCase(changeTaskStatusThunk.rejected, (state: any, action: any) => {
        state.error = action.payload as string;
      })

      .addCase(changeTaskTitleThunk.fulfilled, (state: any, action: any) => {
        const task = state.tasks[action.payload.todolistId].find(
          (task: any) => task.id === action.payload.taskId,
        );
        if (task) {
          task.title = action.payload.title;
        }
      })

      .addCase(changeTaskTitleThunk.rejected, (state: any, action: any) => {
        state.error = action.payload as string;
      })

      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state: any) => {
          state.status = "succeeded";
        },
      )
      .addMatcher(
        (action: any) => action.type.endsWith("/rejected"),
        (state: any) => {
          state.status = "failed";
        },
      );
  },
});

export const { setTasks } = tasksSlice.actions;

export default tasksSlice.reducer;

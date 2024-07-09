import axios from "axios";
import { TaskType } from "../AppWithRedux";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "8eff557a-8ac7-4b98-9f77-a367b3bd0ca3",
  },
});

type TodolistType = {
  id: string;
  addedDate?: string;
  order?: number;
  title: string;
};

type FieldErrorType = {
  error: string;
  field: string;
};

export type UpdateTaskModelType = {
  title: string;
  description: string | "";
  completed: boolean | false;
  status: number | 0;
  priority: number | 0;
  startDate: string | "";
  deadline: string | "";
};

export type ResponseType<D = {}> = {
  //generic type for response, where D = {} means that by default is D
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldErrorType[];
  data: D;
};

type GetTasksResponse = {
  items: TaskType[];
  totalCount: number;
  error: string | null;
};

export const authAPI = {
  login(email: string, password: string) {
    return instance.post<ResponseType<{ userId: number }>>("auth/login", {
      email,
      password,
    });
    debugger;
  },
  logout() {
    return instance.delete<ResponseType>("auth/login");
  },
  me() {
    return instance.get<
      ResponseType<{ id: number; email: string; login: string }>
    >("auth/me");
  },
};

export const todolistAPI = {
  getTodoLists: async () => {
    return instance.get("todo-lists");
  },
  createTodolist: async (title: string) => {
    return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {
      title,
    });
  },
  deleteTodolist: async (todolistId: string) => {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
  },
  updateTodolist: async (todolistId: string, title: string) => {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title });
  },

  //WORK WITH TASKS
  getTask(todolistId: string, taskId: string) {
    return instance.get<{ item: TaskType }>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
    );
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(
      `todo-lists/${todolistId}/tasks`,
      { title },
    );
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
    );
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model,
    );
  },
};

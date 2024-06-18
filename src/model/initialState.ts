import {TaskType, TodoListType} from '../AppWithRedux'
import {TasksStateType} from "../components/todolist/TodoList";


export const initialTodoListsState: { status: RequestStatusType, todolists: TodoListType[], error: null | string } = {
    todolists: [],
    status: 'idle',
    error: null,
};

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type TasksStatusType = {
    tasks: TasksStateType;
    status: RequestStatusType;
    error: string | null;
};

export type InitialStateTaskType = {
    [key: string]: TaskType[];
};

export const initialTaskState: TasksStatusType = {
    tasks: {} as InitialStateTaskType,
    status: 'idle',
    error: null,
};





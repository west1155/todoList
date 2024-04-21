import {TasksStateType} from "../components/todolist/TodoList";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    payload: {
        taskId: string
        todolistId: string
    }
}

type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    payload: {
        taskId: string
        todolistId: string
    }
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    payload: {
        taskId: string
        title: string
        todolistId: string
    }
}

type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}


type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const todolistTasks = state[action.payload.todolistId];
            debugger
            state[action.payload.todolistId] = todolistTasks.filter(t => t.id !== action.payload.taskId);
            return ({...state});
        }
        case 'ADD-TASK': {
            const newTask = {id: [state[action.todolistId].length + 1].toString(), title: action.title, isDone: false};
            const todolistTasks = state[action.todolistId];
            state[action.todolistId] = [...todolistTasks, newTask];
            return ({...state});
        }
        case 'CHANGE-TASK-STATUS': {
            const todolistTasks = state[action.payload.todolistId];
            const task = todolistTasks.find(t => t.id === action.payload.taskId);
            if (task) {
                task.isDone = !task.isDone;
            }
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            const todolistTasks = state[action.payload.todolistId];
            const task = todolistTasks.find(t => t.id === action.payload.taskId);
            if (task) {
                task.title = action.payload.title;
            }
            return ({...state});
        }

        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.title]: []
            }
        }

        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }

        default:
            throw new Error("I don't understand this type")
    }
}
export const RemoveTaskAC = (taskId: string, todolistId: string ): ActionsType => {
    return { type: 'REMOVE-TASK', payload: { taskId, todolistId } } as const
}

export const AddTaskAC = (title: string, todolistId: string) => {
    return { type: 'ADD-TASK', title, todolistId } as const
}

export const ChangeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return { type: 'CHANGE-TASK-STATUS', payload: { taskId, isDone, todolistId } } as const
}

export const ChangeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return { type: 'CHANGE-TASK-TITLE', payload: { taskId, title, todolistId } } as const
}


export const AddTodolistAC = (title: string) => {
    return { type: 'ADD-TODOLIST', title } as const
}


export const RemoveTodolistAC = (todolistId: string) => {
    return { type: 'REMOVE-TODOLIST', id: todolistId } as const
}
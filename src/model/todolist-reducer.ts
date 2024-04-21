import {TodoListType} from "../App";
import {v1} from "uuid";
import {FilterValuesType} from "../components/todolist/TodoList";

type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

export type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

const initialState: TodoListType[] = [
    { id: v1(), title: 'What to learn', filter: 'All' },
    { id: v1(), title: 'What to buy', filter: 'All' },
]

export const todolistsReducer = (state: TodoListType[] = initialState, action: ActionsType) => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            const newTodolist: TodoListType = {
                id: v1(),
                title: action.title,
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
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId } as const
}

export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title } as const
}

export const ChangeTodoListTitleAC = (todolistID: string, title: string) : ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistID ,title: title} as const
}

export const ChangeTodoListFilterAC = (todolistID: string, filter: FilterValuesType) : ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistID ,filter: filter} as const
}
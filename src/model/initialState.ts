import {TodoListType} from "../AppWithReducers";
import {v1} from "uuid";
import {TasksStateType} from "../components/todolist/TodoList";


let todoListId1 = v1()
let todoListId2 = v1()
let todoListId3 = v1()
let todoListId4 = v1()
let todoListId5 = v1()
let todoListId6 = v1()

export const initialState: TodoListType[] = [
    { id: todoListId1, title: 'What to learn', filter: 'All' },
    { id: todoListId2, title: 'What to buy', filter: 'All' },
]

export const initialStateAfter: TodoListType[] = [
    { id: todoListId1, title: 'What to learn', filter: 'All' },
    { id: todoListId2, title: 'What to buy', filter: 'All' },
    { id: todoListId3, title: 'What to learncsd', filter: 'All' },
    { id: todoListId4, title: 'What to buyfsdafsd', filter: 'All' },
    { id: todoListId5, title: 'What to learngfdsgdfg', filter: 'All' },
    { id: todoListId6, title: 'What to buygfdsgfd', filter: 'All' },
]

export const initialStateTask: TasksStateType = {
    [todoListId1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ],
    [todoListId2]: [
        {id: v1(), title: 'bread', isDone: true},
        {id: v1(), title: 'milk', isDone: true},
        {id: v1(), title: 'tea', isDone: false},
    ]
}
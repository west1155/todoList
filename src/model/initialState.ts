import {TodoListType} from "../AppWithReducers";
import {v1} from "uuid";
import {TasksStateType} from "../components/todolist/TodoList";


let todoListId1 = v1()
let todoListId2 = v1()
export const initialState: TodoListType[] = [
    { id: todoListId1, title: 'What to learn', filter: 'All' },
    { id: todoListId2, title: 'What to buy', filter: 'All' },
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
import {v1} from "uuid";
import {TodoListType} from "../App";
import {
    AddTodolistAC,
    ChangeTodoListTitleAC,
    ChangeTodoListFilterAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./todolist-reducer";

let startState: TodoListType[]
let todolistId1: string
let todolistId2: string

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]
})
test('correct to do list should be removed', () => {


    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe('What to buy')
})


test ('a new todolist should be added', () => {
    let newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))


    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe('All')
    expect(endState[2].id).toBeDefined()
})


test ('TodoList 1 title should be changed to New TodoList', () => {
    let newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, ChangeTodoListTitleAC(todolistId1, newTodolistTitle))


    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[1].id).toBeDefined()
})


test ('Should change filter be changed to "Completed" in the first todolist', () => {

    const endState = todolistsReducer(startState, ChangeTodoListFilterAC(todolistId1, 'Completed'))

        expect(endState.length).toBe(2)
        expect(endState[0].filter).toBe('Completed')
        expect(endState[1].id).toBeDefined()
    })



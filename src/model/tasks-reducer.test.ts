import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    RemoveTodolistAC,
    tasksReducer
} from './tasks-reducer'
import { TasksStateType } from '../components/todolist/TodoList'
import {AddTodolistAC} from "./todolist-reducer";


let startState: TasksStateType
beforeEach(() => {
     startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

})


test('correct task should be deleted from correct array', () => {


    const endState = tasksReducer(startState, RemoveTaskAC('1', 'todolistId2'))

    expect(endState['todolistId2'].length).toBe(2)

    expect(endState).toStrictEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
})


test('correct task should be added to correct array', () => {

    const endState = tasksReducer(startState, AddTaskAC('milk3', 'todolistId2'))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('bread')
    expect(endState['todolistId2'][0].isDone).toBe(false)
    expect(endState['todolistId2'][3].title).toBe('milk3')
    console.log(endState['todolistId2'])
})


test('status of specified task should be changed', () => {


    const endState = tasksReducer(startState, ChangeTaskStatusAC('2', false, 'todolistId2'))

    // seems like startState will be changed by endState
    expect(startState['todolistId2'][0].isDone).toBe(false)
    expect(endState['todolistId2'][1].isDone).toBe(false)
    expect(endState['todolistId1']).toBe(startState['todolistId1'])
})


test('title tea should be changed to coffee in todolistId2', () => {


    const endState = tasksReducer(startState, ChangeTaskTitleAC('3', 'coffee', 'todolistId2'))

    expect(startState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][1].isDone).toBe(true)
    expect(endState['todolistId2'][2].title).toBe('coffee')
})


test('new array should be added when new todolist is added', () => {

    const action = AddTodolistAC('new todolist', '1')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
    console.log(keys)
})

test('property with todolistId should be deleted', () => {

    const endState = tasksReducer(startState, RemoveTodolistAC('todolistId2'))


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
    console.log(endState)
})


import {AddTodolistAC, todolistsReducer} from "./todolist-reducer";
import {ActionsType, tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../components/todolist/TodoList";
import {TodoListType} from "../AppWithReducers"
import {v1} from "uuid";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodoListType> = []
    const id = v1();
    const action: ActionsType = AddTodolistAC('new todolist', id)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.id)
    expect(idFromTodolists).toBe(action.payload.id)
})

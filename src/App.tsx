import React, {useState} from 'react';
import './App.css';
import {FilterValuesType, TasksStateType, Todolist} from "./components/todolist/TodoList";
import {v1} from "uuid";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}


function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todoLists, setTodoLists] = useState<TodoListType[]>([
        { id: todolistID1, title: 'What to learn', filter: 'All' },
        { id: todolistID2, title: 'What to buy', filter: 'All' },
    ])


    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: crypto.randomUUID(), title: 'Redux', isDone: true},
            {id: crypto.randomUUID(), title: 'JS', isDone: false},
            {id: crypto.randomUUID(), title: 'Redux', isDone: false},
            {id: crypto.randomUUID(), title: 'HTML', isDone: false},
            {id: crypto.randomUUID(), title: 'Rust', isDone: false}
        ],
        [todolistID2]: [
            {id: crypto.randomUUID(), title: 'Ace of Base', isDone: true},
            {id: crypto.randomUUID(), title: 'Lyrics', isDone: false}
        ]

    })

    const removeTodolist = (todolistId: string) => {
        const newTodolists = todoLists.filter(tl => tl.id !== todolistId)
        setTodoLists(newTodolists)

        //deletes tasks from task state and sets to the state
        delete tasks[todolistId]
        setTasks({...tasks})

    }



    const addTask = (title: string, todolistId: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        const newTodolistTasks = { ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] }
        setTasks(newTodolistTasks)
    }

    const removeTask = (taskId: string, todolistId: string) => {
        const newTodolistTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].filter(t => t.id !== taskId),
        }
        setTasks(newTodolistTasks)
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        const newTodolistTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? { ...t, isDone: taskStatus } : t)),
        }
        setTasks(newTodolistTasks)
    }
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodoLists(todoLists.map(tl => (tl.id === todolistId ? {...tl, filter} : tl)))
    }


    return (
        <div className="App">
            {todoLists.map(tl => {
                const allTodolistTasks = tasks[tl.id]
                let tasksForTodolist = allTodolistTasks

                if (tl.filter === 'Active') {
                    tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                }

                if (tl.filter === 'Completed') {
                    tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                }
                return <Todolist
                    removeTodolist={removeTodolist}
                    todoListId={tl.id}
                    key={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={tl.filter}
                />

            })}

        </div>
    );
}

export default App;

import s from './TodoList.module.css'
import {Button} from "./Button/Button";
import {ChangeEvent, useRef} from "react";
import {TaskType} from "../../App";


export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type TasksStateType = {
    [key: string]: TaskType[]
}


type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    todoListId: string
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    filter: string
}


export const Todolist = ({title, addTask, tasks, removeTask, changeFilter, changeTaskStatus, todoListId, removeTodolist}: TodolistPropsType) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const changeFilterTasksHandler = (filter: FilterValuesType, todolistId: string) => {
        changeFilter(filter, todolistId)
    }

    const addTaskHandler = (taskTitle: string, todolistId: string) => {
        taskTitle.trim() !== '' && addTask(taskTitle, todolistId)
        inputRef.current!.value = ''
    }


    return (
        <div className={s.todo}>
            <div className={s.title}>
                <h3>{title}</h3>
                <Button title={'X'} onClick={() => removeTodolist(todoListId)}/>
            </div>

            <div>
                <input
                    ref={inputRef}
                    onKeyUp={event => {
                        if (event.key === 'Enter') {
                            addTaskHandler(inputRef.current?.value as string, todoListId)
                        }

                    }}
                />
                <Button title={'+'} onClick={() => {
                    addTaskHandler(inputRef.current?.value as string, todoListId)
                }}/>
            </div>
            <ul className={s.list}>
                {tasks.length === 0 ? <li className={s.li}>Empty</li> :
                tasks.map(task => {
                    const removeTaskHandler = () => {
                        removeTask(task.id, todoListId)
                    }
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newStatusValue = e.currentTarget.checked
                        changeTaskStatus(task.id, newStatusValue, todoListId)
                    }

                    return <li className={s.li} key={task.id}>
                        <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                        <span>{task.title}</span>
                        <Button title={'X'} onClick={removeTaskHandler}></Button>
                    </li>
                    }
                )}
            </ul>
            <div>
                <Button title={'All'} onClick={() => {changeFilterTasksHandler('All',  todoListId)}}/>
                <Button title={'Active'} onClick={() => {changeFilterTasksHandler('Active', todoListId)}}/>
                <Button title={'Completed'} onClick={() => {changeFilterTasksHandler('Completed', todoListId)}}/>
            </div>
        </div>
    )
}
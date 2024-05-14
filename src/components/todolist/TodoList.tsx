import s from './TodoList.module.css'
import Button from "@mui/material/Button"
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'

import {TaskType} from "../../AppWithReducers";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import React, {ChangeEvent, useCallback} from "react";
import {filterButtonsContainerSx} from "./Todo.style";


export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type TasksStateType = {
    [key: string]: TaskType[]
}


export type TodolistPropsType = {
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
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


export const Todolist = React.memo(({
                             title, addTask, tasks, removeTask, changeFilter, changeTaskStatus,
                             todoListId, removeTodolist, updateTask, updateTodolist, filter, ...tl
                         }: TodolistPropsType) => {

    const changeFilterTasksHandler = (filter: FilterValuesType, todolistId: string) => {
        changeFilter(filter, todolistId)
    }

    const addTaskHandler = useCallback((taskTitle: string, todolistId: string) => {
        taskTitle.trim() !== '' && addTask(taskTitle, todolistId)
    },[])


    const addItem = useCallback((title: string) => {
        addTaskHandler(title, todoListId)},[])


    const updateTodolistHandler = useCallback((title: string) => {
        updateTodolist(todoListId, title)
    },[])


    const removeTodoListHandler = useCallback(() => {
        removeTodolist(todoListId)
    },[])

    let allTodolistTasks = tasks
    let tasksForTodolist = allTodolistTasks

    if (filter === 'Active') {
        tasksForTodolist = tasks.filter(item => !item.isDone)
    }

    if (filter === 'Completed') {
        tasksForTodolist = tasks.filter(item => item.isDone)
    }

    console.log('TodoList is called')

    return (
        <div className={s.todo}>
            <div className={s.title}>
                <h3><EditableSpan onChange={updateTodolistHandler} value={title}/></h3>
                <IconButton onClick={removeTodoListHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <Box sx={filterButtonsContainerSx}>{/*...*/}</Box>


            <div>
                <AddItemForm addItem={addItem}/>
            </div>
            <ul className={s.list}>
                {tasksForTodolist.length === 0 ? <li className={s.li}>Empty</li> : (
                    tasksForTodolist.map(task => {
                        const changeTaskTitleHandler = (title: string) => {
                            updateTask(todoListId, task.id, title);
                        };
                        const removeTaskHandler = () => {
                            removeTask(task.id, todoListId);
                        };
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked;
                            changeTaskStatus(task.id, newStatusValue, todoListId);
                        };

                        return (
                            <li key={task.id} className={s.listItem}>
                                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <EditableSpan onChange={changeTaskTitleHandler} value={task.title}/>
                                <IconButton onClick={removeTaskHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                            </li>
                        );
                    })
                )}
            </ul>

            <div>
                <Button
                    variant={title === 'All' ? 'outlined' : 'text'}
                    color={'inherit'}
                    onClick={() => changeFilterTasksHandler('All', todoListId)}
                >All
                </Button>
                <Button
                    variant={title === 'Active' ? 'outlined' : 'text'}
                    color={'primary'}
                    onClick={() => changeFilterTasksHandler('Active', todoListId)}
                >Active
                </Button>
                <Button
                    variant={title === 'Completed' ? 'outlined' : 'text'}
                    color={'secondary'}
                    onClick={() => changeFilterTasksHandler('Completed', todoListId)}
                >Completed
                </Button>

            </div>
        </div>
    )
})
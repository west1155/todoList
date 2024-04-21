import s from './TodoList.module.css'
import Button from "@mui/material/Button"
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import Checkbox from '@mui/material/Checkbox'

import {TaskType} from "../../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {ChangeEvent} from "react";
import {filterButtonsContainerSx} from "./Todo.style";


export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type TasksStateType = {
    [key: string]: TaskType[]
}


type TodolistPropsType = {
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


export const Todolist = ({
                             title, addTask, tasks, removeTask, changeFilter, changeTaskStatus,
                             todoListId, removeTodolist, updateTask, updateTodolist
                         }: TodolistPropsType) => {

    const changeFilterTasksHandler = (filter: FilterValuesType, todolistId: string) => {
        changeFilter(filter, todolistId)
    }

    const addTaskHandler = (taskTitle: string, todolistId: string) => {
        taskTitle.trim() !== '' && addTask(taskTitle, todolistId)
    }


    const addItem = (title: string) => {
        addTaskHandler(title, todoListId)
    }

    const updateTodolistHandler = (title: string) => {
        updateTodolist(todoListId, title)
    }


    const removeTodoListHandler = () => {
        removeTodolist(todoListId)
    }

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
                {tasks.length === 0 ? <li className={s.li}>Empty</li> : (<List>
                    {
                        tasks.map(task => {

                                const changeTaskTitleHandler = (title: string) => {
                                    updateTask(todoListId, task.id, title)
                                }
                                const removeTaskHandler = () => {
                                    removeTask(task.id, todoListId)
                                }
                                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    const newStatusValue = e.currentTarget.checked
                                    changeTaskStatus(task.id, newStatusValue, todoListId)
                                }

                                return (<ListItem key={task.id}
                                                  sx={{
                                                      p: 0,
                                                      justifyContent: 'space-between',
                                                      opacity: task.isDone ? 0.5 : 1,
                                                  }}>
                                    <li className={s.li} key={task.id}>
                                        <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                        <EditableSpan onChange={changeTaskTitleHandler} value={task.title}/>
                                        <IconButton onClick={removeTaskHandler}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </li>
                                </ListItem>)
                            }
                        )}
                </List>)}
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
}
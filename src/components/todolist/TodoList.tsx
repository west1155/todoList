import s from './TodoList.module.css'
import Button from "@mui/material/Button"
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box'
import {Task} from "./Task";
import {TaskType} from '../../AppWithRedux'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import React, {ChangeEvent, useCallback, useEffect} from "react";
import {filterButtonsContainerSx} from "./Todo.style";
import {LinearProgress} from "@mui/material";
import {fetchTasksThunk, setTasks} from "../../model/tasks-slice";
import {useDispatch} from "react-redux";

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type TasksStateType = {
    [key: string]: TaskType[]
}


export type TodolistPropsType = {
    updateTodolist: (todolistId: string, title: string) => void
    titleTodo: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    todoListId: string
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    filter: string
}



export const Todolist = React.memo(({
                             titleTodo, addTask, tasks, removeTask, changeFilter, changeTaskStatus,
                            changeTaskTitle, todoListId, removeTodolist, filter, updateTodolist
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

    const removeTodoListHandler = useCallback(() => {
        removeTodolist(todoListId)
    },[])

    let allTodolistTasks = tasks || []
    let tasksForTodolist = allTodolistTasks

    if (filter === 'Active') {
        tasksForTodolist = tasks.filter(item => !item.isDone)
    }

    if (filter === 'Completed') {
        tasksForTodolist = tasks.filter(item => item.isDone)
    }

    return (
        <div className={s.todo}>
            <LinearProgress />
            <div className={s.title}>
                <h3><EditableSpan todoListId={todoListId} updateTodoList={updateTodolist} value={titleTodo}/></h3>
                <IconButton onClick={removeTodoListHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <Box sx={filterButtonsContainerSx}>{/*...*/}</Box>


            <div>
                <AddItemForm addItem={addItem}/>
            </div>
            <ul className={s.list}>
                {
                    (tasksForTodolist && tasksForTodolist.length === 0) ? <li className={s.li}>Empty</li> : (
                    tasksForTodolist.map(task => {


                        const removeTaskHandler = () => {
                            removeTask(task.id, todoListId);
                        };
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked;
                            changeTaskStatus(task.id, newStatusValue, todoListId);
                        };


                        return (
                            <li key={task.id} className={s.li}>
                                <Task
                                    todoListId={todoListId}
                                    taskId={task.id}
                                    title={task.title}
                                    isDone={task.isDone}
                                    removeTask={removeTaskHandler}
                                    changeTaskStatus={changeTaskStatusHandler}
                                    changeTaskTitle={changeTaskTitle}
                                />
                            </li>
                        );
                    })
                )}
            </ul>

            <div>
                <Button
                    variant={titleTodo === 'All' ? 'outlined' : 'text'}
                    color={'inherit'}
                    onClick={() => changeFilterTasksHandler('All', todoListId)}
                >All
                </Button>
                <Button
                    variant={titleTodo === 'Active' ? 'outlined' : 'text'}
                    color={'primary'}
                    onClick={() => changeFilterTasksHandler('Active', todoListId)}
                >Active
                </Button>
                <Button
                    variant={titleTodo === 'Completed' ? 'outlined' : 'text'}
                    color={'secondary'}
                    onClick={() => changeFilterTasksHandler('Completed', todoListId)}
                >Completed
                </Button>

            </div>
        </div>
    )

})
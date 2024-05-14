import React, {useCallback, useState} from 'react';
import './App.css';
import {FilterValuesType, Todolist} from "./components/todolist/TodoList";
import { TasksStateType } from './components/todolist/TodoList'
import {AddItemForm} from "./components/todolist/AddItemForm";
import {AppBar, Container, createTheme, Grid, ThemeProvider} from "@mui/material";
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Paper from '@mui/material/Paper'
import {MenuButton} from "./components/todolist/MenuButton";
import CssBaseline from '@mui/material/CssBaseline'
import Switch from '@mui/material/Switch'
import {
    AddTodolistAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodolistAC,
} from "./model/todolist-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./model/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {TodoListType} from "./AppWithReducers";
import {AppRootStateType} from "./store";


type ThemeMode = 'dark' | 'light'


function AppWithRedux () {


    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType> (state => state.tasks)


    const dispatch = useDispatch()


    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const removeTodolist = useCallback((todolistId: string) => {
        const action = RemoveTodolistAC(todolistId)
        dispatch(action)
        //deletes tasks from task state and sets to the state
    },[])

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#087EA4',
            },
        },
    })

    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const addTask = useCallback((title: string, todolistId: string) => {
        const action = AddTaskAC(title, todolistId)
        dispatch(action)
    },[])

    const updateTask = useCallback((todolistId: string, taskId: string, title: string) => {
        const action = ChangeTaskTitleAC(todolistId, taskId, title)
        dispatch(action)
    }, [])

    const updateTodolist = useCallback((todolistId: string, title: string) => {
        const action = ChangeTodoListTitleAC(todolistId, title)
        dispatch(action)
    }, [])

    const addTodolist = useCallback((title: string, id: string) => {
        const action = AddTodolistAC(title, id)
        dispatch(action)
    }, [])

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        const action = RemoveTaskAC(taskId, todolistId)
        dispatch(action)
    },[])

    const changeTaskStatus = useCallback((taskId: string, taskStatus: boolean, todolistId: string) => {
        const action = ChangeTaskStatusAC(taskId, taskStatus, todolistId)
        dispatch(action)
    },[])

    const changeFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
        const action = ChangeTodoListFilterAC(todolistId, filter)
        dispatch(action)
    },[])


    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <div>
                            <MenuButton>Login</MenuButton>
                            <MenuButton>Logout</MenuButton>
                            <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                            <Switch color={'default'} onChange={changeModeHandler} />
                        </div>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container sx={{mb: '30px'}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todoLists.map(tl => {
                                const allTodolistTasks = tasks[tl.id]

                                let tasksForTodolist = allTodolistTasks


                                if (tl.filter === 'Active') {
                                    tasksForTodolist = allTodolistTasks.filter(item => !item.isDone)
                                }

                                if (tl.filter === 'Completed') {
                                    tasksForTodolist = allTodolistTasks.filter(item => item.isDone)
                                }
                                return (

                                    <Grid key={tl.id}>

                                        <Paper sx={{p: '0 20px 20px 20px'}}>
                                            <Todolist
                                                updateTodolist={updateTodolist}
                                                updateTask={updateTask}
                                                filter={tl.filter}
                                                changeTaskStatus={changeTaskStatus}
                                                removeTask={removeTask}
                                                removeTodolist={removeTodolist}
                                                changeFilter={changeFilter}
                                                tasks={tasksForTodolist}
                                                title={tl.title}
                                                todoListId={tl.id}
                                                key={tl.id}
                                                addTask={addTask}
                                            />
                                        </Paper>
                                    </Grid>

                                )
                            }
                        )}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>

    );
}

export default AppWithRedux;

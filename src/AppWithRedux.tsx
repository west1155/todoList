import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {FilterValuesType, Todolist} from "./components/todolist/TodoList";
import {TasksStateType} from './components/todolist/TodoList'
import {AddItemForm} from "./components/todolist/AddItemForm";
import {AppBar, Container, createTheme, Grid, LinearProgress, ThemeProvider} from "@mui/material";
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Paper from '@mui/material/Paper'
import {MenuButton} from "./components/todolist/MenuButton";
import CssBaseline from '@mui/material/CssBaseline'
import Switch from '@mui/material/Switch'
import {todolistThunks} from "./model/todolist-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./model/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {TodoListType} from "./AppWithReducers";
import {AppDispatch, AppRootStateType} from "./store";
import {RequestStatusType} from "./model/app-reducer";


type ThemeMode = 'dark' | 'light'


function AppWithRedux() {

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')


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

    const dispatch = useDispatch<AppDispatch>()
    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const status = useSelector<AppRootStateType, string>(state => state.app.status)



    /*-----------TODOLISTS----------------*/

    const addTodolist = useCallback((title: string, id: string) => {
        dispatch(todolistThunks.addTodolistThunk(title))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(todolistThunks.removeTodolistThunk(todolistId))
    }, [dispatch])

    const updateTodolist = useCallback((todolistId: string, title: string) => {
        dispatch(todolistThunks.updateTodolistTitleThunk({todolistId, title}))
    }, [])

    const changeFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
        dispatch(todolistThunks.updateTodolistFilterThunk({todolistId, filter}))
    }, [dispatch])


    /*-----------TASKS----------------*/

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        const action = RemoveTaskAC(taskId, todolistId)
        dispatch(action)
    }, [])

    const changeTaskStatus = useCallback((taskId: string, taskStatus: boolean, todolistId: string) => {
        const action = ChangeTaskStatusAC(taskId, taskStatus, todolistId)
        dispatch(action)
    }, [])

    const addTask = useCallback((title: string, todolistId: string) => {
        const action = AddTaskAC(title, todolistId)
        dispatch(action)
    }, [])

    const updateTask = useCallback((taskId: string, title: string, todolistId: string) => {
        const action = ChangeTaskTitleAC(taskId, title, todolistId)
        dispatch(action)
    }, [])


    useEffect(() => {
        dispatch(todolistThunks.fetchTodolistsThunk())
    }, [dispatch])

    /*-----------APP--------------------*/

    const changeLoadingStatus = () => {
        dispatch({type: 'APP/SET-STATUS'})
    }

    return (
        <div>
            <button onClick={changeLoadingStatus}>Toggle Loading</button>
            {status === 'loading' && <LinearProgress/>}
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <div>
                            <MenuButton>Login</MenuButton>
                            <MenuButton>Logout</MenuButton>
                            <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                            <Switch color={'default'} onChange={changeModeHandler}/>
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
                                                filter={tl.filter}
                                                changeTaskStatus={changeTaskStatus}
                                                removeTask={removeTask}
                                                removeTodolist={removeTodolist}
                                                changeFilter={changeFilter}
                                                tasks={tasksForTodolist}

                                                titleTodo={tl.title}
                                                todoListId={tl.id}
                                                changeTaskTitle={updateTask}

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

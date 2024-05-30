import React, {useReducer, useState} from 'react';
import './App.css';
import {FilterValuesType, Todolist} from "./components/todolist/TodoList";
import {v1} from "uuid";
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
    todolistsReducer
} from "./model/todolist-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./model/tasks-reducer";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: string
}


type ThemeMode = 'dark' | 'light'


function AppWithReducers() {

    let todolistID1 = v1()
    let todolistID2 = v1()


    let [todoLists, dispatchTotoDodoList] = useReducer(todolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])


    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'Redux', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'Rust', isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: 'Ace of Base', isDone: true},
            {id: v1(), title: 'Lyrics', isDone: false}
        ]

    })

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const removeTodolist = (todolistId: string) => {
        const action = RemoveTodolistAC(todolistId)
        dispatchTotoDodoList(action)
        //deletes tasks from task state and sets to the state
    }

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

    const addTask = (title: string, todolistId: string) => {
        const action = AddTaskAC(title, todolistId)
        dispatchToTasks(action)
    }

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        const action = ChangeTaskTitleAC(todolistId, taskId, title)
        dispatchToTasks(action)
    }

    const updateTodolist = (todolistId: string, title: string) => {
        const action = ChangeTodoListTitleAC(todolistId, title)
        dispatchTotoDodoList(action)
    }

    const addTodolist = (title: string, id: string) => {
        const action = AddTodolistAC(title, id)
        dispatchTotoDodoList(action)
    }

    const removeTask = (taskId: string, todolistId: string) => {
        const action = RemoveTaskAC(taskId, todolistId)
        dispatchToTasks(action)
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        const action = ChangeTaskStatusAC(taskId, taskStatus, todolistId)
        dispatchToTasks(action)
    }
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        const action = ChangeTodoListFilterAC(todolistId, filter)
        dispatchTotoDodoList(action)
    }


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

                                        <Paper key={tl.id} sx={{p: '0 20px 20px 20px'}}>
                                            {/*<Todolist
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
                                            />*/}
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

export default AppWithReducers;

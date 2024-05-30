import React, {useState} from 'react';
import './App.css';
import {FilterValuesType, TasksStateType, Todolist} from "./components/todolist/TodoList";
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
import {TodoListType} from "./AppWithReducers";


type ThemeMode = 'dark' | 'light'


function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])


    const [tasks, setTasks] = useState<TasksStateType>({
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
        const newTodoLists = todoLists.filter(tl => tl.id !== todolistId)
        setTodoLists(newTodoLists)

        //deletes tasks from task state and sets to the state
        delete tasks[todolistId]
        setTasks({...tasks})

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
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        const newTodolistTasks = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
        setTasks(newTodolistTasks)
    }

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        const newTodolistTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? {...t, title} : t)),
        }
        setTasks(newTodolistTasks)
    }

    const updateTodolist = (todolistId: string, title: string) => {
        setTodoLists(todoLists.map(tl => (tl.id === todolistId ? {...tl, title} : tl)))
    }

    const addTodolist = (title: string) => {
        const todolistId = v1()
        const newTodolist: TodoListType = {id: todolistId, title: title, filter: 'All'}
        setTodoLists([newTodolist, ...todoLists])
        setTasks({...tasks, [todolistId]: []})
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
            [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? {...t, isDone: taskStatus} : t)),
        }
        setTasks(newTodolistTasks)
    }
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodoLists(todoLists.map(tl => (tl.id === todolistId ? {...tl, filter} : tl)))
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
                                let tasksForTodolist = tasks[tl.id]
                                return (

                                    <Grid>

                                        <Paper sx={{p: '0 20px 20px 20px'}}>
                                           {/* <Todolist
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
export default App

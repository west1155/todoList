import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { FilterValuesType, Todolist } from "./components/todolist/TodoList";
import { TasksStateType } from "./components/todolist/TodoList";
import { AddItemForm } from "./components/todolist/AddItemForm";
import {
  AppBar,
  CircularProgress,
  Container,
  createTheme,
  Grid,
  ThemeProvider,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Paper from "@mui/material/Paper";
import { MenuButton } from "./components/todolist/MenuButton";
import CssBaseline from "@mui/material/CssBaseline";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootStateType } from "./store";
import {
  addTaskThunk,
  changeTaskStatusThunk,
  changeTaskTitleThunk,
  removeTaskThunk,
} from "./model/tasks-slice";
import {
  addTodolistTC,
  changeTodolistTitleTC,
  fetchTodolistsThunk,
  removeTodolistTC,
  todolistsSlice,
} from "./model/todoList-slice";
import { ErrorSnackbar } from "./components/ErrorSnackbar/ErrorSnackbar";

type ThemeMode = "dark" | "light";

export type TaskType = {
  id: string;
  title: string;
  status: number;
  isDone: boolean;
};

export type TodoListType = {
  id: string;
  title: string;
  filter: string;
};

function AppWithRedux() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  const theme = createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      primary: {
        main: "#087EA4",
      },
    },
  });

  const changeModeHandler = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  const dispatch = useDispatch<AppDispatch>();
  const todoLists = useSelector<AppRootStateType, TodoListType[]>(
    (state) => state.todoLists.todolists,
  );
  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks.tasks,
  );
  const status = useSelector<AppRootStateType, string>(
    (state) => state.tasks.status,
  );

  /*-----------TODOLISTS----------------*/

  const addTodolist = useCallback(
    (title: string, id: string) => {
      dispatch(addTodolistTC(title));
    },
    [dispatch],
  );

  const removeTodolist = useCallback(
    (todolistId: string) => {
      dispatch(removeTodolistTC(todolistId));
    },
    [dispatch],
  );

  const updateTodolist = useCallback(
    (todolistId: string, title: string) => {
      dispatch(changeTodolistTitleTC({ id: todolistId, title }));
    },
    [dispatch],
  );

  const changeFilter = useCallback(
    (filter: FilterValuesType, todolistId: string) => {
      dispatch(
        todolistsSlice.actions.changeTodolistFilterReducer({
          id: todolistId,
          filter,
        }),
      );
    },
    [dispatch],
  );

  /*-----------TASKS----------------*/

  const removeTask = useCallback(
    (taskId: string, todolistId: string) => {
      const action = removeTaskThunk({ taskId, todolistId });
      dispatch(action);
    },
    [dispatch],
  );

  const changeTaskStatus = useCallback(
    (taskId: string, taskStatus: boolean, todolistId: string) => {
      const action = changeTaskStatusThunk({ taskId, taskStatus, todolistId });
      dispatch(action);
    },
    [dispatch],
  );

  const addTask = useCallback(
    (title: string, todolistId: string) => {
      const action = addTaskThunk({ todolistId, title });
      dispatch(action);
    },
    [dispatch],
  );

  const updateTask = useCallback(
    (taskId: string, title: string, todolistId: string) => {
      const action = changeTaskTitleThunk({ taskId, title, todolistId });
      dispatch(action);
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(fetchTodolistsThunk());
  }, [dispatch]);

  /*-----------APP--------------------*/
  if (status === "loading") {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" sx={{ mb: "30px" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <div>
              <MenuButton>Login</MenuButton>
              <MenuButton>Logout</MenuButton>
              <MenuButton background={theme.palette.primary.dark}>
                Faq
              </MenuButton>
              <Switch color={"default"} onChange={changeModeHandler} />
            </div>
          </Toolbar>
        </AppBar>
        <Container fixed>
          <Grid container sx={{ mb: "30px" }}>
            <AddItemForm addItem={addTodolist} />
          </Grid>
          <Grid container spacing={4}>
            {todoLists.map((tl) => {
              const allTodolistTasks = tasks[tl.id];

              let tasksForTodolist = allTodolistTasks;

              if (tl.filter === "Active") {
                tasksForTodolist = allTodolistTasks.filter(
                  (item) => !item.isDone,
                );
              }

              if (tl.filter === "Completed") {
                tasksForTodolist = allTodolistTasks.filter(
                  (item) => item.isDone,
                );
              }
              return (
                <Grid key={tl.id}>
                  <Paper sx={{ p: "0 20px 20px 20px" }}>
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
              );
            })}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default AppWithRedux;

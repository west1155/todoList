import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authAPI } from "../api/todolist-api";
import { fetchTodolistsThunk } from "../model/todoList-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

// Slice

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    param: { email: string; password: string },
    { dispatch: Dispatch },
  ) => {
    const response = await authAPI.login(param.email, param.password);
    return response.data;
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoggedIn = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoggedIn = false;
      });
  },
});

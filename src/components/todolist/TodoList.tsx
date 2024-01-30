import React from 'react';
import styled from "styled-components";
import {TodoListDesktop} from "./TodoListDesktop";

export const TodoList = () => {
    return (
        <StyledTodoList>
            <TodoListDesktop/>
            <TodoListDesktop/>
            <TodoListDesktop/>

        </StyledTodoList>
    );
};


const StyledTodoList = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-grow: 1; // proportion of the available space that should be taken up by the flex item
  align-items: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;


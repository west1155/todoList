import React from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoList} from "./components/todolist/TodoList";

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;

import React, {useState} from 'react';
import {FlexWrapper} from "../FlexWrapper";
import {Button} from "../Button";
import {TodoListHeader} from "./TodoListHeader";
import {AddTaskForm} from "./AddTaskForm";
import {Task, TaskType} from "../Task";


type TodoListDesktopPropsType = {

}

export const TodoListDesktop: React.FC<TodoListDesktopPropsType> = () => {

    const [tasks, setTasks] = useState<Array<TaskType>>([
            {id:1, title: 'HTML', isDone: true},
            {id:2, title: 'JS', isDone: false},
            {id:3, title: 'REACT', isDone: false}
    ])

    const removeTask = (taskId: number) => {
        const nextState: Array<TaskType> = tasks.filter(task => task.id !== taskId)
        setTasks(nextState)
    }

    const addTask = (task: TaskType) => {
        setTasks([task, ...tasks])
    }


    const todoListHeader = 'What to Learn'

    return (
        <FlexWrapper direction={'column'}>
            <TodoListHeader title={todoListHeader}/>
            <AddTaskForm addTask={addTask}/>

            <ul>
                {tasks.map((task)=> <Task id={task.id} title={task.title} isDone={task.isDone} removeTask={removeTask} />)}
            </ul>
            <div>
                <Button name={'All'} />
                <Button name={'Active'}/>
                <Button name={'Completed'}/>
            </div>
        </FlexWrapper>

    );
};


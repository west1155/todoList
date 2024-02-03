import React from 'react';
import {Button} from "../Button";
import {TaskType} from "../Task";

type AddFormPropsType = {

    addTask: (task: TaskType) => void
}

export const AddTaskForm: React.FC<AddFormPropsType> = ({addTask}) => {
    const [title, setTitle] = React.useState<string>('');
    const onChangeHandler = (event : React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }

    const task: TaskType = {
        id: new Date().getTime(),
        title: title,
        isDone: false
    }

    const onButtonClickHandler = () => {
        addTask(task)
        setTitle('')
    }

    return (<div>
            <input onChange={onChangeHandler}/>
            <Button name={'+'} callback={onButtonClickHandler}/>
        </div>);
};

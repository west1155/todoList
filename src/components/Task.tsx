import React from 'react';
import {Button} from "./Button";



export type TaskType = {
    id: number
    title: string,
    isDone: boolean,
    removeTask?: (id: number) => void
}
export const Task: React.FC<TaskType> = (props) => {
    return ( <li>
        <input type='checkbox' checked={props.isDone}/> <span>{props.title}</span>
        <Button name={'X'} callback={()=>{
            if(props.removeTask) props.removeTask(props.id)}
        }/>
    </li>);
};


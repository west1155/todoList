import React, {ChangeEvent, useState} from "react";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";


type TaskPropsType = {
    title: string
    isDone: boolean
    taskId: string
    todoListId: string
    removeTask: () => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (e: ChangeEvent<HTMLInputElement>) => void
}


export const Task = (({title, taskId, removeTask, isDone, changeTaskStatus, changeTaskTitle, todoListId}: TaskPropsType) => {


        return (
            <div>
                <Checkbox checked={isDone} onChange={changeTaskStatus}/>
                <EditableSpan changeTaskTitle={changeTaskTitle} todoListId={todoListId} taskId={taskId} value={title}/>
                <IconButton onClick={removeTask}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        )


})
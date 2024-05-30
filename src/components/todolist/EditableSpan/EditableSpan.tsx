import {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

export type EditableSpanPropsType = {
    value: string
    taskId?: string
    todoListId: string
    changeTaskTitle?: (taskId: string, title: string, todolistId: string) => void
    updateTodoList?: (todolistId: string, title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.value)

    const activateEditModeHandler = () => {
        setEditMode(true)
    }

    const deactivateEditModeHandler = () => {
        setEditMode(false)
        if (props.taskId) props.changeTaskTitle && props.changeTaskTitle(props.taskId, title, props.todoListId)
        props.updateTodoList && props.updateTodoList(props.todoListId, title)
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)

    }

    return (
        <>
            {editMode ? (
                <TextField
                    variant={'outlined'}
                    value={title}
                    size={'small'}
                    onChange={changeTitleHandler}
                    onBlur={deactivateEditModeHandler}
                    onKeyUp={(e) => e.key === 'Enter' && deactivateEditModeHandler()}
                    autoFocus
                />
            ) : (
                <span onDoubleClick={activateEditModeHandler}>{props.value}</span>
            )}
        </>
    )
}
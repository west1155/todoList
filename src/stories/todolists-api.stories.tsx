import React, {useEffect, useState} from 'react'
import {todolistAPI} from '../api/todolist-api';
export default {
    title: 'API',
}

//WORK WITH TODOLIST
export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodoLists().then((res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const createNewTodolist = () => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data);
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'title for new todolist'} onChange={e => setTitle(e.currentTarget.value)}/>
            <button onClick={createNewTodolist}>create todolist</button>
        </div>
    </div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const deleteTodoL = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }
    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'write todolistId'} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <button onClick={deleteTodoL}>delete todolist</button>
        </div>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const updateTodoL = () => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'write todolistId'} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'write a new title'} onChange={e => setTitle(e.currentTarget.value)}/>
            <button onClick={updateTodoL}>update todolist</button>
        </div>
    </div>
}

//WORK WITH TASKS

export const GetTasks = () => {
    const [state, setState] = useState<any>([])
    useEffect(() => {
        todolistAPI.getTasks('e9b26a40-fdc9-408a-8b76-0aa5c4bb08d3').then((res) => {
            setState(res.data);
        })
    }, [])
    console.log(state)

    return <div> {JSON.stringify(state)}</div>

}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const createNewTask = () => {
        todolistAPI.createTask('e9b26a40-fdc9-408a-8b76-0aa5c4bb08d3', title)
            .then((res) => {
                setState(res.data);
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'title for new task'} onChange={e => setTitle(e.currentTarget.value)}/>
            <button onClick={createNewTask}>create task</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const deleteTask = () => {
        todolistAPI.deleteTask('e9b26a40-fdc9-408a-8b76-0aa5c4bb08d3', taskId)
            .then((res) => {
                setState(res.data);
            })
    }
    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'write taskId'} onChange={e => setTaskId(e.currentTarget.value)}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')
    const updateTask = () => {
        todolistAPI.updateTask('e9b26a40-fdc9-408a-8b76-0aa5c4bb08d3', taskId, {
            title,
            description,
            status,
            priority,
            startDate,
            deadline
        })
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {(state)}
        <div>
            <input placeholder={'write taskId'} onChange={e => setTaskId(e.currentTarget.value)}/>
            <input placeholder={'write a new title'} onChange={e => setTitle(e.currentTarget.value)}/>
            <input placeholder={'write a new description'} onChange={e => setDescription(e.currentTarget.value)}/>
            <input placeholder={'write a new status'} onChange={e => setStatus(+e.currentTarget.value)}/>
            <input placeholder={'write a new priority'} onChange={e => setPriority(+e.currentTarget.value)}/>
            <input placeholder={'write a new startDate'} onChange={e => setStartDate(e.currentTarget.value)}/>
            <input placeholder={'write a new deadline'} onChange={e => setDeadline(e.currentTarget.value)}/>
            <button onClick={updateTask}>update task</button>
        </div>
    </div>
}
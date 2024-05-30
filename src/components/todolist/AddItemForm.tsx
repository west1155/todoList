import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {TextField} from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'

type PropsType = {
    addItem: (title: string, id: string) => void
}

export const AddItemForm = React.memo((props: PropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim(), '1')
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error != null) {
            setError(null)
        }
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }

    console.log('AddItemForm is called')

    return (
        <div>
            <TextField
                label="Enter a title"
                variant={'outlined'}
                className={error ? 'error' : ''}
                value={title}
                error={!!error}
                helperText={error}
                size={'small'}
                onChange={changeItemHandler}
                onKeyUp={addItemOnKeyUpHandler}
            />
            <IconButton onClick={addItemHandler} color={'primary'}>
                <AddBoxIcon/>
            </IconButton>
        </div>
    )
})
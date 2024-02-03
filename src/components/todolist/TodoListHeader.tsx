import React from 'react';



type TodoListHeaderPropsType = {
    title: string
}
export const TodoListHeader:React.FC<TodoListHeaderPropsType> = ({title}) => {
    return (<h3>{title}</h3>);
};

import React from 'react';

export type ButtonPropsType = {
    id?: number
    callback?:() => void
    name: string
    disabled?: boolean
    className?: string
}
export const Button: React.FC<ButtonPropsType> = (props) => {
    return (<button onClick={props.callback}>{props.name}</button>);
};


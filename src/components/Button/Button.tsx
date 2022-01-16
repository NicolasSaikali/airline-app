import React, { CSSProperties, FC } from 'react'
import "./styles.css"
export enum ButtonStyles{
    FILLED,
    OUTLINE,
    TEXT
}

export interface ButtonProps{
    content:string,
    type?:'filled' | 'outline' | 'text' | null,
    onPress?:()=>void,
    disabled?:boolean,
    style?:CSSProperties
}

export const Button : FC<ButtonProps> = (props) => <>{
    props.content ? <button 
    disabled={props.disabled}
    style={props.style || {}}
    onClick={props.onPress ? props.onPress : undefined}
    className={`button ${props.type ? props.type : 'filled'}`}>
        {props.content}
    </button> : null
}</>
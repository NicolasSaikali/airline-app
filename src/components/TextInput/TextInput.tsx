import React, { FC } from 'react'
import "./styles.css"
export interface TextInputProps{
    type?: 'text' | 'number' | 'email',
    placeholder?:string,
    value?:string | number, 
    onKeyPress?:(value:string) => void,
    onBlur?:(value:string) => void,
    onFocus?:(value:string) => void,
    className?:string,
}

export const TextInput :FC<TextInputProps> = (props) => {
    return <input 
    className={`text-input ${props.className}`}
    type={props.type ? props.type : 'text'} 
    placeholder={props.placeholder}
    value={props.value}
    onKeyPress={(event) =>{ if(props.onKeyPress) props.onKeyPress(event.currentTarget.value) }}
    onBlur={(event) =>{ if(props.onBlur) props.onBlur(event.currentTarget.value) }}
    onFocus={(event) =>{ if(props.onFocus) props.onFocus(event.currentTarget.value) }}
    />
}
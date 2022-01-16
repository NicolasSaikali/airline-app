import React, { CSSProperties, FC } from 'react'
import "./styles.css"
import Select, { SingleValue } from 'react-select'
export interface InputListProps {
    id: string,
    data: Array<{
        value:string,
        label:string,
    }>,
    placeholder:string,
    icon?: string,
    onChange?: (newValue: SingleValue<{ value: string; label: string; }>) => void,
    style?: CSSProperties,
}

export const InputList: FC<InputListProps> = (props) => <>{
    (props.id && props.data && props.placeholder) ? (
        <div className="input-list-wrapper">
            {props.icon ? <i className={`fa fa-${props.icon} icon`}></i> : null}
            <Select onChange={props.onChange ? props.onChange : ()=>{}} classNamePrefix='input-list' placeholder={props.placeholder} className='input-select' options={props.data}/>
        </div>
    ) : null
}</>
import React, { FC, useState } from 'react'
import "./styles.css"
export interface DatePickerProps {
    value?: string,
    placeholder?: string,
    minDate?: string;
    maxDate?: string,
    onDateChange?: (date: string | null) => void | undefined,
    className?: string,
}

export const DatePcker: FC<DatePickerProps> = (props) => {
    const [focused, setFocused] = useState(false)

    return <input type={focused ? "date" : "text"}
        value={props.value}
        autoFocus={focused}
        placeholder={props.placeholder}
        onFocus={() => { setFocused(true) }}
        onBlur={() => { setFocused(false) }}
        className={`date-picker ${props.className}`}
        onChange={(e) => {
            props.onDateChange ? props.onDateChange(e.target.value) : console.log('')
        }}
        min={props.minDate}
        max={props.maxDate} />
};
import React, { CSSProperties, FC } from 'react'
import Modal, { Styles } from 'react-modal'
export interface ModalProps{
    isOpen?:boolean,
    children?:any,
    customStyles?:Styles,
    onRequestClose?:()=>void
}

Modal.setAppElement('#root')

export const ModalComponent :FC<ModalProps> = (props) => {
    return <>
        <Modal 
            isOpen={props.isOpen || false}
            children={props.children}
            style={props.customStyles}
            onRequestClose={props.onRequestClose}
        />
    </>
}
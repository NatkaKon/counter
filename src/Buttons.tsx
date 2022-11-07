import React from 'react';
import s from './Buttons.module.css'

type ButtonsPropsType={
    name:string
    disabled:boolean
    callBack:()=> void
}

export const Buttons = (props:ButtonsPropsType)=> {

    const onClickHandler=()=> {
        props.callBack()
    }
    return (
        <div>
            <button className={s.button}
                    disabled={props.disabled}
            onClick={onClickHandler}
            >{props.name}</button>
        </div>
    )
}
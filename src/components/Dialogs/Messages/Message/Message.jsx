import React from 'react'
import s from './Message.module.css'

export default function Message(props) {
    let who = props.who === 'you' ? s.you :
        props.who === 'me' ? s.me : null;
    return (
        <div className={`${s.message} ${who}`}>
            <div className={s.text}>{props.message}</div>
        </div>
    );
}
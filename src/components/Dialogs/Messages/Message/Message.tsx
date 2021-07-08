import React, {FC} from 'react'
import s from './Message.module.css'

type PropsType = {
    who: 'me' | 'you',
    message: string
}
const Message: FC<PropsType> = (props) => {
    let who = props.who === 'you' ? s.you :
        props.who === 'me' ? s.me : null;
    return (
        <div className={`${s.message} ${who}`}>
            <div className={s.text}>{props.message}</div>
        </div>
    );
}

export default Message;
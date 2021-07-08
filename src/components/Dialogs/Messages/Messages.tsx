import React, {FC, useEffect} from 'react';
import s from './Messages.module.css';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../../common/FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../../utils/validators";
import Message from "./Message/Message";
import {MessagesPropsType} from "./MessagesContainer";
import { Button } from 'antd';

type SendMessageDataType = {
    message: string
}

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const Messages: FC<MessagesPropsType> = (props) => {

    useEffect(() => {
        ws.addEventListener('message', (e) => {
            console.log(JSON.parse(e.data))
        })
    }, [])

    function handleSendMessageClick(data: SendMessageDataType): void {
        props.sendMessage(props.match.params.friendId, data.message)
    }

    function whoSendMessage(senderId: number): "me" | "you" {
        return senderId === props.authUserId ? 'me' : 'you';
    }

    return (
        <div className={s.container}>
            <div className={s.messages}>
                {props.messagesData.map(item => {
                    let who = whoSendMessage(item.senderId);
                    return <Message key={item.id} who={who} message={item.body}/>
                })}
            </div>
            <MessagesReduxForm onSubmit={handleSendMessageClick}/>
        </div>

    );
};

const maxLength300 = maxLengthCreator(300);

const MessagesForm: FC<InjectedFormProps<SendMessageDataType>> = (props) => {
    return (
        <form className={s.form} onSubmit={props.handleSubmit}>
            {createField(Textarea, 'message', [required, maxLength300], 'Enter message...')}
            <Button htmlType={'submit'} type={'primary'}>Send</Button>
        </form>
    )
};
const MessagesReduxForm = reduxForm<SendMessageDataType>({
    form: 'newMessage'
})(MessagesForm);

export default Messages;
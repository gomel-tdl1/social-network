import React, {FC, useEffect} from 'react';
import Messages from "./Messages";
import {connect} from "react-redux";
import {compose} from "redux";
import {messagesDataSelector} from "../../../redux/selectors/dialogs-selectors";
import {getMessages, sendMessage} from "../../../redux/dialogs-reducer";
import {withRouter} from "react-router-dom";
import {getAuthUserIdSelector} from "../../../redux/selectors/auth-selectors";
import {MessageType} from "../../../types/types";
import {AppStateType} from "../../../redux/redux-store";

type MapStatePropsType = {
    messagesData: Array<MessageType>,
    authUserId: number | null
}
type MapDispatchPropsType = {
    getMessages: (id: number) => void
    sendMessage: (id: number, message: string) => void
}
type OwnPropsType = {
    match: any
}
export type MessagesPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
const MessagesContainer: FC<MessagesPropsType> = (props) => {
    useEffect(() => {
        props.getMessages(props.match.params.friendId);
    }, props.match.params.friendId);

    return (
        <>
            <Messages {...props}/>
        </>
    );
};

function mapStateToProps(state: AppStateType): MapStatePropsType {
    return ({
        messagesData: messagesDataSelector(state),
        authUserId: getAuthUserIdSelector(state)
    });
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        sendMessage,
        getMessages
    }),
    withRouter
)(MessagesContainer);

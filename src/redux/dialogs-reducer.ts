import {dialogsAPI} from "../API/API";
import {asyncErrorMessageView} from "./app-reducer";
import {DialogType, MessageType, PhotosType} from "../types/types";

const UPDATE_DIALOGS_DATA = 'dialogs-reducer/UPDATE_DIALOGS_DATA';
const UPDATE_MESSAGES_DATA = 'dialogs-reducer/UPDATE_MESSAGES_DATA';

type UpdateDialogsDataActionType = {
    type: typeof UPDATE_DIALOGS_DATA,
    dialogsData: Array<DialogType>
}
export const updateDialogsData = (dialogsData: Array<DialogType>): UpdateDialogsDataActionType => ({
    type: UPDATE_DIALOGS_DATA,
    dialogsData
});

type UpdateMessagesDataActionType = {
    type: typeof UPDATE_MESSAGES_DATA,
    messagesData: Array<MessageType>
}
export const updateMessagesData = (messagesData: Array<MessageType>): UpdateMessagesDataActionType => ({
    type: UPDATE_MESSAGES_DATA,
    messagesData
});

const initialState = {
    dialogsData: [] as Array<DialogType>,
    messagesData: [] as Array<MessageType>
};
export type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case UPDATE_DIALOGS_DATA:
            return {
                ...state,
                dialogsData: action.dialogsData
            };
        case UPDATE_MESSAGES_DATA:
            return {
                ...state,
                messagesData: action.messagesData
            };

        default:
            return {...state};
    }
};

function trueResultCode(data: any): boolean { //изменить тип data, после того как проверить его содержание
    return data.resultCode === 0;
}

//startChattingThunkCreator
type StartChattingThunkType = (userId: number) => (dispatch: Function) => void
export const startChatting: StartChattingThunkType = (userId) => async (dispatch) => {
    try {
        let data = await dialogsAPI.startChatting(userId);
        if (trueResultCode(data)) {
            dispatch(getDialogs());
        } else {
            throw new Error(data.messages[0]);
        }
    } catch (e) {
        dispatch(asyncErrorMessageView(e));
    }
};
//getDialogsThunkCreator
type GetDialogsThunkType = () => (dispatch: Function) => void
export const getDialogs: GetDialogsThunkType = () => async (dispatch) => {
    let data = await dialogsAPI.getDialogs();
    dispatch(updateDialogsData(data));
};
//getMessagesThunkCreator
type GetMessagesThunkType = (friendId: number) => (dispatch: Function) => void
export const getMessages: GetMessagesThunkType = (friendId) => async (dispatch) => {
    let data = await dialogsAPI.getMessages(friendId);
    dispatch(updateMessagesData(data.items));
};
//sendMessageThunkCreator
type SendMessageThunkType = (friendId: number, messageText: string) => (dispatch: Function) => void
export const sendMessage: SendMessageThunkType = (friendId, messageText) => async (dispatch) => {
    let data = await dialogsAPI.sendMessage(friendId, messageText);
    dispatch(getMessages(friendId));
};

export default dialogsReducer;
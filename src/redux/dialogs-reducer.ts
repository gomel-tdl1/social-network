import {dialogsAPI} from "../API/API";
import {asyncErrorMessageView} from "./app-reducer";
import {DialogType, MessageType} from "../types/types";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";

const UPDATE_DIALOGS_DATA = 'dialogs-reducer/UPDATE_DIALOGS_DATA';
const UPDATE_MESSAGES_DATA = 'dialogs-reducer/UPDATE_MESSAGES_DATA';

export const actionsDialogs = {
    updateDialogsData: (dialogsData: Array<DialogType>) => ({
        type: UPDATE_DIALOGS_DATA,
        dialogsData
    } as const),
    updateMessagesData: (messagesData: Array<MessageType>) => ({
        type: UPDATE_MESSAGES_DATA,
        messagesData
    } as const)
}

const initialState = {
    dialogsData: [] as Array<DialogType>,
    messagesData: [] as Array<MessageType>
};
export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actionsDialogs>;

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

export type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const startChatting = (userId: number): ThunkActionType => async (dispatch) => {
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

export const getDialogs = (): ThunkActionType => async (dispatch) => {
    let data = await dialogsAPI.getDialogs();
    dispatch(actionsDialogs.updateDialogsData(data));
};

export const getMessages = (friendId: number): ThunkActionType => async (dispatch) => {
    let data = await dialogsAPI.getMessages(friendId);
    dispatch(actionsDialogs.updateMessagesData(data.items));
};

export const sendMessage = (friendId: number, messageText: string): ThunkActionType => async (dispatch) => {
    try {
        let data = await dialogsAPI.sendMessage(friendId, messageText);
        dispatch(getMessages(friendId));
    } catch (e) {
        dispatch(asyncErrorMessageView(e));
    }
};

export default dialogsReducer;
import {AppStateType} from "../redux-store";

export const messagesDataSelector = (state: AppStateType) => {
    return state.dialogsPage.messagesData;
};

export const getDialogsDataSelector = (state: AppStateType) => {
    return state.dialogsPage.dialogsData;
};
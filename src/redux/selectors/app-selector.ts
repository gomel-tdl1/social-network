import {AppStateType} from "../redux-store";

export const getInitialized = (state: AppStateType) => {
    return state.app.initialized;
};
export const getErrorMessage = (state: AppStateType) => {
    return state.app.errorMessage;
};

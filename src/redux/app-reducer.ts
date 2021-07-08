import {checkAuthentication} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";

const INITIALIZED_SUCCESS = 'app-reducer/INITIALIZED_SUCCESS';
const SET_ERROR_MESSAGE = 'app-reducer/SET_ERROR_MESSAGE';

export const actionsApp = {
    initializedSuccess: () => ({
        type: INITIALIZED_SUCCESS
    } as const),
    setErrorMessage: (errorMessage: string | null) => ({
        type: SET_ERROR_MESSAGE,
        errorMessage
    } as const)
}

const initialState = {
    initialized: false,
    errorMessage: null as string | null,
    theme: 'light' as 'dark' | 'light'
};
export type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actionsApp>

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.errorMessage
            };

        default:
            return {...state};
    }
};

type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const initializeApp = (): ThunkActionType => async (dispatch) => {
    await dispatch(checkAuthentication());
    dispatch(actionsApp.initializedSuccess());
};


export const asyncErrorMessageView = (error: any): ThunkActionType =>
    async (dispatch) => {
        dispatch(actionsApp.setErrorMessage(error.message));
        setTimeout(() => {
            dispatch(actionsApp.setErrorMessage(null));
        }, 3000)
    };

export default appReducer;
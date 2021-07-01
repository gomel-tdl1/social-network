import {checkAuthentication} from "./auth-reducer";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const INITIALIZED_SUCCESS = 'app-reducer/INITIALIZED_SUCCESS';
const SET_ERROR_MESSAGE = 'app-reducer/SET_ERROR_MESSAGE';

type InitializedSuccessActionType = { type: typeof INITIALIZED_SUCCESS }
export const initializedSuccess = (): InitializedSuccessActionType => ({
    type: INITIALIZED_SUCCESS
});

type SetErrorMessageActionType = { type: typeof SET_ERROR_MESSAGE, errorMessage: string | null }
export const setErrorMessage = (errorMessage: string | null): SetErrorMessageActionType => ({
    type: SET_ERROR_MESSAGE,
    errorMessage
});

const initialState = {
    initialized: false,
    errorMessage: null as string | null,
    theme:  'light' as 'dark' | 'light'
};
export type InitialStateType = typeof initialState;

type ActionsTypes = InitializedSuccessActionType | SetErrorMessageActionType

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

type DispatchType = Dispatch<ActionsTypes>
type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const initializeApp = (): ThunkActionType => async (dispatch) => {
    await dispatch(checkAuthentication());
    dispatch(initializedSuccess());
};


export const asyncErrorMessageView = (error: any): ThunkActionType =>
    async (dispatch) => {
    dispatch(setErrorMessage(error.message));
    setTimeout(() => {
        dispatch(setErrorMessage(null));
    }, 3000)
};

export default appReducer;
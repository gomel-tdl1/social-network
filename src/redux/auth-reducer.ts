import {FormAction, stopSubmit} from "redux-form";
import { ThunkAction } from "redux-thunk";
import {authAPI, profileAPI} from "../API/API";
import {asyncErrorMessageView} from "./app-reducer";
import {AppStateType, InferActionsTypes} from "./redux-store";

const SET_USER_DATA = 'auth-reducer/SET_USER_DATA';
const TOGGLE_IS_AUTH = 'auth-reducer/TOGGLE_IS_AUTH';
const SET_AVATAR_FOR_HEADER = 'auth-reducer/SET_AVATAR_FOR_HEADER';
const SET_CAPTCHA = 'auth-reducer/SET_CAPTCHA';
const TOGGLE_IS_CAPTCHA_NEED = 'auth-reducer/TOGGLE_IS_CAPTCHA_NEED';

export const actionsAuth = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: SET_USER_DATA,
        payload: {
            id,
            email,
            login,
            isAuth
        }
    } as const),
    toggleIsAuth: (isAuth: boolean) => ({
        type: TOGGLE_IS_AUTH,
        isAuth
    } as const),
    setAvatarForHeader: (avatar: string) => ({
        type: SET_AVATAR_FOR_HEADER,
        avatar
    } as const),
    setCaptcha: (captcha: string | null) => ({
        type: SET_CAPTCHA,
        captcha
    } as const),
    toggleIsCaptchaNeed: (isNeed: boolean) => ({
        type: TOGGLE_IS_CAPTCHA_NEED,
        isNeed
    } as const),
}

const initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    avatar: null as string | null,
    isAuth: false,
    isFetching: false,
    isCaptchaNeed: false,
    captcha: null as string | null
};
export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actionsAuth>

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            };
        case TOGGLE_IS_AUTH:
            return {
                ...state,
                isAuth: action.isAuth
            };
        case SET_AVATAR_FOR_HEADER:
            return {
                ...state,
                avatar: action.avatar
            };
        case TOGGLE_IS_CAPTCHA_NEED:
            return {
                ...state,
                isCaptchaNeed: action.isNeed
            };
        case SET_CAPTCHA:
            return {
                ...state,
                captcha: action.captcha
            };

        default:
            return {...state};
    }
};

export type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes | FormAction>;

export const checkAuthentication = ():ThunkActionType => {
    return async (dispatch) => {
        try {
            let data = await authAPI.isAuth();
            let userData = data.data;
            if (data.resultCode === 0) {
                dispatch(actionsAuth.toggleIsAuth(true));
                dispatch(actionsAuth.setAuthUserData(userData.id, userData.email, userData.login, true));
                let profileData = await profileAPI.getProfile(userData.id);
                dispatch(actionsAuth.setAvatarForHeader(profileData.photos.small));
            } else {
                dispatch(actionsAuth.toggleIsAuth(false));
            }
        } catch (e) {
            dispatch(asyncErrorMessageView(e));
        }
    }
};

export const loginOnSite = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkActionType => {
    return async (dispatch) => {
        try {
            let response = await authAPI.loginOnSite(email, password, rememberMe, captcha);
            const actionStopSubmit = stopSubmit('login', {_error: response.data.messages[0]});
            if (response.data.resultCode === 0) {
                dispatch(checkAuthentication());
                dispatch(actionsAuth.toggleIsCaptchaNeed(false));
                dispatch(actionsAuth.setCaptcha(null));
            } else if (response.data.resultCode === 10) {
                dispatch(actionsAuth.toggleIsCaptchaNeed(true));
                let data = await authAPI.getCaptcha();
                dispatch(actionsAuth.setCaptcha(data.url));
                dispatch(actionStopSubmit);
            } else if (response.data.resultCode === 1) {
                dispatch(actionStopSubmit);
            }
        } catch (e) {
            dispatch(asyncErrorMessageView(e));
        }
    };
};

export const logout = (): ThunkActionType => {
    return async (dispatch) => {
        try {
            let response = await authAPI.logout();
            if (response.data.resultCode === 0) {
                dispatch(checkAuthentication());
                dispatch(actionsAuth.setAuthUserData(null, null, null, false));
            }
        } catch (e) {
            dispatch(asyncErrorMessageView(e));
        }
    };
};

export default authReducer;
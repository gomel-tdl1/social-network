import { stopSubmit } from "redux-form";
import {authAPI, profileAPI} from "../API/API";
import {asyncErrorMessageView} from "./app-reducer";

const SET_USER_DATA = 'auth-reducer/SET_USER_DATA';
const TOGGLE_IS_AUTH = 'auth-reducer/TOGGLE_IS_AUTH';
const SET_AVATAR_FOR_HEADER = 'auth-reducer/SET_AVATAR_FOR_HEADER';
const SET_CAPTCHA = 'auth-reducer/SET_CAPTCHA';
const TOGGLE_IS_CAPTCHA_NEED = 'auth-reducer/TOGGLE_IS_CAPTCHA_NEED';


type SetAuthUserDataActionPayloadType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {
        id,
        email,
        login,
        isAuth
    }
});

type ToggleIsAuthActionType = {
    type: typeof TOGGLE_IS_AUTH,
    isAuth: boolean
}
export const toggleIsAuth = (isAuth: boolean): ToggleIsAuthActionType => ({
    type: TOGGLE_IS_AUTH,
    isAuth
});

export type SetAvatarForHeaderActionType = {
    type: typeof SET_AVATAR_FOR_HEADER,
    avatar: string
}
export const setAvatarForHeader = (avatar: string): SetAvatarForHeaderActionType => ({
    type: SET_AVATAR_FOR_HEADER,
    avatar
});

type SetCaptchaActionType = {
    type: typeof SET_CAPTCHA,
    captcha: string | null
}
export const setCaptcha = (captcha: string | null): SetCaptchaActionType => ({
    type: SET_CAPTCHA,
    captcha
});

type ToggleIsCaptchaNeedActionType = {
    type: typeof TOGGLE_IS_CAPTCHA_NEED,
    isNeed: boolean
}
export const toggleIsCaptchaNeed = (isNeed: boolean): ToggleIsCaptchaNeedActionType => ({
    type: TOGGLE_IS_CAPTCHA_NEED,
    isNeed
});

export type InitialStateType2 = {
    id: null | number,
    login: string | null,
    email: string | null,
    avatar: string | null,
    isAuth: boolean,
    isFetching: boolean,
    isCaptchaNeed: boolean,
    captcha: string | null
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

const authReducer = (state = initialState, action: any): InitialStateType => {
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

//checkAuthenticationThunkCreator
type CheckAuthenticationThunkType = () => (dispatch: Function) => void;
export const checkAuthentication: CheckAuthenticationThunkType = () => {
    return async (dispatch) => {
        try {
            let data = await authAPI.isAuth();
            let userData = data.data;
            if (data.resultCode === 0) {
                dispatch(toggleIsAuth(true));
                dispatch(setAuthUserData(userData.id, userData.email, userData.login, true));
                let profileData = await profileAPI.getProfile(userData.id);
                dispatch(setAvatarForHeader(profileData.photos.small));
            } else {
                dispatch(toggleIsAuth(false));
            }
        } catch (e) {
            dispatch(asyncErrorMessageView(e));
        }
    }
};
//loginOnSiteThunkCreator
type LoginOnSiteThunkType = (email: string, password: string, rememberMe: boolean, captcha: string) => (dispatch: Function) => void;
export const loginOnSite: LoginOnSiteThunkType = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        try {
            let response = await authAPI.loginOnSite(email, password, rememberMe, captcha);
            const actionStopSubmit = stopSubmit('login', {_error: response.data.messages[0]});
            if (response.data.resultCode === 0) {
                dispatch(checkAuthentication());
                dispatch(toggleIsCaptchaNeed(false));
                dispatch(setCaptcha(null));
            } else if (response.data.resultCode === 10) {
                dispatch(toggleIsCaptchaNeed(true));
                let data = await authAPI.getCaptcha();
                dispatch(setCaptcha(data.url));
                dispatch(actionStopSubmit);
            } else if (response.data.resultCode === 1) {
                dispatch(actionStopSubmit);
            }
        } catch (e) {
            dispatch(asyncErrorMessageView(e));
        }
    };
};
//logoutThunkCreator
type LogoutType = () => (dispatch: Function) => void;
export const logout: LogoutType = () => {
    return async (dispatch) => {
        try {
            let response = await authAPI.logout();
            if (response.data.resultCode === 0) {
                dispatch(checkAuthentication());
                dispatch(setAuthUserData(null, null, null, false));
            }
        } catch (e) {
            dispatch(asyncErrorMessageView(e));
        }
    };
};

export default authReducer;
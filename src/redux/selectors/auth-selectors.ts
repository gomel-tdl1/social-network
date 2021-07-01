import {AppStateType} from "../redux-store";

export const getAuthUserIdSelector = (state: AppStateType) => {
    return state.auth.id;
};

export const getIsAuthSelector = (state: AppStateType) => {
    return state.auth.isAuth;
};

export const getAuthLoginSelector = (state: AppStateType) => {
    return state.auth.login;
};

export const getAuthAvatarSelector = (state: AppStateType) => {
    return state.auth.avatar;
};

export const getCaptchaSelector = (state: AppStateType) => {
    return state.auth.captcha;
};

export const getIsCaptchaNeedSelector = (state: AppStateType) => {
    return state.auth.isCaptchaNeed;
};



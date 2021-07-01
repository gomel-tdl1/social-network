import {AppStateType} from "../redux-store";

export const getProfileSelector = (state: AppStateType) => {
    return state.profilePage.profile;
};

export const getIsFetchingSelector = (state: AppStateType) => {
    return state.profilePage.isFetching;
};

export const getStatusSelector = (state: AppStateType) => {
    return state.profilePage.status;
};

export const getPostsDataSelector = (state: AppStateType) => {
    return state.profilePage.postsData;
};

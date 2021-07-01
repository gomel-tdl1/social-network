import {profileAPI} from "../API/API";
import {setAvatarForHeader, SetAvatarForHeaderActionType} from "./auth-reducer";
import {asyncErrorMessageView} from "./app-reducer";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const ADD_POST = 'profile-reducer/ADD-POST';
const SET_USER_PROFILE = 'profile-reducer/SET_USER_PROFILE';
const TOGGLE_IS_FETCHING = 'profile-reducer/TOGGLE_IS_FETCHING';
const SET_USER_STATUS = 'profile-reducer/SET_USER_STATUS';
const UPDATE_PHOTO_SUCCESS = 'profile-reducer/UPDATE_PHOTO_SUCCESS';


type AddPostActionType = {
    type: typeof ADD_POST,
    userId: number,
    newPostText: string
}
export const addPost = (id: number, text: string): AddPostActionType => ({
    type: ADD_POST,
    userId: id,
    newPostText: text
});

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
export const setUserProfile = (profile: any): SetUserProfileActionType => ({
    type: SET_USER_PROFILE,
    profile
});

type SetUserStatusActionType = {
    type: typeof SET_USER_STATUS,
    status: string
}
export const setUserStatus = (status: string): SetUserStatusActionType => ({
    type: SET_USER_STATUS,
    status
});

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
});

type UpdateProfilePhotoSuccessActionType = {
    type: typeof UPDATE_PHOTO_SUCCESS,
    photos: PhotosType
}
export const updateProfilePhotoSuccess = (photos: PhotosType): UpdateProfilePhotoSuccessActionType => ({
    type: UPDATE_PHOTO_SUCCESS,
    photos
});

type ActionsTypes =
    AddPostActionType
    | SetUserProfileActionType
    | SetUserStatusActionType
    | ToggleIsFetchingActionType
    | UpdateProfilePhotoSuccessActionType
    | SetAvatarForHeaderActionType;

let initialState = {
    postsData: [] as Array<PostType>,
    profile: null as ProfileType | null,
    status: null as string | null,
    isFetching: false
};
export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    let stateCopy = {...state};
    stateCopy.postsData = [...state.postsData];
    switch (action.type) {
        case ADD_POST:
            let lastPosts = stateCopy.postsData[stateCopy.postsData.length - 1];
            let nextPostId = lastPosts ? lastPosts.id + 1 : 1;
            let newPost = {
                id: nextPostId,
                message: action.newPostText,
                likesCount: 0
            };
            stateCopy.postsData.push(newPost);
            break;
        case SET_USER_PROFILE:
            return {...state, profile: action.profile};
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        case SET_USER_STATUS:
            return {...state, status: action.status};
        case UPDATE_PHOTO_SUCCESS:
            //@ts-ignore
            return {...state, profile: {...state.profile, photos: action.photos}};

        default:
            break;
    }
    return stateCopy;
};

type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

//getUserProfileThunkCreator
export const getUserProfile = (id: number): ThunkActionType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data = await profileAPI.getProfile(id);
        dispatch(toggleIsFetching(false));
        dispatch(setUserProfile(data));
    }
};
//getUserStatusThunkCreator
export const getUserStatus = (id: number): ThunkActionType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data = await profileAPI.getStatus(id);
        dispatch(toggleIsFetching(false));
        dispatch(setUserStatus(data));
    }
};
// updateUserStatusThunkCreator
export const updateUserStatus = (status: string): ThunkActionType => {
    return async (dispatch) => {
        try {
            let response = await profileAPI.updateStatus(status);
            if (response.data.resultCode === 0) {
                dispatch(setUserStatus(status))
            } else {
                throw new Error(response.data.messages[0]);
            }
        } catch (e) {
            dispatch(asyncErrorMessageView(e));
        }
    };
};
//updateProfilePhotoThunkCreator
export const updateProfilePhoto = (file: any): ThunkActionType => {
    return async (dispatch) => {
        try {
            let response = await profileAPI.updateProfilePhoto(file);
            if (response.resultCode === 0) {
                dispatch(updateProfilePhotoSuccess(response.data.photos));
                dispatch(setAvatarForHeader(response.data.photos.small))
            } else {
                throw new Error(response.messages[0]);
            }
        } catch (e) {
            dispatch(asyncErrorMessageView(e));
        }
    };
};
//updateProfileDescriptionThunkCreator
export const updateProfileDescription = (data: ProfileType, id: number): ThunkActionType => {
    return async (dispatch) => {
        try {
            let response = await profileAPI.updateProfileDescription(data);
            if (response.resultCode === 0) {
                dispatch(getUserProfile(id));
            } else {
                throw new Error(response.messages[0]);
            }
        } catch (e) {
            dispatch(asyncErrorMessageView(e));
        }
    };
};

export default profileReducer;
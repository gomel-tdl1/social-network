import {profileAPI} from "../API/API";
import {asyncErrorMessageView} from "./app-reducer";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {actionsAuth} from "./auth-reducer";

const ADD_POST = 'profile-reducer/ADD-POST';
const SET_USER_PROFILE = 'profile-reducer/SET_USER_PROFILE';
const TOGGLE_IS_FETCHING = 'profile-reducer/TOGGLE_IS_FETCHING';
const SET_USER_STATUS = 'profile-reducer/SET_USER_STATUS';
const UPDATE_PHOTO_SUCCESS = 'profile-reducer/UPDATE_PHOTO_SUCCESS';

export const actionsProfile = {
    addPost: (id: number, text: string) => ({
        type: ADD_POST,
        userId: id,
        newPostText: text
    } as const),
    setUserProfile: (profile: ProfileType) => ({
        type: SET_USER_PROFILE,
        profile
    } as const),
    setUserStatus: (status: string) => ({
        type: SET_USER_STATUS,
        status
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: TOGGLE_IS_FETCHING,
        isFetching
    } as const),
    updateProfilePhotoSuccess: (photos: PhotosType) => ({
        type: UPDATE_PHOTO_SUCCESS,
        photos
    } as const),
}
type ActionsTypes = InferActionsTypes<typeof actionsProfile> | InferActionsTypes<typeof actionsAuth>

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
            // @ts-ignore
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
        dispatch(actionsProfile.toggleIsFetching(true));
        let data = await profileAPI.getProfile(id);
        dispatch(actionsProfile.toggleIsFetching(false));
        dispatch(actionsProfile.setUserProfile(data));
    }
};
//getUserStatusThunkCreator
export const getUserStatus = (id: number): ThunkActionType => {
    return async (dispatch) => {
        dispatch(actionsProfile.toggleIsFetching(true));
        let data = await profileAPI.getStatus(id);
        dispatch(actionsProfile.toggleIsFetching(false));
        dispatch(actionsProfile.setUserStatus(data));
    }
};
// updateUserStatusThunkCreator
export const updateUserStatus = (status: string): ThunkActionType => {
    return async (dispatch) => {
        try {
            let response = await profileAPI.updateStatus(status);
            if (response.data.resultCode === 0) {
                dispatch(actionsProfile.setUserStatus(status))
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
                dispatch(actionsProfile.updateProfilePhotoSuccess(response.data.photos));
                dispatch(actionsAuth.setAvatarForHeader(response.data.photos.small))
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
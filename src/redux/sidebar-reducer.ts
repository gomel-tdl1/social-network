import {profileAPI} from "../API/API";
import { ProfileType } from "../types/types";

const TRANSFORM_ID_TO_PROFILE = 'sidebar-reducer/TRANSFORM_ID_TO_PROFILE';

type TransformIdToProfileActionType = {
    type: typeof TRANSFORM_ID_TO_PROFILE,
    data: Array<ProfileType>
}
const transformIdToProfile = (data: Array<ProfileType>): TransformIdToProfileActionType => ({
    type: TRANSFORM_ID_TO_PROFILE,
    data
});

const initialState = {
    viewsIDs: [
        14593,
        14581,
        14473
    ],
    views:[] as ProfileType[]
};
type InitialStateType = typeof initialState;

//getUserProfileThunkCreator
type GetUserProfileThunkType = (ids: Array<number>) => (dispatch: Function) => void
export const getUsersProfile: GetUserProfileThunkType = (ids) => {
    return async (dispatch) => {
        let profiles = [...ids];
        let data = await Promise.all(profiles.map(id => {
            return profileAPI.getProfile(id).then((data: ProfileType) => {
                return data;
            });
        }));
        dispatch(transformIdToProfile(data));
    }
};

const sideBarReducer = (state = initialState, action: any): InitialStateType => {
    if (action.type === TRANSFORM_ID_TO_PROFILE) {
        return {
            ...state,
            views: action.data
        }
    } else {
        return {...state};
    }
};
export default sideBarReducer;
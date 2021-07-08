import {profileAPI} from "../API/API";
import { ProfileType } from "../types/types";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";

const TRANSFORM_ID_TO_PROFILE = 'sidebar-reducer/TRANSFORM_ID_TO_PROFILE';

export const actionsSideBar = {
    transformIdToProfile : (data: Array<ProfileType>) => ({
        type: TRANSFORM_ID_TO_PROFILE,
        data
    } as const)
}


const initialState = {
    viewsIDs: [
        14593,
        14581,
        14473
    ],
    views:[] as ProfileType[]
};
type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actionsSideBar>


const sideBarReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    if (action.type === TRANSFORM_ID_TO_PROFILE) {
        return {
            ...state,
            views: action.data
        }
    } else {
        return {...state};
    }
};

type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const getUsersProfile = (ids: number[]): ThunkActionType => {
    return async (dispatch) => {
        let profiles = [...ids];
        let data = await Promise.all(profiles.map(id => {
            return profileAPI.getProfile(id).then((data: ProfileType) => {
                return data;
            });
        }));
        dispatch(actionsSideBar.transformIdToProfile(data));
    }
};
export default sideBarReducer;
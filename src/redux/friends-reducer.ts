import {usersAPI} from "../API/API";
import {UserType} from "../types/types";
import {asyncErrorMessageView} from "./app-reducer";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";

const ADD_FRIEND = 'friends-reducer/ADD_FRIEND';
const REMOVE_FRIEND = 'friends-reducer/REMOVE_FRIEND';
const SET_USERS = 'friends-reducer/SET_USERS';
// const SET_CURRENT_PAGE = 'friends-reducer/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'friends-reducer/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'friends-reducer/TOGGLE_IS_FETCHING';
const TOGGLE_BUTTON_IN_PROGRESS = 'friends-reducer/TOGGLE_BUTTON_IN_PROGRESS';

export const actionsDialogs = {
    addFriendSuccess: (userId: number) => ({
        type: ADD_FRIEND,
        userId
    } as const),
    removeFriendSuccess: (userId: number) => ({
        type: REMOVE_FRIEND,
        userId
    } as const),
    setUsers: (users: Array<UserType>) => ({
        type: SET_USERS,
        users
    } as const),
    setTotalUsersCount: (totalCount: number) => ({
        type: SET_TOTAL_USERS_COUNT,
        totalCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: TOGGLE_IS_FETCHING,
        isFetching
    } as const),
    toggleButtonInProgress: (isFetching: boolean, userId: number) => ({
        type: TOGGLE_BUTTON_IN_PROGRESS,
        isFetching,
        userId
    } as const)
}


type ActionsTypes = InferActionsTypes<typeof actionsDialogs>

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    usersTotalCount: 0,
    currentPage: 1,
    isFetching: false,
    buttonInProgress: [] as Array<number>
};
export type InitialStateType = typeof initialState;

const friendsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_FRIEND:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) return {...u, followed: true};
                    return u;
                })
            };
        case REMOVE_FRIEND:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) return {...u, followed: false};
                    return u;
                })
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                usersTotalCount: action.totalCount
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case TOGGLE_BUTTON_IN_PROGRESS:
            return {
                ...state,
                buttonInProgress: action.isFetching
                    ? [...state.buttonInProgress, action.userId]
                    : state.buttonInProgress.filter(id => id !== action.userId)
            };
        default:
            return {...state};
    }
};

type GetUsersResultType = {
    items: Array<UserType>,
    totalCount: number,
    error: any
}

type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

//getUsersThunkCreator
export const getUsers = (pageSize: number, currentPage: number): ThunkActionType => {
    return async (dispatch) => {
        dispatch(actionsDialogs.toggleIsFetching(true));
        let data: GetUsersResultType = await usersAPI.getUsers(pageSize, currentPage);
        dispatch(actionsDialogs.toggleIsFetching(false));
        dispatch(actionsDialogs.setUsers(data.items));
        dispatch(actionsDialogs.setTotalUsersCount(data.totalCount));
    }
};
//getUsersChangeThunkCreator
export const getUsersChange = (pageSize: number, pageNumber: number): ThunkActionType => {
    return async (dispatch) => {
        // dispatch(setCurrentPage(pageNumber));
        dispatch(actionsDialogs.toggleIsFetching(true));
        let data: GetUsersResultType = await usersAPI.getUsers(pageSize, pageNumber);
        dispatch(actionsDialogs.toggleIsFetching(false));
        dispatch(actionsDialogs.setUsers(data.items));
    }
};

const _addRemoveFlow = async (dispatch: any,
                              userId: number,
                              apiMethod: any,
                              actionCreator: (userId: number) => ReturnType<typeof actionsDialogs.addFriendSuccess> | ReturnType<typeof actionsDialogs.removeFriendSuccess>) => {
    try {
        dispatch(actionsDialogs.toggleButtonInProgress(true, userId));
        let data = await apiMethod(userId);
        if (data.resultCode === 0) {
            dispatch(actionCreator(userId));
        } else {
            throw new Error(data.messages[0])
        }
        dispatch(actionsDialogs.toggleButtonInProgress(false, userId));
    } catch (e) {
        dispatch(asyncErrorMessageView(e));
        dispatch(actionsDialogs.toggleButtonInProgress(false, userId));
    }
}

// removeFriendThunkCreator
export const removeFriend = (id: number): ThunkActionType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.deleteFriend.bind(usersAPI);
        _addRemoveFlow(dispatch, id, apiMethod, actionsDialogs.removeFriendSuccess);
    }
};
// addFriendThunkCreator
export const addFriend = (id: number): ThunkActionType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.follow.bind(usersAPI);
        _addRemoveFlow(dispatch, id, apiMethod, actionsDialogs.addFriendSuccess);
    }
};


export default friendsReducer;
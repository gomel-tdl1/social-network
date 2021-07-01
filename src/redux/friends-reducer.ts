import {usersAPI} from "../API/API";
import {UserType} from "../types/types";
import {asyncErrorMessageView} from "./app-reducer";
import {Dispatch} from "redux";
import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";

const ADD_FRIEND = 'friends-reducer/ADD_FRIEND';
const REMOVE_FRIEND = 'friends-reducer/REMOVE_FRIEND';
const SET_USERS = 'friends-reducer/SET_USERS';
// const SET_CURRENT_PAGE = 'friends-reducer/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'friends-reducer/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'friends-reducer/TOGGLE_IS_FETCHING';
const TOGGLE_BUTTON_IN_PROGRESS = 'friends-reducer/TOGGLE_BUTTON_IN_PROGRESS';

type AddFriendSuccessActionType = {
    type: typeof ADD_FRIEND,
    userId: number
}
export const addFriendSuccess = (userId: number): AddFriendSuccessActionType => ({
    type: ADD_FRIEND,
    userId
});

type RemoveFriendSuccessActionType = {
    type: typeof REMOVE_FRIEND,
    userId: number
}
export const removeFriendSuccess = (userId: number): RemoveFriendSuccessActionType => ({
    type: REMOVE_FRIEND,
    userId
});

type SetUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
    type: SET_USERS,
    users
});

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalCount: number
}
export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalCount
});
// export const setCurrentPage = (page) => ({
//     type: SET_CURRENT_PAGE,
//     currentPage: page
// });
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
});

type ToggleButtonInProgressActionType = {
    type: typeof TOGGLE_BUTTON_IN_PROGRESS,
    isFetching: boolean,
    userId: number
}
export const toggleButtonInProgress = (isFetching: boolean, userId: number): ToggleButtonInProgressActionType => ({
    type: TOGGLE_BUTTON_IN_PROGRESS,
    isFetching,
    userId
});

type ActionsTypes =
    AddFriendSuccessActionType
    | RemoveFriendSuccessActionType
    | SetUsersActionType
    | SetTotalUsersCountActionType
    | ToggleIsFetchingActionType
    | ToggleButtonInProgressActionType;

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
        // case SET_CURRENT_PAGE:
        //     return {
        //         ...state,
        //         currentPage: action.currentPage
        //     };
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

// type DispatchType = Dispatch<ActionsTypes>
// type GetStateType = () => AppStateType;

type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

//getUsersThunkCreator
export const getUsers = (pageSize: number, currentPage: number): ThunkActionType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data: GetUsersResultType = await usersAPI.getUsers(pageSize, currentPage);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
};
//getUsersChangeThunkCreator
export const getUsersChange = (pageSize: number, pageNumber: number): ThunkActionType => {
    return async (dispatch) => {
        // dispatch(setCurrentPage(pageNumber));
        dispatch(toggleIsFetching(true));
        let data: GetUsersResultType = await usersAPI.getUsers(pageSize, pageNumber);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
    }
};

const _addRemoveFlow = async (dispatch: any,
                              userId: number,
                              apiMethod: any,
                              actionCreator: (userId: number) => AddFriendSuccessActionType | RemoveFriendSuccessActionType) => {
    try {
        dispatch(toggleButtonInProgress(true, userId));
        let data = await apiMethod(userId);
        if (data.resultCode === 0) {
            dispatch(actionCreator(userId));
        } else {
            throw new Error(data.messages[0])
        }
        dispatch(toggleButtonInProgress(false, userId));
    } catch (e) {
        dispatch(asyncErrorMessageView(e));
    }
}

// removeFriendThunkCreator
export const removeFriend = (id: number): ThunkActionType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.deleteFriend.bind(usersAPI);
        _addRemoveFlow(dispatch, id, apiMethod, removeFriendSuccess);
    }
};
// addFriendThunkCreator
export const addFriend = (id: number): ThunkActionType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.follow.bind(usersAPI);
        _addRemoveFlow(dispatch, id, apiMethod, addFriendSuccess);
    }
};


export default friendsReducer;
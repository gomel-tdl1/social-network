import {AppStateType} from "../redux-store";

export const getUsersSelector = (state: AppStateType) => {
  return state.friendsPage.users;
};

export const getTotalCountSelector = (state: AppStateType) => {
  return state.friendsPage.usersTotalCount;
};

export const getPageSizeSelector = (state: AppStateType) => {
  return state.friendsPage.pageSize;
};

export const getCurrentPageSelector = (state: AppStateType) => {
  return state.friendsPage.currentPage;
};

export const getIsFetchingSelector = (state: AppStateType) => {
  return state.friendsPage.isFetching;
};

export const getButtonInProgressSelector = (state: AppStateType) => {
  return state.friendsPage.buttonInProgress;
};

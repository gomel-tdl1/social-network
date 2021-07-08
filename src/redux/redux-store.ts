import {applyMiddleware, combineReducers, createStore} from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sideBarReducer from "./sidebar-reducer";
import friendsReducer from "./friends-reducer";
import authReducer from './auth-reducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer";

let rootReducer = combineReducers({
    auth: authReducer,
    sideBar:sideBarReducer,
    profilePage:profileReducer,
    dialogsPage:dialogsReducer,
    friendsPage: friendsReducer,
    form: formReducer,
    app: appReducer
});

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
import React, {FC} from 'react';
import HeaderSoc from "./HeaderSoc";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {compose} from "redux";
import {
    getAuthAvatarSelector,
    getAuthLoginSelector,
    getAuthUserIdSelector,
    getIsAuthSelector
} from "../../redux/selectors/auth-selectors";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    isAuth: boolean,
    login: string | null,
    avatar: string | null,
    userId: number | null
}
type MapDispatchPropsType = {
    logout: () => void
}
type OwnPropsType = {
}
export type HeaderPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const HeaderContainerComponent: FC<HeaderPropsType> = (props) => {
    return <HeaderSoc {...props}/>
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: getIsAuthSelector(state),
    login: getAuthLoginSelector(state),
    avatar: getAuthAvatarSelector(state),
    userId: getAuthUserIdSelector(state)
});

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {logout})
)(HeaderContainerComponent);
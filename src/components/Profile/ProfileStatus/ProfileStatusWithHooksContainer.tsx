import React from 'react';
import {connect} from "react-redux";
import {updateUserStatus} from "../../../redux/profile-reducer";
import {getStatusSelector} from "../../../redux/selectors/profile-selectors";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {AppStateType} from "../../../redux/redux-store";

type MapStateToPropsType = {
    status: string | null
}
type MapDispatchToPropsType = {
    updateUserStatus: (status: string) => void
}
type OwnPropsType = {}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    status: getStatusSelector(state)
});

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    updateUserStatus
})(ProfileStatusWithHooks);
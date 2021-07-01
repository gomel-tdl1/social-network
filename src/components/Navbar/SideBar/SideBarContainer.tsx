import SideBar from "./SideBar";
import {connect} from "react-redux";
import React from 'react';
import {getUsersProfile} from "../../../redux/sidebar-reducer";
import {AppStateType} from "../../../redux/redux-store";
import {ProfileType} from "../../../types/types";

type MapStatePropsType = {
    viewsIDs: number[],
    views: ProfileType[]
}
type MapDispatchPropsType = {
    getUsersProfile: (views: Array<number>) => void
}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
class SideBarContainerComponent extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsersProfile(this.props.viewsIDs);
    }

    render() {
        return (
            <>
                <SideBar {...this.props}/>
            </>
        )
    }
}

function mapStateToProps(state: AppStateType): MapStatePropsType {
    return ({
        views: state.sideBar.views,
        viewsIDs: state.sideBar.viewsIDs
    });
}

const SideBarContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {getUsersProfile})(SideBarContainerComponent);
export default SideBarContainer;
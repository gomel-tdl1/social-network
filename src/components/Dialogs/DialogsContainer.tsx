import React, {FC, useEffect} from 'react';
import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getDialogsDataSelector} from "../../redux/selectors/dialogs-selectors";
import {getDialogs} from "../../redux/dialogs-reducer";
import {withRouter} from "react-router-dom";
import { AppStateType } from '../../redux/redux-store';
import {DialogType} from "../../types/types";

type MapStatePropsType = {
    dialogsData: Array<DialogType>
}
type MapDispatchPropsType = {
    getDialogs: () => void
}
type OwnPropsType = {
    match: any
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
const DialogsContainer: FC<PropsType> = (props) => {
    useEffect(()=>{
        props.getDialogs()
    }, [props.getDialogs]);
    return (
        <>
            <Dialogs {...props}/>
        </>
    )
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    dialogsData: getDialogsDataSelector(state)
});

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        getDialogs
    }),
    withRouter,
    withAuthRedirect
)(DialogsContainer);
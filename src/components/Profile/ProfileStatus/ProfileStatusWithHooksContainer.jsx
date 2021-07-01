import React from 'react';
import {connect} from "react-redux";
import {updateUserStatus} from "../../../redux/profile-reducer";
import {getStatusSelector} from "../../../redux/selectors/profile-selectors";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const mapStateToProps = (state) => ({
    status: getStatusSelector(state)
});

export default connect(mapStateToProps, {
    updateUserStatus
})(ProfileStatusWithHooks);
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {addFriend, getUsers, getUsersChange, removeFriend} from "../../redux/friends-reducer";
import FriendsPresentation from "./FriendsPresentation/FriendsPresentation";
import s from "./FriendsContainer.module.css";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getButtonInProgressSelector,
    getCurrentPageSelector,
    getIsFetchingSelector,
    getPageSizeSelector,
    getTotalCountSelector,
    getUsersSelector
} from "../../redux/selectors/users-selectors";
import {getIsAuthSelector} from "../../redux/selectors/auth-selectors";
import {withRouter} from "react-router-dom";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import SearchBar from "./SearchBar/SearchBar";
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

type MapStatePropsType = {
    users: Array<UserType>,
    totalCount: number,
    pageSize: number,
    currentPage: number,
    isFetching: boolean,
    buttonInProgress: Array<number>,
    isAuth: boolean
}
type MapDispatchPropsType = {
    getUsers: (pageSize: number, currentPage: number) => void
    getUsersChange: (pageSize: number, pageNumber: number) => void,
    removeFriend: (userId: number) => void
    addFriend: (userId: number) => void
}
type OwnPropsType = {
    match: any
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const FriendsContainer: React.FC<PropsType> = (props) => {
    let [pagesCount, setPaginatorCount] = useState(1);
    const pagesCountIsBig = !props.match.params.currentPage ? 1 :
        props.match.params.currentPage < pagesCount ?
            props.match.params.currentPage : pagesCount;
    useEffect(() => {
        props.getUsers(props.pageSize, pagesCountIsBig);
    }, [pagesCount]);

    const onPageChanged = (pageNumber: number): void => {
        props.getUsersChange(props.pageSize, pageNumber);
    };
    const handlePagesCountMath = (count: number): void => {
        setPaginatorCount(count);
    };

    return (
        <Layout>
            <Content className='p-4'>
                {props.isFetching ?
                    <Preloader height='690px'/> :
                    <FriendsPresentation {...props} onPageChanged={onPageChanged}
                                         handlePagesCountMath={handlePagesCountMath}/>}
            </Content>
            <Sider theme={'light'} width={250}>
                <div><SearchBar/></div>
            </Sider>
        </Layout>
    );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    users: getUsersSelector(state),
    totalCount: getTotalCountSelector(state),
    pageSize: getPageSizeSelector(state),
    currentPage: getCurrentPageSelector(state),
    isFetching: getIsFetchingSelector(state),
    buttonInProgress: getButtonInProgressSelector(state),
    isAuth: getIsAuthSelector(state)
});

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        getUsers,
        getUsersChange,
        removeFriend,
        addFriend
    }),
    withRouter
)(FriendsContainer);
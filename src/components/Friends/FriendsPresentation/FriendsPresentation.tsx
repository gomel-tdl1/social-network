import React from 'react'
import s from './FriendsPresentation.module.css'
import Paginator from "../../common/Paginator/Paginator";
import User from "./User";
import {
    getButtonInProgressSelector,
    getCurrentPageSelector, getIsFetchingSelector,
    getPageSizeSelector,
    getTotalCountSelector,
    getUsersSelector
} from "../../../redux/selectors/users-selectors";
import {getIsAuthSelector} from "../../../redux/selectors/auth-selectors";
import {UserType} from "../../../types/types";

type PropsType = {
    users: Array<UserType>,
    totalCount: number,
    pageSize: number,
    currentPage: number,
    isFetching: boolean,
    buttonInProgress: Array<number>,
    isAuth: boolean,
    onPageChanged: (pageNumber: number) => void
    handlePagesCountMath: (count: number) => void
    removeFriend: (userId: number) => void
    addFriend: (userId: number) => void
    match: any //Изменить позже
}

const FriendsPresentation: React.FC<PropsType> = (props) => {
    return (
        <div className={s.content}>
            <Paginator currentPage={+props.match.params.currentPage} totalCount={props.totalCount}
                       pageSize={props.pageSize} onPageChanged={props.onPageChanged} paginatorCount={5}
                       handlePagesCountMath={props.handlePagesCountMath}/>
            {props.users.map(u => (
                <User key={u.id} userId={u.id} photos={u.photos} status={u.status} name={u.name} followed={u.followed}
                      buttonInProgress={props.buttonInProgress} removeFriend={props.removeFriend}
                      addFriend={props.addFriend} isAuth={props.isAuth}/>
            ))}
        </div>
    );
}

export default FriendsPresentation;
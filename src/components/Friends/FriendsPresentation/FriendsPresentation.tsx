import React from 'react'
import User from "./User";
import {UserType} from "../../../types/types";
import Paginator from "../../common/Paginator/Paginator";

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
        <div className='flex flex-col items-center gap-4'>
            <Paginator currentPage={+props.match.params.currentPage} totalCount={props.totalCount}
                       pageSize={props.pageSize} onPageChanged={props.onPageChanged} paginatorCount={5}
                       handlePagesCountMath={props.handlePagesCountMath}/>
            <div className='flex flex-col gap-2'>
                {props.users.map(u => (
                    <User key={u.id} userId={u.id} photos={u.photos} status={u.status} name={u.name}
                          followed={u.followed}
                          buttonInProgress={props.buttonInProgress} removeFriend={props.removeFriend}
                          addFriend={props.addFriend} isAuth={props.isAuth}/>
                ))}
            </div>

        </div>
    );
}

export default FriendsPresentation;
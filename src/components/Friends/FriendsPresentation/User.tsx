import React from 'react'
import s from './FriendsPresentation.module.css'
import unknownAvatar from '../../../assets/images/unknownAvatar.png'
import {NavLink} from "react-router-dom";
import {PhotosType} from "../../../types/types";

type PropsType = {
    userId: number
    photos: PhotosType
    status: string
    name: string
    followed: boolean
    buttonInProgress: Array<number>
    removeFriend: (userId: number) => void
    addFriend: (userId: number) => void
    isAuth: boolean
}

const User: React.FC<PropsType> = (props) => {
    return (
        <div className={s.user}>
            <div className={s.avatar}>
                <NavLink to={`/profile/${props.userId}`}><img
                    src={props.photos.small ? props.photos.small : unknownAvatar}
                    alt=""/></NavLink>
            </div>
            <div className={s.description}>
                <h2 className={s.name}>{`${props.name}`}</h2>
                <p className={s.location}>{`{u.location.city}, {u.location.country}`}</p>
                <p className={s.status}>{props.status}</p>
            </div>
            {props.isAuth ?
                props.followed ?
                    <button className={s.button} disabled={props.buttonInProgress.some(id => id === props.userId)}
                            onClick={() => {
                                props.removeFriend(props.userId)
                            }}>Delete</button> :
                    <button className={s.button} disabled={props.buttonInProgress.some(id => id === props.userId)}
                            onClick={() => {
                                props.addFriend(props.userId)
                            }}>Follow</button>
                : null}
        </div>
    );
}

export default User;
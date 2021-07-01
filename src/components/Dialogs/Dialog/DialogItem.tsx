import React, {FC} from 'react';
import s from './DialogItem.module.css';
import {NavLink} from "react-router-dom";
import unknown from "../../../assets/images/unknownAvatar.png";

type PropsType = {
    name: string
    avatar: string
    id: number
}
const DialogItem: FC<PropsType> = (props) => {
    return (
        <NavLink to={`/dialogs/${props.id}`} activeClassName={s.active} className={s.item}>
            <div className={s.item__avatar}>
                <img src={props.avatar} alt="avatar"/>
            </div>
            <div className={s.item__name}>{props.name}</div>
        </NavLink>
    );
}
export default DialogItem
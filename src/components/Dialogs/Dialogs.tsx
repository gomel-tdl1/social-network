import React, {FC} from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./Dialog/DialogItem";
import unknown from '../../assets/images/unknownAvatar.png';
import {DialogType} from "../../types/types";
import MessagesContainer from "./Messages/MessagesContainer";

type PropsType = {
    dialogsData: Array<DialogType>
    match: any
}
const Dialogs: FC<PropsType> = (props) => {
    const dialogsDataMap = props.dialogsData.map(p => {
        return <DialogItem
            key={p.id}
            name={p.userName}
            avatar={p.photos.small || unknown}
            id={p.id}/>
    });

    return (
        <div className={s.content}>
            <div className={s.dialogs}>
                {dialogsDataMap}
            </div>
            {/*@ts-ignore*/}
            {!!props.match.params.friendId && <MessagesContainer/>}
        </div>
    );
};
export default Dialogs;
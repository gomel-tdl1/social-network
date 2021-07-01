import React, {useEffect, useState} from 'react';
import s from './ProfileStatus.module.css'

const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    };
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    };

    const updateStatus = (e) => {
        setStatus(e.target.value);
    };

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    return (<div className={s.status}>
        {!editMode ?
            <div onDoubleClick={activateEditMode}>
                <span>{props.status}</span>
            </div> :
            <input type="text" autoFocus={true} onChange={updateStatus} onBlur={deactivateEditMode} value={status}/>
        }
    </div>);
};
export default ProfileStatusWithHooks;
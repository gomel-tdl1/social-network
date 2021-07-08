import React, {ChangeEvent, FC, useEffect, useState} from 'react';

type PropsType = {
    status: string | null,
    updateUserStatus: (status: string) => void
}
const ProfileStatusWithHooks: FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState<boolean>(false);
    let [status, setStatus] = useState<string>(props.status ? props.status : '');

    const activateEditMode = () => {
        setEditMode(true);
    };
    const deactivateEditMode = () => {
        setEditMode(false);
        if (status) props.updateUserStatus(status);
    };

    const updateStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value);
    };

    useEffect(() => {
        setStatus(props.status ? props.status : '');
    }, [props.status]);

    return (<div className='min-h-8 min-w-8 max-w-31 -mt-4'>
        {!editMode ?
            <blockquote onDoubleClick={activateEditMode}>
                <span>{props.status}</span>
            </blockquote> :
            <input type="text" autoFocus={true} onChange={updateStatus} onBlur={deactivateEditMode} value={status}/>
        }
    </div>);
};
export default ProfileStatusWithHooks;
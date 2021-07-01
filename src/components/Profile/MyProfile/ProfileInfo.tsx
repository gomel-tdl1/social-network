import React, {ChangeEvent, FC, useState} from 'react'
import s from './ProfileInfo.module.css'
import {NavLink} from "react-router-dom";
import ProfileStatusWithHooksContainer from "../ProfileStatus/ProfileStatusWithHooksContainer";
import EditProfileDescription from "../EditProfileDescription/EditProfileDescForm";
import {ProfileType} from "../../../types/types";
import {Avatar, Button, Upload} from "antd";
import {UploadOutlined, UserOutlined} from '@ant-design/icons';

type PropsType = {
    profile: ProfileType | null,
    authUserId: number | null,
    isOwner: boolean,
    userId: number | null,
    startChatting: (userId: number) => void
    updateProfilePhoto: (file: any) => void
    updateProfileDescription: (data: ProfileType, id: number) => void
}
const ProfileInfo: FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false);

    // @ts-ignore
    let contacts = Object.entries(props.profile.contacts);
    // @ts-ignore
    let isFriend = (+props.userId !== props.authUserId) && (props.userId !== undefined);

    function nullChecker(item: string | null) {
        return item ? item : '';
    }

    const handleChooseNewPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const newProfilePhoto = e.target.files[0];
        if (newProfilePhoto) {
            props.updateProfilePhoto(newProfilePhoto);
        }
    };
    const handleClickEdit = () => {
        setEditMode(true);
    };

    const handleWriteMessageClick = () => {
        if (props.userId) props.startChatting(props.userId);
    };

    return (
        <div className='flex gap-12'>
            <div className='flex flex-col items-center gap-4'>
                <Avatar size={250} src={props.profile?.photos.large ? props.profile.photos.large : <UserOutlined/>}/>
                {props.isOwner &&
                <div>
                    {/*<input type="file" onChange={handleChooseNewPhoto}/>*/}
                    <Upload name='file'
                            headers={{
                                authorization: 'authorization-text',
                            }}>
                        <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                    </Upload>
                </div>}
                {isFriend &&
                <div className='mt-3'>
                    <NavLink to={'/dialogs'}>
                        <button onClick={handleWriteMessageClick}>Write message</button>
                    </NavLink>
                </div>}
            </div>
            {!editMode &&
            <div className={s.profile__description}>
                <div className={s.description__name}>{props.profile?.fullName}</div>
                <ProfileStatusWithHooksContainer/>

                <div className={s.description__info}>
                    <div className={s.description__item} id='aboutMe'>
                        <span className="key">About me: </span>
                        {/*@ts-ignore*/}
                        <span className="value">{nullChecker(props.profile.aboutMe)}</span>
                    </div>
                    <div className={s.description__item} id='searchJob'>
                        <span className="key">Looking job: </span>
                        <span className="value">{props.profile?.lookingForAJob ? 'I search.' : 'I dont search.'}</span>
                    </div>
                    {props.profile?.lookingForAJob &&
                    <div className={s.description__item} id='jobDescription'>
                        <span className="key">Job description: </span>
                        <span className="value">{nullChecker(props.profile.lookingForAJobDescription)}</span>
                    </div>}
                    <div className={s.description__item} id='contacts'>
                        {contacts.map(item => {
                            const key = item[0];
                            const value = item[1];
                            return (
                                <div key={key}>
                                    <span className="key">{key[0].toUpperCase() + key.slice(1)}: </span>
                                    <a href={nullChecker(value)}><span className="value">{nullChecker(value)}</span></a>
                                </div>
                            );
                        })}
                    </div>
                    <button onClick={handleClickEdit} className={s.edit_button}>Edit</button>
                </div>
            </div>}

            {editMode &&
            <EditProfileDescription setEditMode={setEditMode} authUserId={props.authUserId}
                                    updateProfileDescription={props.updateProfileDescription}/>}

        </div>
    );
}

export default ProfileInfo;
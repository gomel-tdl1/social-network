import React, {ChangeEvent, FC, useState} from 'react'
import {NavLink} from "react-router-dom";
import ProfileStatusWithHooksContainer from "../ProfileStatus/ProfileStatusWithHooksContainer";
import EditProfileDescription from "../EditProfileDescription/EditProfileDescForm";
import {ProfileType} from "../../../types/types";
import {Avatar, Image, Button, Typography, Upload} from "antd";
import {UploadOutlined, UserOutlined} from '@ant-design/icons';
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import Paragraph from 'antd/lib/typography/Paragraph';
import Link from 'antd/lib/typography/Link';

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

    function nullChecker(item: string | null | undefined): string {
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
                <Avatar size={250} src={props.profile?.photos.large ? props.profile.photos.large : <UserOutlined style={{
                    fontSize: '100px'
                }}/>} style={{
                    color: '#D2D4D7',
                    backgroundColor: '#ffffff',
                }}/>
                {props.isOwner &&
                <div>
                    <input type="file" onChange={handleChooseNewPhoto}/>
                    {/*<Upload name='file'*/}
                    {/*        headers={{*/}
                    {/*            authorization: 'authorization-text',*/}
                    {/*        }}>*/}
                    {/*    <Button icon={<UploadOutlined/>}>Click to Upload</Button>*/}
                    {/*</Upload>*/}
                </div>}
                {isFriend &&
                <div>
                    <NavLink to={'/dialogs'}>
                        <Button type={'default'} onClick={handleWriteMessageClick}>Write message</Button>
                    </NavLink>
                </div>}
            </div>
            {!editMode &&
            <Typography className='flex flex-col items-start '>
                <Title>{props.profile?.fullName}</Title>
                <ProfileStatusWithHooksContainer/>

                <Paragraph>
                    <div id='aboutMe'>
                        <Text strong className="key">About me: </Text>
                        <Text className="value">{nullChecker(props.profile?.aboutMe)}</Text>
                    </div>
                    <div id='searchJob'>
                        <Text strong className="key">Looking job: </Text>
                        <Text className="value">{props.profile?.lookingForAJob ? 'I search.' : 'I dont search.'}</Text>
                    </div>
                    {props.profile?.lookingForAJob &&
                    <div id='jobDescription'>
                        <Text strong className="key">Job description: </Text>
                        <Text className="value">{nullChecker(props.profile.lookingForAJobDescription)}</Text>
                    </div>}
                </Paragraph>
                <Paragraph id='contacts'>
                    {contacts.map(item => {
                        const key = item[0];
                        const value = item[1];
                        return (
                            <div key={key}>
                                {value && <div className='flex gap-2'>
                                    <Text strong className="text-left w-20">{key[0].toUpperCase() + key.slice(1)}: </Text>
                                    <Link href={nullChecker(value)} target="_blank">{nullChecker(value)}</Link>
                                </div>}
                            </div>
                        );
                    })}
                </Paragraph>
                <Button type="dashed" onClick={handleClickEdit} className='mt-2'>Edit</Button>
            </Typography>}

            {editMode &&
            <EditProfileDescription setEditMode={setEditMode} authUserId={props.authUserId}
                                    updateProfileDescription={props.updateProfileDescription}/>}

        </div>
    );
}

export default ProfileInfo;
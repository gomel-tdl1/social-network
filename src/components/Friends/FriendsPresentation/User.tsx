import React from 'react'
import unknownAvatar from '../../../assets/images/unknownAvatar.png'
import {NavLink} from "react-router-dom";
import {PhotosType} from "../../../types/types";
import {Avatar, Button, Card} from 'antd';
import Title from "antd/es/typography/Title";
import { UserOutlined } from '@ant-design/icons';

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
        <Card hoverable >
            <div className='flex items-center gap-64'>
                <div className='flex items-center gap-10'>
                    <NavLink to={`/profile/${props.userId}`}>
                        <Avatar size={70} src={props.photos.small? props.photos.small : <UserOutlined style={{
                            fontSize: '30px'
                        }}/>} style={{
                            color: '#ffffff',
                            backgroundColor: '#D2D4D7',
                        }}/>
                    </NavLink>
                    <div className=''>
                        <Title level={4}>{`${props.name}`}</Title>
                        <div>
                            <p className=''>{`{u.location.city}, {u.location.country}`}</p>
                            <p className=''>{props.status}</p>
                        </div>
                    </div>
                </div>
                <div>
                    {props.isAuth ?
                        props.followed ?
                            <Button type={'primary'} danger disabled={props.buttonInProgress.some(id => id === props.userId)}
                                    onClick={() => {
                                        props.removeFriend(props.userId)
                                    }}>Delete</Button> :
                            <Button type={'primary'} disabled={props.buttonInProgress.some(id => id === props.userId)}
                                    onClick={() => {
                                        props.addFriend(props.userId)
                                    }}>Follow</Button>
                        : null}
                </div>
            </div>
        </Card>
    );
}

export default User;
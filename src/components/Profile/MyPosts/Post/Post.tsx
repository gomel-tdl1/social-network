import React, {FC} from 'react';
import {Avatar} from "antd";
import {LikeTwoTone, UserOutlined} from '@ant-design/icons';

type PropsType = {
    message: string
    likesCount: number
    avatar: string | Element
}

const Post: FC<PropsType> = (props) => {
    return (
        <div className='flex gap-6 items-center py-4'>
            <Avatar size={50} src={props.avatar ? props.avatar : <UserOutlined/>}/>
            <div className='flex flex-col items-start'>
                <div className=''>{props.message}</div>
                <div className='flex gap-2 items-center'>
                    <div className=''>Likes: {props.likesCount}</div>
                    <LikeTwoTone onClick={() => {
                        return
                    }} twoToneColor="#0085FF"/>
                </div>

            </div>
        </div>
    );
}

export default Post;
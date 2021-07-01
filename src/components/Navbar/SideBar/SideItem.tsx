import React from "react-dom";
import unknown from '../../../assets/images/unknownAvatar.png'
import {FC} from "react";
import {Avatar} from "antd";
import { UserOutlined } from "@ant-design/icons";

type PropsType = {
    name: string
    avatar: string | null
}
const SideItem: FC<PropsType> = (props) => {
    return (
        <div className='flex items-center gap-2 pl-4'>
            <Avatar src={props.avatar ? props.avatar : <UserOutlined />}/>
            <div className=''>{props.name}</div>
        </div>
    );
}
export default SideItem
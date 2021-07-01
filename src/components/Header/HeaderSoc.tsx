import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import logout from '../../assets/images/Header/log-out.png'
import {HeaderPropsType} from "./HeaderContainer";
import {Header} from 'antd/lib/layout/layout';
import {Avatar} from "antd";
import {LogoutOutlined, UserOutlined} from '@ant-design/icons';

const HeaderSoc: FC<HeaderPropsType> = React.memo((props) => {
    return (
        <Header className='flex item-center justify-between'>
            <Avatar shape={'square'} size={62}
                    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMpnedANDT8qHb79WEcoCEYx20wvFvpUEsNg&usqp=CAU"}/>
            <div className='flex items-center gap-2'>
                {!props.isAuth ? <NavLink to={'/login'}>Login</NavLink> :
                    <NavLink to={`/profile/${props.userId}`}>
                        <div className='flex items-center'>
                            <Avatar src={props.avatar ? props.avatar : <UserOutlined/>}/>
                            <p>{props.login}</p>
                        </div>
                    </NavLink>}
                <div onClick={props.logout}>
                    <Avatar icon={<LogoutOutlined />} />
                </div>
            </div>
        </Header>
    );
});

export default HeaderSoc;
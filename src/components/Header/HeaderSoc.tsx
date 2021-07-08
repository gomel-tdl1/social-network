import React, {FC} from 'react';
import { NavLink} from "react-router-dom";
import {HeaderPropsType} from "./HeaderContainer";
import {Header} from 'antd/lib/layout/layout';
import {Avatar, Button} from "antd";
import {LogoutOutlined, UserOutlined} from '@ant-design/icons';
import Link from 'antd/lib/typography/Link';

const HeaderSoc: FC<HeaderPropsType> = React.memo((props) => {
    return (
        <Header className='flex item-center justify-between'>
            <Avatar shape={'square'} size={62}
                    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMpnedANDT8qHb79WEcoCEYx20wvFvpUEsNg&usqp=CAU"}/>
            <div className='flex items-center gap-6'>
                {!props.isAuth ? <NavLink to={'/login'}><Link>Sign in</Link></NavLink> :
                    <NavLink to={`/profile/${props.userId}`}>
                        <div className='flex items-center gap-3 px-2 h-10 rounded-2xl border-solid bg-gray-50'>
                            <Avatar src={props.avatar ? props.avatar : <UserOutlined/>}/>
                            <Link className='mb-0'>{props.login}</Link>
                        </div>
                    </NavLink>}
                <Button shape="circle" icon={<LogoutOutlined />} onClick={props.logout}/>
            </div>
        </Header>
    );
});

export default HeaderSoc;
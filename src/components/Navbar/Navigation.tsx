import React, {FC} from 'react';
import {Menu} from "antd";
import {GlobalOutlined, MessageOutlined, SettingOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import {NavLink, useHistory} from "react-router-dom";
import SideBarContainer from "./SideBar/SideBarContainer";

type PropsType = {}
const Navigation: FC<PropsType> = React.memo((props) => {
    let history = useHistory();
    let defaultSelectedKey = history.location.pathname.toLowerCase().split('/')[0];

    return (
        <Menu
            style={{width: 299,
            borderRight: '1px solid #E5E7EB'}}
            defaultSelectedKeys={[defaultSelectedKey]}
            mode={'vertical'}
            theme={'light'}
        >
            <Menu.Item key="profile" icon={<UserOutlined/>}>
                <NavLink to={`/profile`}>Profile</NavLink>
            </Menu.Item>
            <Menu.Item key="news" icon={<GlobalOutlined/>}>
                <NavLink to={`/news`}>News</NavLink>
            </Menu.Item>
            <Menu.Item key="dialogs" icon={<MessageOutlined/>}>
                <NavLink to={`/dialogs`}>Messages</NavLink>
            </Menu.Item>
            <Menu.Item key="friends" icon={<TeamOutlined/>}>
                <NavLink to={`/friends`}>Friends</NavLink>
            </Menu.Item>
            <Menu.Item key="setting" icon={<SettingOutlined/>}>
                <NavLink to={`/setting`}>Settings</NavLink>
            </Menu.Item>
            <SideBarContainer/>
        </Menu>

    );
});

export default Navigation;
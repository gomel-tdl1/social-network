import React, {FC} from 'react';
import {DialogType} from "../../types/types";
import MessagesContainer from "./Messages/MessagesContainer";
import { Layout, Menu} from 'antd';
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import {NavLink, useHistory} from "react-router-dom";
import {UserOutlined} from '@ant-design/icons';
import Avatar from "antd/es/avatar";

type PropsType = {
    dialogsData: Array<DialogType>
    match: any
}
const Dialogs: FC<PropsType> = (props) => {
    let history = useHistory();
    let defaultSelectedKey = history.location.pathname;

    return (
        <Layout className='h-full'>
            <Sider theme={'light'} style={{
                borderRight: '1px solid #E5E7EB',
                borderBottom: '1px solid #E5E7EB'
            }}>
                <Menu
                    style={{
                        width: 200,
                        borderRight: '1px solid #E5E7EB'
                    }}
                    defaultSelectedKeys={[defaultSelectedKey]}
                    mode={'vertical'}
                    theme={'light'}
                >
                    {props.dialogsData.map(p => {
                        return (
                            <Menu.Item key={`/dialogs/${p.id}`}>
                                <div className='flex items-center gap-2'>
                                    <Avatar src={p.photos.small? p.photos.small : <UserOutlined/>} style={{
                                        color: '#ffffff',
                                        backgroundColor: '#D2D4D7',
                                    }}/>
                                    <NavLink to={`/dialogs/${p.id}`} >{p.userName}</NavLink>
                                </div>
                            </Menu.Item>
                        )
                    })}
                </Menu>
            </Sider>
            <Content>
                {/*@ts-ignore*/}
                {!!props.match.params.friendId && <MessagesContainer/>}
            </Content>
        </Layout>
    );
};
export default Dialogs;
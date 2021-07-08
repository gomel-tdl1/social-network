import React, {ComponentType, FC, useEffect} from 'react';
import './App.less';
import Navigation from "./components/Navbar/Navigation";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";
import {getErrorMessage, getInitialized} from "./redux/selectors/app-selector";
import {Layout, notification} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";

// @ts-ignore
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
// @ts-ignore
const FriendsContainer = React.lazy(() => import("./components/Friends/FriendsContainer"));
// @ts-ignore
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const Login = React.lazy(() => import("./components/Login/Login"));

type MapStateToPropsType = {
    initialized: boolean,
    errorMessage: string | null
}
type MapDispatchToPropsType = {
    initializeApp: () => void
}
type OwnPropsType = {}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

const App: FC<PropsType> = (props) => {
    const catchAllUnhandledErrors = (reason: any, promise: any) => {
        alert(reason)
    };

    useEffect(() => {
        props.initializeApp();
    }, [props.initializeApp]);
    useEffect(() => {
        // @ts-ignore
        window.addEventListener('unhandledrejection', catchAllUnhandledErrors);
        // @ts-ignore
        return window.removeEventListener('unhandledrejection', catchAllUnhandledErrors);
    }, []);
    useEffect(() => {
        if(props.errorMessage){
            notification.error({
                key: 'updatable',
                message: props.errorMessage
            })
        }
    }, [props.errorMessage]);

    if (!props.initialized) return <Preloader height={'700px'}/>;

    return (
        <Layout>
            <HeaderContainer/>
            <Layout>
                <Sider width={300} theme={'light'} className='border'>
                    <Navigation/>
                </Sider>
                <Content className='relative h-full'>
                    <Switch>
                        <Route exact path='/'
                               render={() => <Redirect to={"/profile"}/>}/>

                        <Route path='/profile/:userId?'
                               render={withSuspense(ProfileContainer)}/>
                        <Route path='/dialogs/:friendId?'
                               render={withSuspense(DialogsContainer)}/>
                        <Route path='/friends/:currentPage?'
                               render={withSuspense(FriendsContainer)}/>
                        <Route path='/login'
                               render={withSuspense(Login)}/>

                        <Route path='*'
                               render={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    initialized: getInitialized(state),
    errorMessage: getErrorMessage(state)
});

const AppWithRouter = compose<ComponentType>(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {initializeApp})
)(App);

const MainApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppWithRouter/>
            </Provider>
        </BrowserRouter>
    );
};
export default MainApp;
import React from 'react'
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControl/FormsControl";
import {required} from "../../utils/validators";
import s from './Login.module.css'
import {connect} from "react-redux";
import {loginOnSite} from "../../redux/auth-reducer";
import {getCaptchaSelector, getIsAuthSelector, getIsCaptchaNeedSelector} from "../../redux/selectors/auth-selectors";

function LoginForm(props) {
    return (
        <form onSubmit={props.handleSubmit} className={s.form}>
                {createField(Input, 'email', [required], 'Email...')}
                {createField(Input, 'password', [required], 'Password...', {
                    type: 'password'
                })}
                {createField('input', 'rememberMe', null, null, {
                    type: 'checkbox',
                }, 'Remember me', s.remember)}
            <div className={s.formSummaryError}>
                {props.error}
            </div>
            {props.isCaptchaNeed && (<div className={s.captcha}>
                <div>
                    <img src={props.captcha} alt=""/>
                </div>
                <div>
                    {createField(Input, 'captcha', [required], 'Text on image...')}
                </div>
            </div>)}
            <div>
                <button disabled={props.isAuth}>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

const Login = (props) => {
    const onSubmit = (data) => {
        props.loginOnSite(data.email, data.password, data.rememberMe, data.captcha)
    };

    return (
        <div className={s.content}>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} {...props}/>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuth: getIsAuthSelector(state),
    captcha: getCaptchaSelector(state),
    isCaptchaNeed: getIsCaptchaNeedSelector(state)
});

export default connect(mapStateToProps, {loginOnSite})(Login);
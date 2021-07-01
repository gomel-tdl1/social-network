import React from 'react';
import s from './Error.module.css'
import error from '../../../assets/images/error.png'

const ErrorComponent = (props) => {
    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <div className={s.icon}><img src={error} alt=""/></div>
                {props.message}
            </div>
        </div>
    );
};
export default ErrorComponent;
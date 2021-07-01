import React from "react";
import s from './FormsControl.module.css'
import {Field} from "redux-form";

const FormControl = ({input, meta, element, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={`${s.formControl} ${hasError && s.error}`}>
            <div className={hasError ? s.error : undefined}>
                {React.createElement(element, {...input, ...props})}
            </div>
            {hasError && (element !== 'textarea') ?
                <span>{meta.error}</span> :
                hasError && <div>{meta.error}</div>}
        </div>
    );
};

export const Textarea = (props) => {
    return (
        <FormControl {...props} element={'textarea'}/>
    );
};

export const Input = (props) => {
    return (
        <FormControl {...props} element={'input'}></FormControl>
    );
};

export const createField = (component, name, validators, placeholder, props, text = '', className = null) => (
    <div className={className}>
        <Field component={component} name={name} validate={validators}
               placeholder={placeholder} {...props}/>{text}
    </div>

);
import {createField, Input} from "../../common/FormsControl/FormsControl";
import {required} from "../../../utils/validators";
import {InjectedFormProps, reduxForm} from "redux-form";
import React, {FC} from "react";
import {ProfileType} from "../../../types/types";
import {Button} from "antd";

type EditDescriptionType = {
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    facebook: string
    github: string
    instagram: string
    mainLink: string
    twitter: string
    vk: string
    website: string
    youtube: string
}
const EditProfileDescForm: FC<InjectedFormProps<EditDescriptionType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField(Input, 'fullName', [required], 'Full name...')}
            {createField(Input, 'aboutMe', [required], 'About me...')}
            {createField('input', 'lookingForAJob', null, null, {
                type: 'checkbox',
            }, 'Looking for a job')}
            {createField(Input, 'lookingForAJobDescription', [required], 'Description...')}
            {createField(Input, 'facebook', null, 'Facebook...')}
            {createField(Input, 'github', null, 'GitHub...')}
            {createField(Input, 'instagram', null, 'Instagram...')}
            {createField(Input, 'mainLink', null, 'Main link...')}
            {createField(Input, 'twitter', null, 'Twitter...')}
            {createField(Input, 'vk', null, 'VK...')}
            {createField(Input, 'website', null, 'website...')}
            {createField(Input, 'youtube', null, 'YouTube...')}
            <div>
                {props.error}
            </div>
            <div>
                <Button type={'primary'} htmlType={'submit'}>Send</Button>
            </div>
        </form>
    );
}

const EditProfileDescReduxForm = reduxForm<EditDescriptionType>({
    form: 'editProfileDescription'
})(EditProfileDescForm);

type PropsType = {
    setEditMode: (editMode: boolean) => void
    authUserId: number | null,
    updateProfileDescription: (data: ProfileType, id: number) => void
}
const EditProfileDescription: FC<PropsType> = (props) => {
    const onSubmit = (data: any) => {
        props.setEditMode(false);
        if (props.authUserId) props.updateProfileDescription(data, props.authUserId);
        console.log(data)
    };

    return (
        <div>
            <EditProfileDescReduxForm onSubmit={onSubmit}/>
        </div>
    );
};
export default EditProfileDescription;
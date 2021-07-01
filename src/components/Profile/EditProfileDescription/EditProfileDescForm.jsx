import {createField, Input} from "../../common/FormsControl/FormsControl";
import {required} from "../../../utils/validators";
import {reduxForm} from "redux-form";
import React from "react";

function EditProfileDescForm(props) {
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
                <button>Save</button>
            </div>
        </form>
    );
}

const EditProfileDescReduxForm = reduxForm({
    form: 'editProfileDescription'
})(EditProfileDescForm);

const EditProfileDescription = (props) => {
    const onSubmit = (data) => {
        props.setEditMode(false);
        props.updateProfileDescription(data, props.authUserId);
        console.log(data)
    };

    return (
        <div>
            <EditProfileDescReduxForm onSubmit={onSubmit}/>
        </div>
    );
};
export default EditProfileDescription;
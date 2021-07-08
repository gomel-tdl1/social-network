import React, {FC} from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import unknown from '../../../assets/images/unknownAvatar.png'
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../../common/FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../../utils/validators";
import {PropsTypeForMyPosts} from "./MyPostsContainer";
import { Button } from 'antd';

const MyPosts: FC<PropsTypeForMyPosts> = React.memo((props) => {
    function addNewPost(data: any) {
        if (props.profile?.userId) props.addPost(props.profile.userId, data.newPostText);
    }

    return (
        <div className={s.container}>
            <h2 className={s.title}>My Posts</h2>
            <MyPostReduxForm onSubmit={addNewPost}/>
            <div className={s.content}>
                {props.posts && props.posts.map(post => {
                    return <Post message={post.message} likesCount={post.likesCount} key={post.id}
                                 avatar={props.profile?.photos.small ? props.profile.photos.small : unknown}/>
                })}
            </div>
        </div>
    );
});

const maxLength100 = maxLengthCreator(100);

type AddPostDataType = {
    newPostText: string
}

const MyPostForm: FC<InjectedFormProps<AddPostDataType>> = (props) => {
    return (
        <form className={s.main}>
            {createField(Textarea, 'newPostText', [required, maxLength100], 'Your news...')}
            <Button type={'primary'} onClick={props.handleSubmit}>Send</Button>
        </form>
    );
};
const MyPostReduxForm = reduxForm<AddPostDataType>({
    form: 'newPost'
})(MyPostForm);

export default MyPosts;
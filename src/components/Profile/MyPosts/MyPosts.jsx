import React from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import unknown from '../../../assets/images/unknownAvatar.png'
import {reduxForm} from "redux-form";
import {createField, Textarea} from "../../common/FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../../utils/validators";

const MyPosts = React.memo((props) => {
    function addNewPost(data) {
        props.addPost(props.profile.userId, data.newPostText);
    }

    return (
        <div className={s.container}>
            <h2 className={s.title}>My Posts</h2>
            <MyPostReduxForm onSubmit={addNewPost}/>
            <div className={s.content}>
                {props.posts.map(post => {
                    return <Post message={post.message} likesCount={post.likesCount} key={post.id}
                                 avatar={props.profile.photos.small ? props.profile.photos.small : unknown}/>
                })}
            </div>
        </div>

    );
});

const maxLength100 = maxLengthCreator(100);

const MyPostForm = (props) => {
    return (
        <form className={s.main} onSubmit={props.handleSubmit}>
            {createField(Textarea, 'newPostText', [required, maxLength100], 'Your news...')}
            <button>Send</button>
        </form>
    );
};
const MyPostReduxForm = reduxForm({
    form: 'newPost'
})(MyPostForm);

export default MyPosts;
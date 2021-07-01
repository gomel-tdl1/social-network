import React from 'react';
import s from './Post.module.css'

function Post(props) {
    return (
        <div className={s.post}>
            <div className={s.post__image}><img
                src={props.avatar} alt=""/></div>
            <div className={s.text}>{props.message}</div>
            <div className={s.like}>Like {props.likesCount}</div>
        </div>
    );
}

export default Post;
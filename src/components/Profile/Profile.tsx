import React, {FC} from 'react';
import ProfileInfo from "./MyProfile/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../common/Preloader/Preloader";
import {PropsPCType} from "./ProfileContainer";

type PropsType = PropsPCType & {
    isOwner: boolean
}
const Profile: FC<PropsType> = (props) => {
    if (!props.profile || props.isFetching) return <Preloader height={'500px'}/>;
    return (
        <main className='relative py-4 px-8 w-full box-border flex flex-col gap-8'>
            <ProfileInfo profile={props.profile} userId={props.match.params.userId} authUserId={props.authUserId}
                         startChatting={props.startChatting} isOwner={props.isOwner}
                         updateProfilePhoto={props.updateProfilePhoto}
                         updateProfileDescription={props.updateProfileDescription}/>
            <MyPostsContainer/>
        </main>
    );
}

export default Profile;
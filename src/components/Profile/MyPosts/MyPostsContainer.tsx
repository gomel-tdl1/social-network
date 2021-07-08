import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {actionsProfile} from "../../../redux/profile-reducer";
import {getPostsDataSelector, getProfileSelector} from "../../../redux/selectors/profile-selectors";
import {PostType, ProfileType} from "../../../types/types";
import {AppStateType} from "../../../redux/redux-store";

let {addPost} = actionsProfile;

type MapStatePropsType = {
    posts: PostType[] | null,
    profile: ProfileType | null
}
type MapDispatchPropsType = {
    addPost: (id: number, text: string) => ReturnType<typeof addPost>
}
type OwnPropsType = {}
export type PropsTypeForMyPosts = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

function mapStateToProps(state: AppStateType): MapStatePropsType {
    return ({
        posts: getPostsDataSelector(state),
        profile: getProfileSelector(state)
    });
}

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    addPost
})(MyPosts);
export default MyPostsContainer;
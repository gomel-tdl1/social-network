import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {addPost} from "../../../redux/profile-reducer";
import {getPostsDataSelector, getProfileSelector} from "../../../redux/selectors/profile-selectors";

function mapStateToProps(state) {
    return ({
        posts: getPostsDataSelector(state),
        profile: getProfileSelector(state)
    });
}

const MyPostsContainer = connect(mapStateToProps, {
    addPost
})(MyPosts);
export default MyPostsContainer;
import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from "socket.io-client";
import { addLike, removeLike, addComment, addCommentLike, removeCommentLike } from '../../actions/post';
import LoadingSpinner from '../layout/spinner';
import { getCurrentProfile } from '../../actions/profile';
import { getCurrentPost } from '../../actions/post';
import { getPosts } from '../../actions/post';
import SideBar from "./SideBar";
import RightSideBar from "./RightSideBar";
import InputField from "./InputField";
import Header from "./Header";
import Profile from "./Profile";
import PostItem from "./PostItem";
import { loadUser } from '../../actions/auth';
import Input from '../layout/Input'
import Alert from '../layout/Alert';



const socket = io.connect('http://localhost:4000')




const Timeline = ({ getCurrentProfile, loadUser, getCurrentPost, post: { posts, comments, feedLoader }, auth: { user }, profile: { profile, loading } }) => {
    const [value, setValue] = useState(false);

    useEffect(() => {
        
        (async () => {
          await socket.on('connect', function () {
                console.log('connected!')
            })
            
            await loadUser()
            await getCurrentProfile()
            await getCurrentPost()
        })();
       
    }, [])

    const handleTarget = () => {

        setValue(!value)
        console.log({ value })
    }

    const handleClose = () => {

        setValue(false)
        console.log({ value })
    }


    return loading && profile == null ? (
        <LoadingSpinner />
    ) : (
            <Fragment>
                <div id="wrapper">
                    <SideBar />
                    <div className="main_content">
                        <Header />
                        <div className="main_content_inner">
                        <Input user={user} profile={profile} onClick={handleClose} value={value}/>
                            <Profile profile={profile} user={user} onClick={handleTarget}/>

                            <div className="section-small">
                                <div uk-grid className="uk-grid">
                                    <div className="uk-width-2-3@m fead-area uk-first-column">
                                        <div className="post-newer mt-lg-2" >
                                            <InputField user={user} profile={profile} />

                                        </div>
                                        {posts.length > 0 ? posts.map((post, key) => (
                                            <PostItem key={post.file_id} post={post} commentLikes={comments} profile={user} postId={post.file_id} />
                                        )) :

                                            feedLoader ? <LoadingSpinner /> :
                                                <div className="post">
                                                    <div className="post-heading" style={{ padding: '0px' }}>

                                                        <div className="post-title" style={{ height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <h4> No feeds Available</h4>
                                                        </div>
                                                    </div>

                                                </div>

                                        }

                                    </div>
                                    <RightSideBar />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Alert />
            </Fragment>

    )

}

Timeline.PropTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
    getCurrentPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post,
    profile: state.profile
})


export default connect(mapStateToProps, { getCurrentPost, loadUser, getCurrentProfile })(Timeline);
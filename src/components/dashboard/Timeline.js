import React, { useEffect, useState, Fragment} from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Redirect, useLocation, NavLink, Link} from 'react-router-dom';
import io from "socket.io-client/dist/socket.io.js";

import { addLike, removeLike, addComment, addCommentLike, removeCommentLike } from '../../actions/post';
import LoadingSpinner from '../layout/spinner';
import { getCurrentProfile, confirmFriend } from '../../actions/profile';
import { getProfileById } from '../../actions/profile';

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
import { addFriend } from '../../actions/profile';
import { setAlert } from '../../actions/alert';


import {BrowserRouter, useHistory,  useParams } from 'react-router-dom';


const socket = io.connect('https://devbook-node.herokuapp.com', { 'forceNew': true })





const Timeline = ({setAlert,confirmFriend, addFriend, getCurrentProfile, getProfileById, loadUser, auth:{user}, getCurrentPost, post: { posts, comments, feedLoader }, profile: { profile, loading } }) => {
    const [value, setValue] = useState(false);
    const dispatch = useDispatch()
    let { user_id } = useParams();

    const location = useLocation();

    // useEffect(() => {
    //     socket.on('connect', function () {
    //         console.log('connected!')

    //     })
      
    //         return () => {
    //             socket.off('disconnect');
    //         };

    // }, [])

    const { state } = location;

    console.log('ghghgh', state)

    useEffect(() => {
        const fetchData = async () => {
            //    await loadUser()
               await getProfileById(user_id)
                // getCurrentProfile()
               await getCurrentPost()

            //    state.setNewClick(true)

               
        
                // socket.on('add_friend', function (data) {
                //     console.log(data);
                //     console.log('flld',user)
                //     if(data.receiver == user._id){
                //         dispatch(addFriend(data))
                //     }
                // })
             }
           
             fetchData();
        // socket.on('confirm_friend', function (data) {
        //     console.log(data);
        //     // console.log('we', user._id);
        //     // alert('here33')
        //     // if(data.receiver == user._id){
        //         dispatch(confirmFriend(data))
        //         socket.off("confirm_friend");
        //         setAlert('Request Accepted', 'success');
        //     // }
          
        //     // setComment("");
        //     // setIsLoading(false);
        //     // setEmmited(false)
        //     // setEmitComment(false);
        // })
        
    }, [user_id])


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
                    <div className="main_content" style={{marginLeft:"0px"}}>
                        {/* <Header /> */}
                        <div className="main_content_inner">
                        <Input user={user} profile={profile} onClick={handleClose} value={value}/>
                            <Profile profile={profile} user={user} friendRequests={profile.friendRequests} onClick={handleTarget}/>

                            <div className="section-small">
                                <div uk-grid className="uk-grid">
                                    <div className="uk-width-2-3@m fead-area uk-first-column">
                                        <div className="post-newer mt-lg-2" >
                                            <InputField socket={socket} user={user} profile={profile} />

                                        </div>
                                        {posts.length > 0 ? posts.map((post, key) => (
                                        // <PostItem key={key} socket={socket} post={post} likes={post.likes}commentLikes={comments} profile={user} postId={post.file_id} />

                                            <PostItem key={key} socket={socket} post={post} likes={post.likes} commentLikes={comments} profile={user} postId={post.file_id} />
                                        )) 
                                        :

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
                                    <RightSideBar socket={socket} profile={profile} friendsList={profile.friendsList} friendRequests={profile.friendRequests} user={user}/>
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
    setAlert: PropTypes.func.isRequired,
    confirmFriend: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
    getProfileById: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
    getCurrentPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    addFriend: PropTypes.func.isRequired,

}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post,
    profile: state.profile
})


export default connect(mapStateToProps, { getCurrentPost, setAlert, confirmFriend, loadUser, getProfileById, getCurrentProfile, addFriend })(Timeline);
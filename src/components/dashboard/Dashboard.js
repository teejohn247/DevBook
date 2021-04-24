import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect, useLocation, } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import LoadingSpinner from '../layout/spinner';
import { setAlert } from '../../actions/alert';
import { getCurrentProfile, confirmFriend, getProfiles, getProfileById } from '../../actions/profile';
import { getCurrentPost } from '../../actions/post';
import { getPosts } from '../../actions/post';
import { loader, removeLoader } from '../../actions/loader';
import { addStory, getStory } from '../../actions/story';
import { loadUser } from '../../actions/auth';
import PostItem from './PostItem';
import io from "socket.io-client/dist/socket.io.js";
import SocketIOFileUpload from 'socketio-file-upload';
import Alert from '../layout/Alert';
import SideBar from "./SideBar";
import store from "../../store"
import AllStories from "./AllStories";
import Online from "./Online";
import RightSideBar from "./RightSideBar";
import InputField from "./InputField";
import Header from "./Header";
import Story from "./Story";
import {  addLike, removeLike,  addComment, addCommentLike, removeCommentLike } from '../../actions/post';
import {  addNotification, fetchNotifications, removeNotification } from '../../actions/notification';




const socket = io.connect('http://localhost:4000', { 'forceNew': true })

// let socket;


const Dashboard = ({getProfiles, addNotification, getProfileById, fetchNotifications, loadUser, online, addStory, getStory, loader, removeLoader, confirmFriend, getPosts, getCurrentPost, getCurrentProfile, addLike, removeLike, addComment, addCommentLike, removeCommentLike, post: { posts, comments, feedLoader }, profile: { profile, loading } }) => {
    console.log({ loader })
    // const [selectetdFile, setSelectedFile] = useState([]);
    // const [post, setPost] = useState("");
    // const [emmited, setEmmited] = useState(false);
    // const [postField, setPostField] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);
    // const [postInput, setPostInput] = useState(false);
    // const dispatch = useDispatch();

    const location = useLocation();


    // var post_id = Date.now() + Number(localStorage.getItem('user_id'))


    // const [post, setPost] = useState("");




    // const [files, setFiles] = useState([]);


    useEffect(() => {
     
        getCurrentPost()

    }, [])





    // console.log(profile)

    // const [selectetdFile, setSelectedFile] = useState([]);
    // const [post, setPost] = useState("");
    // const [emmited, setEmmited] = useState(false);
    // const [postField, setPostField] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);
    // const [postInput, setPostInput] = useState(false);
    // const dispatch = useDispatch();

    const [comment, setComment] = useState("");

    const [selectetdFile, setSelectedFile] = useState([]);
    const [post, setPost] = useState("");
    const [emitComment, setEmitComment] = useState(false);
    const [like, setLike] = useState(false);
    const [emmited, setEmmited] = useState(false);
    const [postField, setPostField] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);
    const [postInput, setPostInput] = useState(false);
    const [chat, setChat] = useState(false);
    const [use, setUse] = useState("");

    const dispatch = useDispatch();

    var state = store.getState()
    var user = state.auth.user

    console.log('mmmt', user)


    // useEffect(() => {
    //     async () => {
    //         // await loadUser()
    //         // console.log({user})
    //         await getProfileById(user._id)
    //     })()
    //   }, [user])


    useEffect(() => {
        const fetchData = async () => {

            await loadUser()
            // const state = await store.getState()
            // let user = state.auth.user
            console.log({user})
            // if(user._id){
            await getProfileById(localStorage.getItem('user'))
            // }

        }
        fetchData()

    }, [])


    // const [value, setValue] = useState("");

 
    
    const handleChat = (e) => {
        e.preventDefault();
        setChat(!chat)
    }

    function handleChange(newValue) {
        setPost(newValue);
        console.log({ post })
    }


 

    // useEffect(() => {
    // //     // socket.on('connect', function () {
    // //     //     console.log('connected!')
    // //     // })
    // //     // loader(true)
    //     const fetchData = async () => {
    //         // await loadUser()
    //         // await getCurrentProfile();
    //         // await getCurrentPost()
    //         // await getStory()
    //         // await getProfiles()
    //         // await fetchNotifications()

    //         // setUse(auth.user)
    //     }

    //     fetchData();
    // //     // return () => {
    // //     //     socket.off('disconnect');
    // //     // };

    // }, [location]);


    useEffect(() => {

        socket.on('add_comment', function (data) {
            console.log(data);
            // alert('here33')
            dispatch(addComment(data))
            const state = store.getState()
            let user = state.auth.user
            console.log({user})
            console.log('ggggg', user._id)
            if(data.user != user._id){
            dispatch(addNotification(data))
            }

            // socket.off("add_comment");
            // setComment("");
            // setIsLoading(false);
            // setEmmited(false)
            // setEmitComment(false);

        })



        socket.on('confirm_friend', function (data) {
            console.log(data);
            var us = store.getState()
            console.log({ us })


            // if(data.receiver == us.auth.user._id){
            // dispatch(confirmFriend(data))
            // socket.off("confirm_friend");
            // setAlert('Request Accepted', 'success');
            // }
            // alert('here33')
            // dispatch(confirmFriend(data))
            // socket.off("add_comment");
            // setComment("");
            // setIsLoading(false);
            // setEmmited(false)
            // setEmitComment(false);
        })

        // if (userLike == true) {
        // if (data.like = add) {

        // alert('here3')
        socket.on('like_post', function (data) {
            setLike(data.like)
            console.log({ data })
            console.log({ like })
            if (data.like == "add") {
                console.log(data);
                dispatch(addLike(data))
                const state = store.getState()
                let user = state.auth.user
                console.log({user})
                console.log('ggggg', user._id)
                if(data.user != user._id){
                dispatch(addNotification(data))
                }
            } else if (data.like == "remove") {
                console.log(data);
                dispatch(removeLike(data))
            }

            // socket.off("like_post");
            // setUserLike(false)
            // setEmitComment(false);
            // setEmmited(false)
        })

        socket.on('comment_like', function (data) {
            console.log(data);
            if (data.like == "add") {
                console.log(data);
                console.log("add");


                dispatch(addCommentLike(data))
                const state = store.getState()
                let user = state.auth.user
                console.log({user})
                console.log('ggggg', user._id)
                if(data.user != user._id){
                dispatch(addNotification(data))
                }

            } else if (data.like == "remove") {
                console.log(data);
                console.log("remove");

                dispatch(removeCommentLike(data))

            }
            // socket.off("comment_like");
            // setCommentLike(true)
            // setClEmmited(false)
            // return
        })
        // }
        //  else if(data.like = remove){
        //     socket.on('like_post', function (data) {
        //         console.log(data);
        //         dispatch(removeLike(data))
        //         // socket.off("like_post");
        //         // setUserLike(false)
        //         // setEmitComment(false);
        //         // setEmmited(false)
        //     })
        // }

        // if (emmited == true) {
        socket.on('post', function (data) {
            console.log(data);
            // const frnds = []

            // profile.friendsList.map((frnd,i) => {
            //     console.log('vcv',frnd.user)
            //     frnds.push(frnd.user)
            // })

            // console.log(frnds)

            // if()



            // getPosts(data)
            // socket.off("post");
            setPost("")
            setIsLoaded(false)
            // setEmmited(false)
            setPostInput(false)
            setPostField(false)
            // setIsLoading(!loader)
            setTimeout(() => {
              removeLoader()
            }, 1000);


        })

        socket.on('post', function (data) {
            console.log(data);


            dispatch(getPosts(data))
            // socket.off("post");
            setPost("")
            setIsLoaded(false)
            // setEmmited(false)
            setPostInput(false)
            setPostField(false)


        })

        socket.on('story', function (data) {
            console.log(data);
            dispatch(addStory(data))
            // addStory(data)
            // socket.off("post");

        })


        socket.on('post_with_images', function (data) {
            console.log(data);
            var arr = []
            data.images.map(async (file, i) => {
                var new_obj = {};
                new_obj.file_id = data.file_id;
                new_obj.image = file;
                arr.push(new_obj);
            })


            let msg = {
                email: data.email,
                file_id: data.file_id,
                images: arr,
                likes: [],
                name: data.name,
                user_image: data.user_image,
                date: data.date,
                text: data.text,
                time: data.time,
                user_id: data.user_id
            }

            // dispatch(getPosts(data))
            // // socket.off("post");
            // setPost("")
            // setIsLoaded(false)
            // // setEmmited(false)
            // setPostInput(false)
            // setPostField(false)



            dispatch(getPosts(msg))
            socket.off('post_with_images')
            setPost("")
            setSelectedFile([])
            setIsLoaded(false)
            setPostField(false)
            // setIsLoading(false)
            setPostInput(false)
            // setEmmited(false)

            setTimeout(() => {
                removeLoader()
              }, 1000);



        })
        // }
    }, [emmited, comment])

  
    return loading && profile == null ? (
        <LoadingSpinner />
    ) : (
            <Fragment>
                <div id="wrapper">
                    <SideBar />

                    {/* contents */}
                    {/* <div className="main_content"> */}

                        {/* <Header /> */}

                        <div className="main_content_inner">
                            <div className="uk-grid" uk-grid>
                                <div className="uk-width-2-3@m fead-area">

                                    <Story socket={socket} user={user} />

                                    <div className="post-newer mt-lg-2">
                                        {/* <div className="post-new" uk-toggle="target: body ; cls: post-focus"> */}
                                        <InputField value={post} onChange={handleChange} isLoaded={isLoaded} user={user} socket={socket} profile={profile} />

                                        {/* : ''} */}
                                    </div>

                                    {/* <div className="post"> */}
                                    {/* <PostItem socket={socket} post={posts} commentLikes={comments} profile={user} postId={post.file_id} /> */}

                                    {posts.length > 0 ? posts.map((post, key) => (
                                        <PostItem key={key} socket={socket} post={post} likes={post.likes} commentLikes={comments} profile={user} postId={post.file_id} />
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

                                    {/* post comments */}
                                    <div className="post-comments">
                                        {/* <a href="#" className="view-more-comment"> Veiw 8 more Comments</a> */}
                                        {/* <div className="post-comments-single">
                                            <div className="post-comment-avatar">
                                                <img src="assets/images/avatars/avatar-5.jpg" alt />
                                            </div>
                                            <div className="post-comment-text">
                                                <div className="post-comment-text-inner">
                                                    <h6> Alex Dolgove</h6>
                                                    <p> Ut wisi enim ad minim laoreet dolore magna aliquam erat </p>
                                                </div>
                                                <div className="uk-text-small">
                                                    <a href="#" className="text-danger mr-1"> <i className="uil-heart" /> Love
                                                            </a>
                                                    <a href="#" className=" mr-1"> Replay </a>
                                                    <span> 1d</span>
                                                </div>
                                            </div>
                                            <a href="#" className="post-comment-opt" />
                                        </div> */}
                                        {/* <div className="post-comments-single">
                                            <div className="post-comment-avatar">
                                                <img src="assets/images/avatars/avatar-2.jpg" alt />
                                            </div>
                                            <div className="post-comment-text">
                                                <div className="post-comment-text-inner">
                                                    <h6>Stella Johnson</h6>
                                                    <p> Ut wisi enim ad minim laoreet dolore <strong> David !</strong> </p>
                                                </div>
                                                <div className="uk-text-small">
                                                    <a href="#" className="text-primary mr-1"> <i className="uil-thumbs-up" />
                                                           Like
                                                        </a>
                                                    <a href="#" className=" mr-1"> Replay </a>
                                                    <span> 2d</span>
                                                </div>
                                            </div>
                                            <a href="#" className="post-comment-opt" />
                                        </div> */}
                                        {/* <div className="post-comments-single">
                                            <div className="post-comment-avatar">
                                                <img src="assets/images/avatars/avatar-3.jpg" alt />
                                            </div>
                                            <div className="post-comment-text">
                                                <div className="post-comment-text-inner">
                                                    <h6> Jonathan Madano </h6>
                                                    <p> sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                                                    aliquam
                                                    erat
                                                         volutpat.<strong> David !</strong> </p>
                                                </div>
                                                <div className="uk-text-small">
                                                    <a href="#" className="text-danger mr-1"> <i className="uil-heart" /> Love
                                                        </a>
                                                    <a href="#" className=" mr-1"> Replay </a>
                                                    <span> 3d</span>
                                                </div>
                                            </div>
                                            <a href="#" className="post-comment-opt" />
                                        </div> */}
                                        {/* <a href="#" className="view-more-comment"> Veiw 8 more Comments</a>
                                        <div className="post-add-comment">
                                            <div className="post-add-comment-avature">
                                                <img src="assets/images/avatars/avatar-2.jpg" alt />
                                            </div>
                                            <div className="post-add-comment-text-area">
                                                <input type="text" placeholder="Write your comment..." />
                                                <div className="icons">
                                                    <span className="uil-link-alt" />
                                                    <span className="uil-grin" />
                                                    <span className="uil-image" />
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                    {/* </div> */}
                                    {/* <div className="post">
                                        <div className="post-heading">
                                            <div className="post-avature">
                                                <img src="assets/images/avatars/avatar-3.jpg" alt />
                                            </div>
                                            <div className="post-title">
                                                <h4> Erica Jones </h4>
                                                <p> 5 <span> hrs</span> <i className="uil-users-alt" /> </p>
                                            </div>
                                            <div className="post-btn-action">
                                                <span className="icon-more uil-ellipsis-h" />
                                                <div className="mt-0 p-2" uk-dropdown="pos: top-right;mode:hover ">
                                                    <ul className="uk-nav uk-dropdown-nav">
                                                        <li><a href="#"> <i className="uil-share-alt mr-1" /> Share</a> </li>
                                                        <li><a href="#"> <i className="uil-edit-alt mr-1" /> Edit Post </a></li>
                                                        <li><a href="#"> <i className="uil-comment-slash mr-1" /> Disable comments
                      </a></li>
                                                        <li><a href="#"> <i className="uil-favorite mr-1" /> Add favorites </a>
                                                        </li>
                                                        <li><a href="#" className="text-danger"> <i className="uil-trash-alt mr-1" />
                        Delete </a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="post-description">
                                            <div className="uk-grid-small uk-grid" uk-grid>
                                                <div className="uk-width-1-1@m">
                                                    <img src="assets/images/post/img-4.jpg" className="rounded" alt />
                                                </div>
                                                <div className="uk-width-1-2@m uk-width-1-2">
                                                    <img src="assets/images/post/img-2.jpg" className="rounded" alt />
                                                </div>
                                                <div className="uk-width-1-2@m uk-width-1-2 uk-position-relative">
                                                    <img src="assets/images/post/img-3.jpg" className="rounded" alt />
                                                    <div className="uk-position-center uk-light">
                                                        <a href="#">
                                                            <h3> + 15 more </h3>
                                                        </a></div>
                                                </div>
                                            </div>
                                            <div className="post-state-details">
                                                <div>
                                                    <img src="assets/images/icons/reactions_like.png" alt />
                                                    <img src="assets/images/icons/reactions_love.png" alt />
                                                    <p> 13 </p>
                                                </div>
                                                <p> <span className="mr-2"> <i className="uil-eye" /> Veiws </span> 212 Comments </p>
                                            </div>
                                        </div>
                                        <div className="post-state">
                                            <div className="post-state-btns"> <i className="uil-thumbs-up" /> 126<span> Liked </span>
                                            </div>
                                            <div className="post-state-btns"> <i className="uil-heart" /> 18 <span> Coments</span>
                                            </div>
                                            <div className="post-state-btns"> <i className="uil-share-alt" /> 193 <span> Shared
                </span>
                                            </div>
                                            <div className="post-state-btns"> <i className="uil-bookmark" /> 13 <span> Saved </span>
                                            </div>
                                        </div>
                                        <div className="post-comments">
                                            <a href="#" className="view-more-comment"> Veiw 8 more Comments</a>
                                            <div className="post-comments-single">
                                                <div className="post-comment-avatar">
                                                    <img src="assets/images/avatars/avatar-5.jpg" alt />
                                                </div>
                                                <div className="post-comment-text">
                                                    <div className="post-comment-text-inner">
                                                        <h6> Alex Dolgove</h6>
                                                        <p> Ut wisi enim ad minim laoreet dolore magna aliquam erat </p>
                                                    </div>
                                                    <div className="uk-text-small">
                                                        <a href="#" className="text-danger mr-1"> <i className="uil-heart" /> Love
                    </a>
                                                        <a href="#" className=" mr-1"> Replay </a>
                                                        <span> 3d</span>
                                                    </div>
                                                </div>
                                                <a href="#" className="post-comment-opt" />
                                            </div>
                                            <div className="post-comments-single">
                                                <div className="post-comment-avatar">
                                                    <img src="assets/images/avatars/avatar-2.jpg" alt />
                                                </div>
                                                <div className="post-comment-text">
                                                    <div className="post-comment-text-inner">
                                                        <h6>Stella Johnson</h6>
                                                        <p> Ut wisi enim ad minim laoreet dolore <strong> David !</strong> </p>
                                                    </div>
                                                    <div className="uk-text-small">
                                                        <a href="#" className="text-primary mr-1"> <i className="uil-thumbs-up" />
                      Like
                    </a>
                                                        <a href="#" className=" mr-1"> Replay </a>
                                                        <span> 3d</span>
                                                    </div>
                                                </div>
                                                <a href="#" className="post-comment-opt" />
                                            </div>
                                            <div className="post-comments-single">
                                                <div className="post-comment-avatar">
                                                    <img src="assets/images/avatars/avatar-3.jpg" alt />
                                                </div>
                                                <div className="post-comment-text">
                                                    <div className="post-comment-text-inner">
                                                        <h6> Jonathan Madano </h6>
                                                        <p> sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                                                        aliquam
                                                        erat
                      volutpat.<strong> David !</strong> </p>
                                                    </div>


                                                    <div className="uk-text-small">
                                                        <a href="#" className="text-danger mr-1"> <i className="uil-heart" /> Love
                    </a>
                                                        <a href="#" className=" mr-1"> Replay </a>
                                                        <span> 3d</span>
                                                    </div>
                                                </div>
                                                <a href="#" className="post-comment-opt" />
                                            </div>
                                            <a href="#" className="view-more-comment"> Veiw 8 more Comments</a>
                                            <div className="post-add-comment">
                                                <div className="post-add-comment-avature">
                                                    <img src="assets/images/avatars/avatar-2.jpg" alt />
                                                </div>
                                                <div className="post-add-comment-text-area">
                                                    <input type="text" placeholder="Write your comment..." />
                                                    <div className="icons">
                                                        <span className="uil-link-alt" />
                                                        <span className="uil-grin" />
                                                        <span className="uil-image" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* 

                                    <div className="post">
                                        <div className="post-heading">
                                            <div className="post-avature">
                                                <img src="assets/images/avatars/avatar-4.jpg" alt />
                                            </div>
                                            <div className="post-title">
                                                <h4> Stella Johnson </h4>
                                                <p> 5 <span> hrs</span> <i className="uil-users-alt" /> </p>
                                            </div>
                                            <div className="post-btn-action">
                                                <span className="icon-more uil-ellipsis-h" />
                                                <div className="mt-0 p-2" uk-dropdown="pos: top-right;mode:hover ">
                                                    <ul className="uk-nav uk-dropdown-nav">
                                                        <li><a href="#"> <i className="uil-share-alt mr-1" /> Share</a> </li>
                                                        <li><a href="#"> <i className="uil-edit-alt mr-1" /> Edit Post </a></li>
                                                        <li><a href="#"> <i className="uil-comment-slash mr-1" /> Disable comments
                                                          </a></li>
                                                        <li><a href="#"> <i className="uil-favorite mr-1" /> Add favorites </a>
                                                        </li>
                                                        <li><a href="#" className="text-danger"> <i className="uil-trash-alt mr-1" />
                                                        Delete </a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="post-description">
                                            <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                                            euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                                          Ut wisi enim ad minim laoreet dolore magna aliquam erat volutpat</p>
                                            <div className="post-state-details">
                                                <div>
                                                    <img src="assets/images/icons/reactions_like.png" alt />
                                                    <img src="assets/images/icons/reactions_love.png" alt />
                                                    <p> 13 </p>
                                                </div>
                                                <p> 24 Comments</p>
                                            </div>
                                        </div>
                                        <div className="post-state">
                                            <div className="post-state-btns"> <i className="uil-thumbs-up" /> 126<span> Liked </span>
                                            </div>
                                            <div className="post-state-btns"> <i className="uil-heart" /> 18 <span> Coments</span>
                                            </div>
                                            <div className="post-state-btns"> <i className="uil-share-alt" /> 193 <span> Shared
                                                  </span>
                                            </div>
                                            <div className="post-state-btns"> <i className="uil-bookmark" /> 13 <span> Saved </span>
                                            </div>
                                        </div>
                                        <div className="post-comments">
                                            <a href="#" className="view-more-comment"> Veiw 8 more Comments</a>
                                            <div className="post-comments-single">
                                                <div className="post-comment-avatar">
                                                    <img src="assets/images/avatars/avatar-5.jpg" alt />
                                                </div>
                                                <div className="post-comment-text">
                                                    <div className="post-comment-text-inner">
                                                        <h6> Alex Dolgove</h6>
                                                        <p> Ut wisi enim ad minim laoreet dolore magna aliquam erat </p>
                                                    </div>
                                                    <div className="uk-text-small">
                                                        <a href="#" className="text-danger mr-1"> <i className="uil-heart" /> Love
                                                         </a>
                                                        <a href="#" className=" mr-1"> Replay </a>
                                                        <span> 1d</span>
                                                    </div>
                                                </div>
                                                <a href="#" className="post-comment-opt" />
                                            </div>
                                            <div className="post-comments-single">
                                                <div className="post-comment-avatar">
                                                    <img src="assets/images/avatars/avatar-2.jpg" alt />
                                                </div>
                                                <div className="post-comment-text">
                                                    <div className="post-comment-text-inner">
                                                        <h6>Stella Johnson</h6>
                                                        <p> Ut wisi enim ad minim laoreet dolore <strong> David !</strong> </p>
                                                    </div>
                                                    <div className="uk-text-small">
                                                        <a href="#" className="text-primary mr-1"> <i className="uil-thumbs-up" />
                                                            Like
                                                            </a>
                                                        <a href="#" className=" mr-1"> Replay </a>
                                                        <span> 2d</span>
                                                    </div>
                                                </div>
                                                <a href="#" className="post-comment-opt" />
                                            </div>
                                            <div className="post-add-comment">
                                                <div className="post-add-comment-avature">
                                                    <img src="assets/images/avatars/avatar-2.jpg" alt />
                                                </div>
                                                <div className="post-add-comment-text-area">
                                                    <input type="text" placeholder="Write your comment..." />
                                                    <div className="icons">
                                                        <span className="uil-link-alt" />
                                                        <span className="uil-grin" />
                                                        <span className="uil-image" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}


                                    {/* <div className="post">
                                        <div className="post-heading">
                                            <div className="post-avature">
                                                <img src="assets/images/avatars/avatar-2.jpg" alt />
                                            </div>
                                            <div className="post-title">
                                                <h4> Dennis Han </h4>
                                                <p> 5 <span> hrs</span> <i className="uil-users-alt" /> </p>
                                            </div>
                                            <div className="post-btn-action">
                                                <span className="icon-more uil-ellipsis-h" />
                                                <div className="mt-0 p-2" uk-dropdown="pos: top-right;mode:hover ">
                                                    <ul className="uk-nav uk-dropdown-nav">
                                                        <li><a href="#"> <i className="uil-share-alt mr-1" /> Share</a> </li>
                                                        <li><a href="#"> <i className="uil-edit-alt mr-1" /> Edit Post </a></li>
                                                        <li><a href="#"> <i className="uil-comment-slash mr-1" /> Disable comments
                                                          </a></li>
                                                        <li><a href="#"> <i className="uil-favorite mr-1" /> Add favorites </a>
                                                        </li>
                                                        <li><a href="#" className="text-danger"> <i className="uil-trash-alt mr-1" />
                                                                    Delete </a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="post-description">
                                            <div className="fullsizevid">
                                                <div className="embed-video">
                                                    <iframe src="https://www.youtube.com/embed/pQN-pnXPaVg" frameBorder={0} uk-video="automute: true" allowFullScreen uk-responsive />
                                                </div>
                                            </div>
                                            <div className="post-state-details">
                                                <div>
                                                    <img src="assets/images/icons/reactions_like.png" alt />
                                                    <img src="assets/images/icons/reactions_love.png" alt />
                                                    <p> 13 </p>
                                                </div>
                                                <p> <span className="mr-2"> <i className="uil-eye" /> 38 Veiws </span> 212 Comments
                                                     </p>
                                            </div>
                                        </div>
                                        <div className="post-state">
                                            <div className="post-state-btns"> <i className="uil-thumbs-up" /> 126<span> Liked </span>
                                            </div>
                                            <div className="post-state-btns"> <i className="uil-heart" /> 18 <span> Coments</span>
                                            </div>
                                            <div className="post-state-btns"> <i className="uil-share-alt" /> 193 <span> Shared
                                          </span>
                                            </div>
                                            <div className="post-state-btns"> <i className="uil-bookmark" /> 13 <span> Saved </span>
                                            </div>
                                        </div>
                                        <div className="post-comments">
                                            <a href="#" className="view-more-comment"> Veiw 8 more Comments</a>
                                            <div className="post-comments-single">
                                                <div className="post-comment-avatar">
                                                    <img src="assets/images/avatars/avatar-5.jpg" alt />
                                                </div>
                                                <div className="post-comment-text">
                                                    <div className="post-comment-text-inner">
                                                        <h6> Alex Dolgove</h6>
                                                        <p> Ut wisi enim ad minim laoreet dolore magna aliquam erat </p>
                                                    </div>
                                                    <div className="uk-text-small">
                                                        <a href="#" className="text-danger mr-1"> <i className="uil-heart" /> Love
                                                        </a>
                                                        <a href="#" className=" mr-1"> Replay </a>
                                                        <span> 3d</span>
                                                    </div>
                                                </div>
                                                <a href="#" className="post-comment-opt" />
                                            </div>
                                            <div className="post-comments-single">
                                                <div className="post-comment-avatar">
                                                    <img src="assets/images/avatars/avatar-2.jpg" alt />
                                                </div>
                                                <div className="post-comment-text">
                                                    <div className="post-comment-text-inner">
                                                        <h6>Stella Johnson</h6>
                                                        <p> Ut wisi enim ad minim laoreet dolore <strong> David !</strong> </p>
                                                    </div>
                                                    <div className="uk-text-small">
                                                        <a href="#" className="text-primary mr-1"> <i className="uil-thumbs-up" />
                                                                Like
                                                                </a>
                                                        <a href="#" className=" mr-1"> Replay </a>
                                                        <span> 3d</span>
                                                    </div>
                                                </div>
                                                <a href="#" className="post-comment-opt" />
                                            </div>
                                            <div className="post-add-comment">
                                                <div className="post-add-comment-avature">
                                                    <img src="assets/images/avatars/avatar-2.jpg" alt />
                                                </div>
                                                <div className="post-add-comment-text-area">
                                                    <input type="text" placeholder="Write your comment..." />
                                                    <div className="icons">
                                                        <span className="uil-link-alt" />
                                                        <span className="uil-grin" />
                                                        <span className="uil-image" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                */}
                                </div>

                                <RightSideBar user={user} profile={profile} friendRequests={profile.friendRequests} friendsList={profile.friendsList} socket={socket} />

                            </div>
                        </div>
                    </div>

                    <Online online={online} user={user} profiles={profile}/>
                    {/* {chat &&
                        <div id="sidebar-chat" className="sidebar-chat px-3 uk-offcanvas uk-offcanvas-overlay uk-open" uk-offcanvas="flip: true; overlay: true" style={{ display: 'block', zIndex: "50" }}>
                            <div className="uk-offcanvas-bar uk-offcanvas-bar-animation uk-offcanvas-slide" style={{ left: '76%' }}>
                                <div className="sidebar-chat-head mb-2">
                                    <div className="btn-actions">
                                        <a href="#" uk-tooltip="title: Search ;offset:7" uk-toggle="target: .sidebar-chat-search; animation: uk-animation-slide-top-small" title aria-expanded="false"> <i className="icon-feather-search" /> </a>
                                        <a href="#" uk-tooltip="title: settings ;offset:7" title aria-expanded="false"> <i className="icon-feather-settings" /> </a>
                                        <a href="#"> <i className="uil-ellipsis-v" /> </a>
                                        <a href="#" className="uk-hidden@s"> <button className="uk-offcanvas-close uk-close uk-icon" type="button" uk-close> <svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" data-svg="close-icon"><line fill="none" stroke="#000" strokeWidth="1.1" x1={1} y1={1} x2={13} y2={13} /><line fill="none" stroke="#000" strokeWidth="1.1" x1={13} y1={1} x2={1} y2={13} /></svg></button> </a>
                                    </div>
                                    <h2> Chats </h2>
                                </div>
                                <div className="sidebar-chat-search  " aria-hidden="false" style={{}}>
                                    <input type="text" className="uk-input" placeholder="Search in Messages" />
                                    <span className="btn-close" uk-toggle="target: .sidebar-chat-search; animation: uk-animation-slide-top-small"> <i className="icon-feather-x" /> </span>
                                </div>
                                <ul className="uk-child-width-expand sidebar-chat-tabs uk-tab" uk-tab>
                                    <li className="uk-active"><a href="#">Users</a></li>
                                    <li><a href="#">Groups</a></li>
                                </ul>
                                <a href="#">
                                    <div className="contact-list">
                                        <div className="contact-list-media"> <img src="assets/images/avatars/avatar-2.jpg" alt />
                                            <span className="online-dot" /> </div>
                                        <h5> James Lewis </h5>
                                    </div>
                                </a>
                                <a href="#">
                                    <div className="contact-list">
                                        <div className="contact-list-media"> <img src="assets/images/avatars/avatar-1.jpg" alt />
                                            <span className="online-dot" /> </div>
                                        <h5> Erica Jones </h5>
                                    </div>
                                </a>
                                <a href="#">
                                    <div className="contact-list">
                                        <div className="contact-list-media"> <img src="assets/images/avatars/avatar-7.jpg" alt />
                                            <span className="offline-dot" /> </div>
                                        <h5> Stella Johnson </h5>
                                    </div>
                                </a>
                                <a href="#">
                                    <div className="contact-list">
                                        <div className="contact-list-media"> <img src="assets/images/avatars/avatar-5.jpg" alt />
                                            <span className="offline-dot" /> </div>
                                        <h5> Alex Dolgove </h5>
                                    </div>
                                </a>
                                <a href="#">
                                    <div className="contact-list">
                                        <div className="contact-list-media"> <img src="assets/images/avatars/avatar-2.jpg" alt />
                                            <span className="online-dot" /> </div>
                                        <h5> James Lewis </h5>
                                    </div>
                                </a>
                                <a href="#">
                                    <div className="contact-list">
                                        <div className="contact-list-media"> <img src="assets/images/avatars/avatar-4.jpg" alt />
                                            <span className="online-dot" /> </div>
                                        <h5> Erica Jones </h5>
                                    </div>
                                </a>
                                <a href="#">
                                    <div className="contact-list">
                                        <div className="contact-list-media"> <img src="assets/images/avatars/avatar-3.jpg" alt />
                                            <span className="offline-dot" /> </div>
                                        <h5> Stella Johnson </h5>
                                    </div>
                                </a>
                                <a href="#">
                                    <div className="contact-list">
                                        <div className="contact-list-media"> <img src="assets/images/avatars/avatar-5.jpg" alt />
                                            <span className="offline-dot" /> </div>
                                        <h5> Alex Dolgove </h5>
                                    </div>
                                </a>
                                <a href="#">
                                    <div className="contact-list">
                                        <div className="contact-list-media"> <img src="assets/images/avatars/avatar-2.jpg" alt />
                                            <span className="online-dot" /> </div>
                                        <h5> James Lewis </h5>
                                    </div>
                                </a>
                                <a href="#">
                                    <div className="contact-list">
                                        <div className="contact-list-media"> <img src="assets/images/avatars/avatar-4.jpg" alt />
                                            <span className="online-dot" /> </div>
                                        <h5> Erica Jones </h5>
                                    </div>
                                </a>
                                <a href="#">
                                    <div className="contact-list">
                                        <div className="contact-list-media"> <img src="assets/images/avatars/avatar-3.jpg" alt />
                                            <span className="offline-dot" /> </div>
                                        <h5> Stella Johnson </h5>
                                    </div>
                                </a>
                                <a href="#">
                                    <div className="contact-list">
                                        <div className="contact-list-media"> <img src="assets/images/avatars/avatar-5.jpg" alt />
                                            <span className="offline-dot" /> </div>
                                        <h5> Alex Dolgove </h5>
                                    </div>
                                </a>
                            </div>
                        </div>
                    } */}

                    <AllStories socket={socket} user={user} />
                {/* </div> */}

            </Fragment>
        )
}

Dashboard.PropTypes = {
    loadUser: PropTypes.func.isRequired,
    addStory: PropTypes.func.isRequired,
    getStory: PropTypes.func.isRequired,
    confirmFriend: PropTypes.func.isRequired,
    loader: PropTypes.func.isRequired,
    removeLoader: PropTypes.func.isRequired,
    getProfileById:  PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    addNotification: PropTypes.func.isRequired,
    fetchNotification: PropTypes.func.isRequired,

    getProfiles: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
    getCurrentPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    addCommentLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    removeCommentLike: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post,
    profile: state.profile,
    online: state.online,
    notification:state.notification,
    loader: state.loader
})


export default connect(mapStateToProps, { getProfiles, getProfileById, addNotification, fetchNotifications, removeLoader,
    loadUser, loader, getPosts, getCurrentPost, getCurrentProfile,
    addComment, addLike, removeLike, addComment, addCommentLike, getStory, confirmFriend, removeCommentLike, addStory
})(Dashboard);
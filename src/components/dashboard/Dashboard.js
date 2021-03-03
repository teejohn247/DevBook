import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import LoadingSpinner from '../layout/spinner';
import { setAlert } from '../../actions/alert';
import { getCurrentProfile } from '../../actions/profile';
import { getCurrentPost } from '../../actions/post';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';
import io from "socket.io-client";
import SocketIOFileUpload from 'socketio-file-upload';
import Alert from '../layout/Alert';
import SideBar from "./SideBar";
import RightSideBar from "./RightSideBar";
import InputField from "./InputField";
import Header from "./Header";
import Story from "./Story";





const socket = io.connect('http://localhost:4000')

// let socket;


const Dashboard = ({ getCurrentProfile, getCurrentPost, post: { posts, comments, feedLoader }, getPosts, auth: { user }, profile: { profile, loading } }) => {
  
    const [selectetdFile, setSelectedFile] = useState([]);
    const [post, setPost] = useState("");
    const [emmited, setEmmited] = useState(false);
    const [postField, setPostField] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [postInput, setPostInput] = useState(false);
    const dispatch = useDispatch();



    // var post_id = Date.now() + Number(localStorage.getItem('user_id'))


    // const [post, setPost] = useState("");




    // const [files, setFiles] = useState([]);
  

    useEffect(() => {
        socket.on('connect', function () {
            console.log('connected!')

        })
        getCurrentProfile()
        getCurrentPost()

    }, [])

    



    // console.log(profile)
    return loading && profile == null ? (
        <LoadingSpinner />
    ) : (
            <Fragment>
                <div id="wrapper">
                    <SideBar />

                    {/* contents */}
                    <div className="main_content">
                      
                       <Header />

                        <div className="main_content_inner">
                            <div className="uk-grid" uk-grid>
                                <div className="uk-width-2-3@m fead-area">
                                
                                <Story />

                                    <div className="post-newer mt-lg-2">
                                        {/* <div className="post-new" uk-toggle="target: body ; cls: post-focus"> */}
                                        <InputField user={user} profile={profile}/>
                                      
                                        {/* : ''} */}
                                    </div>

                                    {/* <div className="post"> */}
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

                                <RightSideBar />

                            </div>
                        </div>
                    </div>
                    {/* Chat sidebar */}
                    <a className="chat-plus-btn" href="#sidebar-chat" uk-toggle>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                        </svg>
                        {/*  Chat */}
                    </a>
                    <div id="sidebar-chat" className="sidebar-chat px-3" uk-offcanvas="flip: true; overlay: true">
                        <div className="uk-offcanvas-bar">
                            <div className="sidebar-chat-head mb-2">
                                <div className="btn-actions">
                                    <a href="#" uk-tooltip="title: Search ;offset:7" uk-toggle="target: .sidebar-chat-search; animation: uk-animation-slide-top-small"> <i className="icon-feather-search" /> </a>
                                    <a href="#" uk-tooltip="title: settings ;offset:7"> <i className="icon-feather-settings" /> </a>
                                    <a href="#"> <i className="uil-ellipsis-v" /> </a>
                                    <a href="#" className="uk-hidden@s"> <button className="uk-offcanvas-close uk-close" type="button" uk-close> </button> </a>
                                </div>
                                <h2> Chats </h2>
                            </div>
                            <div className="sidebar-chat-search" hidden>
                                <input type="text" className="uk-input" placeholder="Search in Messages" />
                                <span className="btn-close" uk-toggle="target: .sidebar-chat-search; animation: uk-animation-slide-top-small"> <i className="icon-feather-x" /> </span>
                            </div>
                            <ul className="uk-child-width-expand sidebar-chat-tabs" uk-tab>
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
                    <div className="story-pop uk-animation-slide-bottom-small">
                        <div className="story-side uk-width-1-4@s">
                            <div className="uk-flex uk-flex-between uk-flex-middle mb-2">
                                <h2 className="mb-0" style={{ fontWeight: 700 }}>All Story</h2>
                                <a href="#" className="text-primary"> Setting</a>
                            </div>
                            <div className="story-side-innr" data-simplebar>
                                <h4 className="mb-1"> Your Story</h4>
                                <ul className="story-side-list">
                                    <li>
                                        <a href="#">
                                            <div className="story-user-media">
                                                <img src="assets/images/avatars/avatar-1.jpg" alt />
                                            </div>
                                            <div className="story-user-innr">
                                                <h5> Stella Johnson </h5>
                                                <p> Share a photo or video</p>
                                            </div>
                                            <div className="add-story-btn">
                                                <i className="uil-plus" />
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <div className="uk-flex uk-flex-between uk-flex-middle my-3">
                                    <h4 className="m-0"> Friends Story</h4>
                                    <a href="#" className="text-primary"> See all</a>
                                </div>
                                <ul className="story-side-list" uk-switcher="connect: #story-slider-switcher ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium">
                                    <li>
                                        <a href="#">
                                            <div className="story-user-media">
                                                <img src="assets/images/avatars/avatar-1.jpg" alt />
                                            </div>
                                            <div className="story-user-innr">
                                                <h5> James Lewis </h5>
                                                <p> <span className="story-count"> 2 new </span> <span className="story-time-ago"> 4hr ago
                  </span></p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div className="story-user-media">
                                                <img src="assets/images/avatars/avatar-2.jpg" alt />
                                            </div>
                                            <div className="story-user-innr">
                                                <h5> Stella Johnson </h5>
                                                <p> <span className="story-count"> 3 new </span> <span className="story-time-ago"> 1hr ago
                  </span></p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div className="story-user-media">
                                                <img src="assets/images/avatars/avatar-4.jpg" alt />
                                            </div>
                                            <div className="story-user-innr">
                                                <h5> Erica Jones </h5>
                                                <p> <span className="story-count"> 2 new </span> <span className="story-time-ago"> 3hr ago
                  </span></p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div className="story-user-media">
                                                <img src="assets/images/avatars/avatar-7.jpg" alt />
                                            </div>
                                            <div className="story-user-innr">
                                                <h5> Adrian Mohani </h5>
                                                <p> <span className="story-count"> 1 new </span> <span className="story-time-ago"> 4hr ago
                  </span></p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div className="story-user-media">
                                                <img src="assets/images/avatars/avatar-5.jpg" alt />
                                            </div>
                                            <div className="story-user-innr">
                                                <h5> Alex Dolgove </h5>
                                                <p> <span className="story-count"> 3 new </span> <span className="story-time-ago"> 7hr ago
                  </span></p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div className="story-user-media">
                                                <img src="assets/images/avatars/avatar-1.jpg" alt />
                                            </div>
                                            <div className="story-user-innr">
                                                <h5> Stella Johnson </h5>
                                                <p> <span className="story-count"> 2 new </span> <span className="story-time-ago"> 8hr ago
                  </span></p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div className="story-user-media">
                                                <img src="assets/images/avatars/avatar-2.jpg" alt />
                                            </div>
                                            <div className="story-user-innr">
                                                <h5> Erica Jones </h5>
                                                <p> <span className="story-count"> 3 new </span> <span className="story-time-ago"> 10hr ago
                  </span></p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div className="story-user-media">
                                                <img src="assets/images/avatars/avatar-5.jpg" alt />
                                            </div>
                                            <div className="story-user-innr">
                                                <h5> Alex Dolgove </h5>
                                                <p> <span className="story-count"> 3 new </span> <span className="story-time-ago"> 14hr ago
                  </span></p>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="story-content">
                            {/* close button*/}
                            <span className="story-btn-close" uk-toggle="target: body ; cls: is-open" uk-tooltip="title:Close story ; pos: left " />
                            <div className="story-content-innr">
                                <ul id="story-slider-switcher" className="uk-switcher">
                                    <li>
                                        <a href="#" uk-switcher-item="previous" className="uk-position-center-left-out uk-position-medium slidenav-prev" />
                                        <a href="#" uk-switcher-item="next" className="uk-position-center-right-out uk-position-medium slidenav-next" />
                                        <div className="uk-position-relative uk-visible-toggle" uk-slider>
                                            {/* navigation */}
                                            <ul className="uk-slider-nav uk-dotnav story-slider-nav" />
                                            {/* Story posted image */}
                                            <ul className="uk-slider-items uk-child-width-1-1 story-slider">
                                                <li>
                                                    <div className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                                                        <img src="assets/images/post/img-1.jpg" alt />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                                                        <img src="assets/images/avatars/avatar-lg-1.jpg" alt />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        {/* slider navigation */}
                                        <a href="#" uk-switcher-item="previous" className="uk-position-center-left-out uk-position-medium slidenav-prev" />
                                        <a href="#" uk-switcher-item="next" className="uk-position-center-right-out uk-position-medium slidenav-next" />
                                        <div className="uk-position-relative uk-visible-toggle" uk-slider>
                                            {/* navigation */}
                                            <ul className="uk-slider-nav uk-dotnav story-slider-nav" />
                                            {/* Story posted image */}
                                            <ul className="uk-slider-items uk-child-width-1-1 story-slider">
                                                <li>
                                                    <div className="story-slider-image">
                                                        <img src="assets/images/post/img-3.jpg" alt />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="story-slider-image">
                                                        <img src="assets/images/avatars/avatar-lg-3.jpg" alt />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="story-slider-image">
                                                        <img src="assets/images/avatars/avatar-lg-2.jpg" alt />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        {/* slider navigation */}
                                        <a href="#" uk-switcher-item="previous" className="uk-position-center-left-out uk-position-medium slidenav-prev" />
                                        <a href="#" uk-switcher-item="next" className="uk-position-center-right-out uk-position-medium slidenav-next" />
                                        <div className="uk-position-relative uk-visible-toggle" uk-slider>
                                            {/* navigation */}
                                            <ul className="uk-slider-nav uk-dotnav story-slider-nav" />
                                            {/* Story posted image */}
                                            <ul className="uk-slider-items uk-child-width-1-1 story-slider">
                                                <li>
                                                    <div className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                                                        <img src="assets/images/avatars/avatar-lg-4.jpg" alt />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        {/* slider navigation */}
                                        <a href="#" uk-switcher-item="previous" className="uk-position-center-left-out uk-position-medium slidenav-prev" />
                                        <a href="#" uk-switcher-item="next" className="uk-position-center-right-out uk-position-medium slidenav-next" />
                                        <div className="uk-position-relative uk-visible-toggle" uk-slider>
                                            {/* navigation */}
                                            <ul className="uk-slider-nav uk-dotnav story-slider-nav" />
                                            {/* Story posted image */}
                                            <ul className="uk-slider-items uk-child-width-1-1 story-slider">
                                                <li>
                                                    <div className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                                                        <img src="assets/images/avatars/avatar-lg-4.jpg" alt />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        {/* slider navigation */}
                                        <a href="#" uk-switcher-item="previous" className="uk-position-center-left-out uk-position-medium slidenav-prev" />
                                        <a href="#" uk-switcher-item="next" className="uk-position-center-right-out uk-position-medium slidenav-next" />
                                        <div className="uk-position-relative uk-visible-toggle" uk-slider>
                                            {/* navigation */}
                                            <ul className="uk-slider-nav uk-dotnav story-slider-nav" />
                                            {/* Story posted image */}
                                            <ul className="uk-slider-items uk-child-width-1-1 story-slider">
                                                <li>
                                                    <div className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                                                        <img src="assets/images/avatars/avatar-lg-4.jpg" alt />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        {/* slider navigation */}
                                        <a href="#" uk-switcher-item="previous" className="uk-position-center-left-out uk-position-medium slidenav-prev" />
                                        <a href="#" uk-switcher-item="next" className="uk-position-center-right-out uk-position-medium slidenav-next" />
                                        <div className="uk-position-relative uk-visible-toggle" uk-slider>
                                            {/* navigation */}
                                            <ul className="uk-slider-nav uk-dotnav story-slider-nav" />
                                            {/* Story posted image */}
                                            <ul className="uk-slider-items uk-child-width-1-1 story-slider">
                                                <li>
                                                    <div className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                                                        <img src="assets/images/avatars/avatar-lg-4.jpg" alt />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        {/* slider navigation */}
                                        <a href="#" uk-switcher-item="previous" className="uk-position-center-left-out uk-position-medium slidenav-prev" />
                                        <a href="#" uk-switcher-item="next" className="uk-position-center-right-out uk-position-medium slidenav-next" />
                                        <div className="uk-position-relative uk-visible-toggle" uk-slider>
                                            {/* navigation */}
                                            <ul className="uk-slider-nav uk-dotnav story-slider-nav" />
                                            {/* Story posted image */}
                                            <ul className="uk-slider-items uk-child-width-1-1 story-slider">
                                                <li>
                                                    <div className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                                                        <img src="assets/images/avatars/avatar-lg-4.jpg" alt />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        {/* slider navigation */}
                                        <a href="#" uk-switcher-item="previous" className="uk-position-center-left-out uk-position-medium slidenav-prev" />
                                        <a href="#" uk-switcher-item="next" className="uk-position-center-right-out uk-position-medium slidenav-next" />
                                        <div className="uk-position-relative uk-visible-toggle" uk-slider>
                                            {/* navigation */}
                                            <ul className="uk-slider-nav uk-dotnav story-slider-nav" />
                                            {/* Story posted image */}
                                            <ul className="uk-slider-items uk-child-width-1-1 story-slider">
                                                <li>
                                                    <div className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                                                        <img src="assets/images/avatars/avatar-lg-4.jpg" alt />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        {/* slider navigation */}
                                        <a href="#" uk-switcher-item="previous" className="uk-position-center-left-out uk-position-medium slidenav-prev" />
                                        <a href="#" uk-switcher-item="next" className="uk-position-center-right-out uk-position-medium slidenav-next" />
                                        <div className="uk-position-relative uk-visible-toggle" uk-slider>
                                            {/* navigation */}
                                            <ul className="uk-slider-nav uk-dotnav story-slider-nav" />
                                            {/* Story posted image */}
                                            <ul className="uk-slider-items uk-child-width-1-1 story-slider">
                                                <li>
                                                    <div className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                                                        <img src="assets/images/avatars/avatar-lg-4.jpg" alt />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        {/* slider navigation */}
                                        <a href="#" uk-switcher-item="previous" className="uk-position-center-left-out uk-position-medium slidenav-prev" />
                                        <a href="#" uk-switcher-item="next" className="uk-position-center-right-out uk-position-medium slidenav-next" />
                                        <div className="uk-position-relative uk-visible-toggle" uk-slider>
                                            {/* navigation */}
                                            <ul className="uk-slider-nav uk-dotnav story-slider-nav" />
                                            {/* Story posted image */}
                                            <ul className="uk-slider-items uk-child-width-1-1 story-slider">
                                                <li>
                                                    <div className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                                                        <img src="assets/images/avatars/avatar-lg-4.jpg" alt />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        {/* slider navigation */}
                                        <a href="#" uk-switcher-item="previous" className="uk-position-center-left-out uk-position-medium slidenav-prev" />
                                        <a href="#" uk-switcher-item="next" className="uk-position-center-right-out uk-position-medium slidenav-next" />
                                        <div className="uk-position-relative uk-visible-toggle" uk-slider>
                                            {/* navigation */}
                                            <ul className="uk-slider-nav uk-dotnav story-slider-nav" />
                                            {/* Story posted image */}
                                            <ul className="uk-slider-items uk-child-width-1-1 story-slider">
                                                <li>
                                                    <div className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                                                        <img src="assets/images/avatars/avatar-lg-4.jpg" alt />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>
        )
}

Dashboard.PropTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
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


export default connect(mapStateToProps, { getPosts, getCurrentPost, getCurrentProfile })(Dashboard);
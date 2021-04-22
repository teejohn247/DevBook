import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes, { number } from 'prop-types';
import { connect } from 'react-redux';
import io from "socket.io-client";
import CommentItem from './CommentItem';
import { addLike, removeLike, addComment, addCommentLike, removeCommentLike } from '../../actions/post';
import { getProfileById } from '../../actions/profile';

import TimeAgo from 'timeago-react';
import like from "../../images/assets/images/icons/reactions_like.png";
import love from "../../images/assets/images/icons/reactions_love.png";


import inputField from './InputField';


import LoadingSpinner from '../layout/spinner';
import InputField from './InputField';


// const socket = io.connect('http://localhost:4000', { 'forceNew': true })







const PostItem = ({ getProfileById, socket, likes, post: { file_id, name, email, image, user_image, text, time, date, images, comments, loading, user_id }, auth: { user }, profile }) => {

    // console.log("commentLikes",likes['0'].user)

    const [userLikes, setUserLikes] = useState(false);
    // const [commentLike, setCommentLike] = useState(false);
    const [emmited, setEmmited] = useState(false);
    // const [clemmited, setClEmmited] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const [commentLikeNumber, setCommentLikeNumber] = useState(0);
    const [likeNumber, setLikeNumber] = useState(0);
    const [comment, setComment] = useState("");
    const [emitComment, setEmitComment] = useState(false);
    const [receiverName, setReceiverName] = useState('');
    const [receiverImage, setReceiverImage] = useState('');





    useEffect(() => {
        // console.log("commentLikes",comments.commentLikes)
        var arr = []

        if (likes) {
            if (likes.length) {
                likes.some((like, i) => {
                    like.user == user._id ? arr.push(true) : arr.push(false)
                })
                arr.includes(true) ? setUserLikes(true) : setUserLikes(false)
            } else {
                setUserLikes(false)
            }
        }
    }, [likes])

    // useEffect(() => {
    //     // console.log("commentLikes",comments.commentLikes)
    //     if (comments.commentLikes) {
    //         comments.commentLikes.some((like, i) => {
    //             like.user == _id ? setCommentLike(true) : setCommentLike(false)
    //         })
    //     }
    // }, [commentLike])

    const handleComment = (e, file_id, name) => {
        e.preventDefault();
        setIsLoading(true)
        var d = new Date();
        var unique = d.valueOf();
        console.log('add', file_id, comment)
        socket.emit('add_comment', {
            file_id: file_id,
            comment_id: unique,
            user_image: user.image,
            text: comment,
            name: user.name,

            user: user._id,
            sender_id: user._id,
            receiver_id: user_id,
            sender_image: user.image,
            receiver_image: user_image,
            sender_name: user.name,
            receiver_name: name,
            notificationType: "commentPost"
            // length: comments.length
        })

        // setEmmited(true)
        // setEmitComment(true)
        // setComment("")
        // setIsLoading(false)

        // setUserLike(true)
        // setLikeNumber(1)
    }

    // const addCommentLikes = (e, file_id,comment_id) => {
    //     e.preventDefault();
    //     console.log('add', file_id, comment_id)
    //     socket.emit('comment_like', {
    //         file_id: file_id,
    //         comment_id: comment_id,
    //         name: name
    //     })
    //     // setEmmited(true)
    //     setClEmmited(true)
    //     setCommentLike(true)
    //     setCommentLikeNumber(1)
    // }

    // const removeCommentLikes = (e, file_id,comment_id) => {
    //     e.preventDefault();
    //     console.log('add', file_id, comment_id)
    //     socket.emit('comment_like', {
    //         file_id: file_id,
    //         comment_id: comment_id,
    //     })
    //     // setEmmited(true)
    //     setClEmmited(true)
    //     setCommentLike(false)
    //     setCommentLikeNumber(-1)
    // }


    // user: user._id,
    // msg: text,
    // sender_id: user._id,
    // receiver_id: receiver,
    // sender_image: user.image,
    // receiver_image: receiverImage,
    // sender_name: user.name,
    // receiver_name: receiverName,
    // chatsBetween: [user._id, receiver]

    const addLikes = (e, file_id, _id) => {
        e.preventDefault();
        console.log('add', file_id, _id)
        socket.emit('like_post', {
            file_id: file_id,
            _id: _id,
            user: user._id,
            sender_id: user._id,
            receiver_id: user_id,
            sender_image: user.image,
            receiver_image: user_image,
            sender_name: user.name,
            receiver_name: name,
            like: "add",
            notificationType: "likePost"
        })
        // setEmmited(true)
        // setUserLikes(true)
        // setLikeNumber(1)
        // console.log({userLikes})


    }

    const removeLikes = (e, file_id, _id) => {
        e.preventDefault();
        console.log('remove', file_id, _id)

        socket.emit('like_post', {
            file_id: file_id,
            _id: _id,
            like: "remove"

        })
        // if(likeNumber == 0){
        // setLikeNumber(0)
        // }else{
        // setLikeNumber(-1)
        // }
        // setEmmited(true)
        // setUserLikes(false)
        // console.log({userLikes})
        // setLikeNumber(-1)
        // console.log({likeNumber})
    }

    // useEffect(() => {
    //     if(clemmited){
    //     if (commentLike == true) {
    //         socket.on('comment_like', function (data) {
    //             console.log(data);
    //             dispatch(addCommentLike(data))
    //             socket.off("comment_like");
    //             setCommentLike(true)
    //             setClEmmited(false)
    //             return

    //         })
    //     } else {
    //         // socket.on('comment_like', function (data) {
    //         //     console.log(data);
    //         //     dispatch(addCommentLike(data))
    //         //     // dispatch(removeCommentLike(data))
    //         //     socket.off("comment_like");
    //         //     setCommentLike(false)
    //         //     setClEmmited(false)
    //         //     // setCommentLikeNumber(1)
    //         //     return

    //         // })

    //     }
    // }

    // },[clemmited])

    const dispatch = useDispatch();


    useEffect(() => {


        console.log('useEffect')

        // if (emmited) {

        // if (emitComment) {
        // alert('here3')
        socket.on('add_comment', function (data) {
            // console.log(data);
            // dispatch(addComment(data))
            setComment("");
            // socket.off('add_comment');


            setIsLoading(false)
            // setEmmited(true)
            // console.log({emmited})
            // setIsLoading(false)
            setEmitComment(false);
            // socket.off("add_comment");

            // setEmmited(false);
            // return
        })
        console.log({ emmited })

        //         socket.on('like_post', function (data) {

        //             if(data.like == "add"){
        // setLikeNumber(1)
        // console.log(likes.length);




        //             }else if(data.like == "remove"){
        // setLikeNumber(-1)
        // console.log(likes.length);


        //             }


        //         })




        // }
        // return function cleanup() {socket.off('add_comment')}

        // return () => {
        //     socket.off('add_comment');
        //  };


        // if (userLike == true) {
        //     // alert('here3')
        // socket.on('like_post', function (data) {
        //     console.log(data);
        //     dispatch(addLike(data))
        //     socket.off("like_post");
        //     // setUserLike(false)
        //     setEmitComment(false);
        //     // setEmmited(false)
        //     return
        // })

        // } else {
        //     socket.on('like_post', function (data) {
        //         console.log(data);
        //         dispatch(removeLike(data))
        //         socket.off("like_post");
        //         // setUserLike(false)
        //         setEmitComment(false);
        //         // setEmmited(false)
        //         return
        //     })
        // }
        // }
    }, [comment])

    const getSpecific = async (e, id) => {
        e.preventDefault();
        setIsLoading(true);
        await getProfileById(id);
        setIsLoading(false);

    }


    return loading == true ? (<LoadingSpinner />) : images ? (

        <Fragment>
            <div className="post">
                <div className="post-heading">
                    <div className="post-avature">
                        <img src={user_image} alt />
                    </div>
                    <div className="post-title">
                        <Link to={`/profile/${user_id}`} class="view">{name}</Link>
                        {/* <h4 onClick={e => getSpecific(e,user._id)}> {name} </h4> */}

                        <p><TimeAgo
                            datetime={date}
                        // locale='zh_CN'
                        /></p>

                        {/* <p> {time} <span> hrs</span> <i className="uil-users-alt" /> </p> */}
                    </div>
                    <div className="post-btn-action">
                        <span className="icon-more uil-ellipsis-h" />
                        <div className="mt-0 p-2" uk-dropdown="pos: top-right;mode:hover ">
                            <ul className="uk-nav uk-dropdown-nav">
                                {/* <li><a href="#"> <i className="uil-share-alt mr-1" /> Share</a> </li>
                                <li><a href="#"> <i className="uil-edit-alt mr-1" /> Edit Post </a></li>
                                <li><a href="#"> <i className="uil-comment-slash mr-1" /> Disable comments
                                                      </a></li>
                                <li><a href="#"> <i className="uil-favorite mr-1" /> Add favorites </a>
                                </li> */}
                                <li><a href="#" className="text-danger"> <i className="uil-trash-alt mr-1" />
                                                    Delete </a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* <div class="post-description">
                <div class="uk-grid-small uk-grid">
                <div class="uk-width-1-1@m">
                <img src="assets/images/post/img-4.jpg" class="rounded"></div>

                <div class="uk-width-1-2@m uk-width-1-2"><img src="assets/images/post/img-2.jpg" class="rounded"></div>

                <div class="uk-width-1-2@m uk-width-1-2 uk-position-relative">
                <img src="assets/images/post/img-3.jpg" class="rounded">
                <div class="uk-position-center uk-light"><a href="#">
                <h3> + 15 more </h3>
                </a></div></div></div><div class="post-state-details"><div><img src="assets/images/icons/reactions_like.png"><img src="assets/images/icons/reactions_love.png"><p> 13 </p></div><p> <span class="mr-2"> <i class="uil-eye"></i> Veiws </span> 212 Comments </p></div></div> */}

                <div className="post-description">
                    <p> {text} </p>
                    <div class="uk-grid-small uk-grid">
                        {/* <div class="uk-width-1-1@m">
                     
                            </div> */}
                        {images.map((file, i) => {
                            if (images.length == 1) {
                                return <div key={i} className="uk-width-1-1@m">
                                    <img src={file.image} style={{ width: '100%' }} className="rounded" alt />
                                </div>
                            } else {
                                return <div key={i} className="uk-width-1-2@m uk-width-1-2">
                                    <img src={file.image} style={{ width: '100%' }} className="rounded" alt />
                                </div>
                            }

                        })
                        }
                        {/* <div className="fullsizeimg">

                            {images.map((file, i) => {
                                <img src={file.image} alt />
                            })
                            } */}
                    </div>

                    <div className="post-state-details">
                        <div>

                            <img src={like} alt />
                            <img src={love} alt />
                            {likes ?
                                <p>{likes.length + (likeNumber) == 0 || likes.length + (likeNumber) < 0 ? '' : likes.length + (likeNumber)}</p>
                                : ''
                            }
                        </div>
                        {/* <p>{comments.length} Comments</p> */}
                    </div>
                </div>
                <div className="post-state">
                    {/* <div className="post-state-btns" style={{ width: "20px", display: "flex", justifyContent: "flex-start", padding: "0px 15px" }}>{userLikes == true ? <i class="fas fa-thumbs-up" style={{ color: "#39f" }} onClick={e => removeLikes(e, file_id, user._id)}></i> : <i className="uil-thumbs-up" onClick={e => addLikes(e, file_id, user._id)} />} {likes.length + (likeNumber) == 0 || likes.length + (likeNumber) < 0 ? '' : likes.length + (likeNumber)}<span> Liked </span>
                    </div>
                    <div className="post-state-btns" style={{ width: "20px", display: "flex", justifyContent: "flex-end", padding: "10px" }}> <i className="uil-heart" /> {comments.length} <span> Coments</span>
                    </div> */}

                    <div className="post-state-btns" style={{ width: "20px", display: "flex", justifyContent: "flex-start", padding: "0px 15px" }}>{userLikes == true ? <i class="fas fa-thumbs-up" style={{ color: "#39f" }} onClick={e => removeLikes(e, file_id, user._id)}></i> : <i className="uil-thumbs-up" onClick={e => addLikes(e, file_id, user._id)} />} {likes ? likes.length + (likeNumber) == 0 ? '' : likes.length + (likeNumber): ''}<span> Liked </span>
                        </div>
                        <div className="post-state-btns" style={{ width: "20px", display: "flex", justifyContent: "flex-end", padding: "10px" }}> <i className="uil-heart" /> {comments ? comments.length : ''} <span> Coments</span>
                        </div>


                    {/* <div className="post-state-btns"> <i className="uil-share-alt" /> 193 <span> Shared
                    </span>
                    </div>
                    <div className="post-state-btns"> <i className="uil-bookmark" /> 13 <span> Saved </span> */}
                    {/* </div> */}
                </div>
                {/* post comments */}
                <div className="post-comments">
                    {/* {comments && comments.length > 2 && <a href="#" className="view-more-comment"> View {comments.length - 2} more Comments</a>} */}
                    {/* {comments.slice(0, 2).map((comment, i) => { */}
                    {comments && comments.map((comment, i) => {


                        return <CommentItem key={i} socket={socket} commentLikes={comment.commentLikes} comment={comment} file_id={file_id} />

                        // if(comments.length > 2){
                        // return <Fragment>
                        //     <div className="post-comments-single">
                        //         <div className="post-comment-avatar">
                        //             <img src="assets/images/avatars/avatar-5.jpg" alt />
                        //         </div>
                        //         <div className="post-comment-text">
                        //             <div className="post-comment-text-inner">
                        //                 <h6>{comment.name}</h6>
                        //                 <p>{comment.text}</p>
                        //             </div>
                        //             <div className="uk-text-small">
                        //                 <a href="#" className="text-primary mr-1">
                        //                 {commentLike == true ? <i class="fas fa-thumbs-up" style={{ color: "#39f" }} onClick={e => removeCommentLikes(e, file_id, comment._id)}></i> : <i className="uil-thumbs-up" onClick={e => addCommentLikes(e, file_id, comment.comment_id)} />} {comment.commentLikes.length + (commentLikeNumber) == 0 || comment.commentLikes.length + (commentLikeNumber) < 0 ? '' : comment.commentLikes.length }<span> Liked </span>
                        //                   </a>
                        //                 {/* <a href="#" className=" mr-1"> Replay </a>
                        //                 <span> 1d</span> */}
                        //             </div>
                        //         </div>
                        //         <a href="#" className="post-comment-opt" />
                        //     </div>
                        // </Fragment>



                        // }else{
                        //     return <div className="post-comments-single">
                        //     <div className="post-comment-avatar">
                        //         <img src="assets/images/avatars/avatar-5.jpg" alt />
                        //     </div>
                        //     <div className="post-comment-text">
                        //         <div className="post-comment-text-inner">
                        //             <h6>{comment.name}</h6>
                        //             <p>{comment.text}</p>
                        //         </div>
                        //         <div className="uk-text-small">
                        //             <a href="#" className="text-danger mr-1"> <i className="uil-heart" /> Love
                        //                                  </a>
                        //             {/* <a href="#" className=" mr-1"> Replay </a> */}
                        //             <span> 1d</span>
                        //         </div>
                        //     </div>
                        //     <a href="#" className="post-comment-opt" />
                        // </div>

                        // }
                    })}

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
                    <form onSubmit={(e) => handleComment(e, file_id, name)}>
                        <div className="post-add-comment">
                            <div className="post-add-comment-avature">
                                <img src={user_image} alt />
                            </div>
                            <div className="post-add-comment-text-area">
                                <input type="text" value={comment} onChange={e => setComment(e.target.value)} placeholder="Write your comment..." />
                                <div className="icons">
                                    <span><input type="submit" value={isLoading ? "Loading..." : "Share"} className="button primary px-6" style={{
                                        position: "relative",
                                        top: "-10px"
                                    }} />
                                    </span>

                                    {/* <span className="uil-link-alt" />
                                <span className="uil-grin" />
                                <span className="uil-image" /> */}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment >
    ) : (
            <Fragment>
                <div className="post">
                    <div className="post-heading">
                        <div className="post-avature">
                            <img src={user_image} alt />
                        </div>
                        <div className="post-title">
                            <Link to={`/profile/${user_id}`} class="view"><h4>{name}</h4></Link>
                            <p><TimeAgo
                                datetime={date}
                            // locale='zh_CN'
                            /></p>

                            {/* <p> {time}<span> hrs</span> <i className="uil-users-alt" /> </p> */}
                        </div>
                        <div className="post-btn-action">
                            <span className="icon-more uil-ellipsis-h" />
                            <div className="mt-0 p-2" uk-dropdown="pos: top-right;mode:hover ">
                                <ul className="uk-nav uk-dropdown-nav">
                                    {/* <li><a href="#"> <i className="uil-share-alt mr-1" /> Share</a> </li>
                                    <li><a href="#"> <i className="uil-edit-alt mr-1" /> Edit Post </a></li>
                                    <li><a href="#"> <i className="uil-comment-slash mr-1" /> Disable comments
                                    </a></li>
                                    <li><a href="#"> <i className="uil-favorite mr-1" /> Add favorites </a>
                                    </li> */}
                                    <li><a href="#" className="text-danger"> <i className="uil-trash-alt mr-1" />
                                                        Delete </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="post-description">
                        <p> {text}</p>
                        <div className="post-state-details">
                            <div>

                                <img src={like} alt />
                                <img src={love} alt />
                                {likes ?
                                    <p>{likes.length + (likeNumber) == 0 || likes.length + (likeNumber) < 0 ? '' : likes.length + (likeNumber)}</p>
                                    : ''
                                }
                            </div>
                            {/* <p>{comments.length} Comments</p> */}
                        </div>
                    </div>
                    <div className="post-state">
                        <div className="post-state-btns" style={{ width: "20px", display: "flex", justifyContent: "flex-start", padding: "0px 15px" }}>{userLikes == true ? <i class="fas fa-thumbs-up" style={{ color: "#39f" }} onClick={e => removeLikes(e, file_id, user._id)}></i> : <i className="uil-thumbs-up" onClick={e => addLikes(e, file_id, user._id)} />} {likes ? likes.length + (likeNumber) == 0 ? '' : likes.length + (likeNumber): ''}<span> Liked </span>
                        </div>
                        <div className="post-state-btns" style={{ width: "20px", display: "flex", justifyContent: "flex-end", padding: "10px" }}> <i className="uil-heart" /> {comments ? comments.length : ''} <span> Comments</span>
                        </div>
                        {/* <div className="post-state-btns"> <i className="uil-share-alt" /> 193 <span> Shared
                                                  </span>
                        </div>
                        <div className="post-state-btns"> <i className="uil-bookmark" /> 13 <span> Saved </span>
                        </div> */}
                    </div>
                    {/* post comments */}
                    <div className="post-comments">
                        {/* {comments.length  && <a href="#" className="view-more-comment"> View {comments.length - 2} more Comments</a>} */}
                        {comments && comments.map((comment, i) => {
                            return <CommentItem key={comment.file_id} commentLikes={comment.commentLikes} comment={comment} file_id={file_id} />

                            // if(comments.length > 2){
                            // return <Fragment>
                            //     <div className="post-comments-single">
                            //         <div className="post-comment-avatar">
                            //             <img src="assets/images/avatars/avatar-5.jpg" alt />
                            //         </div>
                            //         <div className="post-comment-text">
                            //             <div className="post-comment-text-inner">
                            //                 <h6>{comment.name}</h6>
                            //                 <p>{comment.text}</p>
                            //             </div>
                            //             <div className="uk-text-small">
                            //                 <a href="#" className="text-primary mr-1">
                            //                 {commentLike == true ? <i class="fas fa-thumbs-up" style={{ color: "#39f" }} onClick={e => removeCommentLikes(e, file_id, comment._id)}></i> : <i className="uil-thumbs-up" onClick={e => addCommentLikes(e, file_id, comment.comment_id)} />} {comment.commentLikes.length + (commentLikeNumber) == 0 || comment.commentLikes.length + (commentLikeNumber) < 0 ? '' : comment.commentLikes.length }<span> Liked </span>
                            //                   </a>
                            //                 {/* <a href="#" className=" mr-1"> Replay </a>
                            //                 <span> 1d</span> */}
                            //             </div>
                            //         </div>
                            //         <a href="#" className="post-comment-opt" />
                            //     </div>
                            // </Fragment>



                            // }else{
                            //     return <div className="post-comments-single">
                            //     <div className="post-comment-avatar">
                            //         <img src="assets/images/avatars/avatar-5.jpg" alt />
                            //     </div>
                            //     <div className="post-comment-text">
                            //         <div className="post-comment-text-inner">
                            //             <h6>{comment.name}</h6>
                            //             <p>{comment.text}</p>
                            //         </div>
                            //         <div className="uk-text-small">
                            //             <a href="#" className="text-danger mr-1"> <i className="uil-heart" /> Love
                            //                                  </a>
                            //             {/* <a href="#" className=" mr-1"> Replay </a> */}
                            //             <span> 1d</span>
                            //         </div>
                            //     </div>
                            //     <a href="#" className="post-comment-opt" />
                            // </div>

                            // }
                        })}

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
                        {/* <form onSubmit={handleComment}> */}
                        <div className="post-add-comment">
                            <div className="post-add-comment-avature">
                                <img src={user_image} alt />
                            </div>
                            <div className="post-add-comment-text-area">
                                <input type="text" value={comment} onChange={e => setComment(e.target.value)} placeholder="Write your comment..." />
                                <div className="icons">
                                    <span><input type="submit" value={isLoading ? "Loading..." : "Share"} className="button primary px-6" onClick={e => handleComment(e, file_id, name)} style={{
                                        position: "relative",
                                        top: "-10px"
                                    }} />
                                    </span>

                                    {/* <span className="uil-link-alt" />
                                <span className="uil-grin" />
                                <span className="uil-image" /> */}
                                </div>
                            </div>
                        </div>
                        {/* </form> */}
                    </div>
                </div>
            </Fragment >
        )


}

// return loading == true ? ( <Loader /> )
//  : (

PostItem.PropTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired,
    // removeLikes: PropTypes.func.isRequired,
    // deletePost: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth,
})
export default connect(mapStateToProps, { getProfileById })(PostItem);



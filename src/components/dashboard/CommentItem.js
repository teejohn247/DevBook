import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from "socket.io-client/dist/socket.io.js";
import { addLike, removeLike, addComment, addCommentLike, removeCommentLike } from '../../actions/post';
import LoadingSpinner from '../layout/spinner';


const socket = io.connect('http://localhost:4000', { 'forceNew': true })



const CommentItem = ({  commentLikes, comment: { _id, comment_id, text, name, user_image,  date }, auth:{user}, file_id}) => {
    const dispatch = useDispatch();


    const [commentLike, setCommentLike] = useState(false);
    const [clemmited, setClEmmited] = useState(false);
    const [commentLikeNumber, setCommentLikeNumber] = useState(0);


    useEffect(() => {
        var arr2 = []

        if (commentLikes) {
          if(commentLikes.length){

            commentLikes.some((like, i) => {
                console.log('nooo',like.user == user.name)
                console.log('name', like.user)
                console.log('name2', user.name)
                like.user == user._id ? arr2.push(true) : arr2.push(false)
                console.log({arr2})

            })
            arr2.includes(true) ? setCommentLike(true) : setCommentLike(false)
            console.log({commentLike})
        
        }else{
            setCommentLike(false)
        }
    }
    }, [commentLikes])

    // useEffect(() => {
    //     // console.log("commentLikes",comments.commentLikes)
    //     var arr = []

    //     if (likes) {
    //       if(likes.length){
    //         likes.some((like, i) => {
    //             like.user == user._id ? arr.push(true) : arr.push(false)
    //         })
    //         arr.includes(true) ? setUserLikes(true) : setUserLikes(false)
    //     }else{
    //         setUserLikes(false)
    //     }
    //     }
    // }, [likes])

    

    const addCommentLikes = (e, file_id,comment_id, user) => {
        e.preventDefault();
        
        console.log('add', file_id, comment_id)
        socket.emit('comment_like', {
            file_id: file_id,
            comment_id: comment_id,
            name: user,
            like:"add"

        })
        // setEmmited(true)
        // setClEmmited(true)
        // setCommentLike(true)
        console.log({commentLike})
        // setCommentLikeNumber(1)
    }

    const removeCommentLikes = (e, file_id,comment_id, user) => {
        e.preventDefault();
        console.log('remove', file_id, comment_id)
        socket.emit('comment_like', {
            file_id: file_id,
            comment_id: comment_id,
            name:user,
            like:"remove"
        })
        // setEmmited(true)
        // setClEmmited(true)
        // setCommentLike(!commentLike)
        // setCommentLike(false)
        console.log({commentLike})
        // setCommentLikeNumber(-1)
    }

    // useEffect(() => {
    //     // if(clemmited){
    //     // if (commentLike == false) {
    //     //     socket.on('comment_like', function (data) {
    //     //         console.log(data);
    //     //         dispatch(removeCommentLike(data))
    //     //         socket.off("comment_like");
    //     //         setCommentLike(false)
    //     //         setClEmmited(false)
    //     //         return

    //     //     })
    //     // } 
        
    //     // else {
    //         // socket.on('comment_like', function (data) {
    //         //     console.log(data);
    //         //     dispatch(addCommentLike(data))
    //         //     socket.off("comment_like");
    //         //     setCommentLike(true)
    //         //     setClEmmited(false)
    //         //     return
    //         // })
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

    //     // }
    // // }
    //     },[])
    // // },[clemmited])

    return(

    <Fragment>
    <div className="post-comments-single">
        <div className="post-comment-avatar">
            <img src={user_image} alt />
        </div>
        <div className="post-comment-text">
            <div className="post-comment-text-inner">
                <h6>{name}</h6>
                <p>{text}</p>
            </div>
            <div className="uk-text-small">
                <a href="#" className="text-primary mr-1">
                {commentLike == true ? <i class="fas fa-thumbs-up" style={{ color: "#39f" }} onClick={e => removeCommentLikes(e, file_id, comment_id, user._id)}></i> : <i className="uil-thumbs-up" onClick={e => addCommentLikes(e, file_id, comment_id, user._id)} />} {commentLikes.length == 0 || commentLikes.length  < 0 ? '' : commentLikes.length }<span> Liked </span>
                  </a>
                {/* <a href="#" className=" mr-1"> Replay </a>
                <span> 1d</span> */}
            </div>
        </div>
        <a href="#" className="post-comment-opt" />
    </div>
</Fragment>
 )



}

CommentItem.PropTypes = {
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,

}
const mapStateToProps = (state) => ({
    auth: state.auth,
})
export default connect(mapStateToProps)(CommentItem);
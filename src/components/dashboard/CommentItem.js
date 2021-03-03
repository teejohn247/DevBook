import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from "socket.io-client";
import { addLike, removeLike, addComment, addCommentLike, removeCommentLike } from '../../actions/post';
import LoadingSpinner from '../layout/spinner';


const socket = io.connect('http://localhost:4000')


const CommentItem = ({ comment: { _id, comment_id, text, name, commentLikes, date }, auth:{user}, file_id}) => {
    const dispatch = useDispatch();


    const [commentLike, setCommentLike] = useState(false);
    const [clemmited, setClEmmited] = useState(false);
    const [commentLikeNumber, setCommentLikeNumber] = useState(0);


    useEffect(() => {
        if (commentLikes) {
            commentLikes.some((like, i) => {
                like.user == user.name ? setCommentLike(true) : setCommentLike(false)
            })
        }
    }, [commentLike])

    const addCommentLikes = (e, file_id,comment_id) => {
        e.preventDefault();
        
        console.log('add', file_id, comment_id)
        socket.emit('comment_like', {
            file_id: file_id,
            comment_id: comment_id,
            name: name
        })
        // setEmmited(true)
        setClEmmited(true)
        setCommentLike(true)
        console.log({commentLike})
        // setCommentLikeNumber(1)
    }

    const removeCommentLikes = (e, file_id,comment_id) => {
        e.preventDefault();
        console.log('add', file_id, comment_id)
        socket.emit('comment_like', {
            file_id: file_id,
            comment_id: comment_id,
            name:name
        })
        // setEmmited(true)
        setClEmmited(true)
        // setCommentLike(!commentLike)
        setCommentLike(false)
        console.log({commentLike})
        // setCommentLikeNumber(-1)
    }

    useEffect(() => {
        if(clemmited){
        if (commentLike == false) {
            socket.on('comment_like', function (data) {
                console.log(data);
                dispatch(removeCommentLike(data))
                socket.off("comment_like");
                setCommentLike(false)
                setClEmmited(false)
                return

            })
        } else {
            socket.on('comment_like', function (data) {
                console.log(data);
                dispatch(addCommentLike(data))
                socket.off("comment_like");
                setCommentLike(true)
                setClEmmited(false)
                return
            })
            // socket.on('comment_like', function (data) {
            //     console.log(data);
            //     dispatch(addCommentLike(data))
            //     // dispatch(removeCommentLike(data))
            //     socket.off("comment_like");
            //     setCommentLike(false)
            //     setClEmmited(false)
            //     // setCommentLikeNumber(1)
            //     return

            // })

        }
    }

    },[clemmited])

    return(

    <Fragment>
    <div className="post-comments-single">
        <div className="post-comment-avatar">
            <img src="assets/images/avatars/avatar-5.jpg" alt />
        </div>
        <div className="post-comment-text">
            <div className="post-comment-text-inner">
                <h6>{name}</h6>
                <p>{text}</p>
            </div>
            <div className="uk-text-small">
                <a href="#" className="text-primary mr-1">
                {commentLike == true ? <i class="fas fa-thumbs-up" style={{ color: "#39f" }} onClick={e => removeCommentLikes(e, file_id, comment_id)}></i> : <i className="uil-thumbs-up" onClick={e => addCommentLikes(e, file_id, comment_id)} />} {commentLikes.length == 0 || commentLikes.length  < 0 ? '' : commentLikes.length }<span> Liked </span>
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
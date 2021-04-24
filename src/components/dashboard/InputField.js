import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from "socket.io-client/dist/socket.io.js";

import { getPosts } from '../../actions/post';
import { loader, removeLoader } from '../../actions/loader';



import TextareaAutosize from "react-textarea-autosize";

import { addLike, removeLike, addComment, addCommentLike, removeCommentLike } from '../../actions/post';
import LoadingSpinner from '../layout/spinner';
import { Alert } from 'react-bootstrap';

import live from '../../images/assets/images/icons/live.png';
import photo from '../../images/assets/images/icons/photo.png';
import tagFriend from '../../images/assets/images/icons/tag-friend.png';
import avatar from '../../images/assets/images/avatars/avatar-2.jpg';





// const socket = io.connect('http://localhost:4000', { 'forceNew': true })




const inputField = ({ loader, removeLoader, user, profile, socket, onChange, value, feedLoader}) => {
    // console.log({loader})

    const [selectetdFile, setSelectedFile] = useState([]);
    const [post, setPost] = useState(value);
    const [emmited, setEmmited] = useState(false);
    const [postField, setPostField] = useState(false);
    const [isLoading, setIsLoading] = useState(!loader);
    const [isLoaded, setIsLoaded] = useState(false);


    const [postInput, setPostInput] = useState(false);

    const [comment, setComment] = useState("");
    const [emitComment, setEmitComment] = useState(false);
    const [like, setLike] = useState(false);

    function handleChange(event) {
        // Here, we invoke the callback with the new value
        // postInput(true)
        onChange(event.target.value);
        // setPost(value)
        // console.log({post})
      }

    //   function handleChange(event) {
    //     onChange2(true);
    //   }





    // useEffect(() => {
    //     // console.log("commentLikes",comments.commentLikes)

    //     if (likes) {
    //         likes.some((like, i) => {
    //             like.user == user._id ? setUserLike(true) : setUserLike(false)
    //         })
    //     }
    // }, [userLike])

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setIsLoading(loader)
        // onChange(true)
        console.log({onChange})
        var d = new Date();
        var unique = d.valueOf();


        // alert(`Submitting Name ${post}`)
        // var files 
        if (selectetdFile.length > 0) {
            console.log(selectetdFile)
            alert('here1')

            socket.emit('post_with_images', {
                file_id: unique,
                user_id: user._id,
                text: value,
                name: user.name,
                email: user.email,
                user_image: user.image,
                user_id: profile.user,
                date: Date.now(),
                likes: [],
                comments: [],
                images: selectetdFile,
                postIsLoading: true

            })
           
            setEmmited(true)
        // setIsLoading(!loader)
        removeLoader()



        } else {

            alert('here1')

            socket.emit('post', {
                file_id: unique,
                user_id: user._id,
                name: user.name,
                email: user.email,
                user_id: profile.user,
                user_image: user.image,
                date: Date.now(),
                likes: [],
                comments: [],
                text: value,
                postIsLoading: true
                // name: 
            })
            setEmmited(true)
        setIsLoading(!loader)

        }

    }

    const [fileBase64String, setFileBase64String] = useState("");

    socket.on('post_with_images', function (data) {
     


      
        setSelectedFile([])
        // setSelectetdFile([])
      


    })

  
    function handleRemove(id) {
        const newList = selectetdFile.filter((item, i) => i != id);
        setSelectedFile(newList);
    }


    const fileToDataUri = (image) => {
        return new Promise((res) => {
            const reader = new FileReader();
            const { type, name, size } = image;
            reader.addEventListener('load', () => {
                res(reader.result)
                //   res({
                //       base64: reader.result,
                //       name: name,
                //       type,
                //       size: size,
                //   })
            });
            reader.readAsDataURL(image);
        })
    }

    const encodeFileBase64 = async (e) => {
        if(e.target.files && e.target.files.length > 2){
            alert("You cannot upload more than 3 files")
        }
        if (e.target.files && e.target.files.length > 0) {
            const newImagesPromises = []
            for (let i = 0; i < e.target.files.length; i++) {
                newImagesPromises.push(fileToDataUri(e.target.files[i]))
            }
            const newImages = await Promise.all(newImagesPromises)
            setSelectedFile([...selectetdFile, ...newImages]);
            console.log('chk', selectetdFile)

        }
    }
    const encodeFileBase647 = async (event) => {
        event.preventDefault();

        var reader = new FileReader();
        if (event) {
            var allImages = []
            for (let i = 0; i < event.target.files.length; i++) {
                //    let file = event.target.files[i];
                reader.readAsDataURL(event.target.files[i]);
                reader.onload = () => {
                    var Base64 = reader.result;
                    console.log('bb', Base64);
                    allImages.push(Base64)
                };
                reader.onerror = (error) => {
                    console.log("error: ", error);
                };
            }

            const newImages = await Promise.all(allImages)
            // setImages([...images, ...newImages])
            setSelectedFile([...selectetdFile, ...newImages]);

        }
        event.target.value = "";

    };

    const dispatch = useDispatch();

    
    const handleTarget = () => {
        setPostInput(!postInput)
        console.log({ postInput })
    }

    socket.on('post', function (data) {
        console.log(data);
        // alert('here33')

        setIsLoaded(false)
        // setEmmited(false)
        setPostInput(false)
        setPostField(false)
        // setComment("");
        // setIsLoading(false);
        // setEmmited(false)
        // setEmitComment(false);
       
    })


    socket.on('post_with_images', function (data) {
        console.log(data);
        // alert('here33')

        setIsLoaded(false)
        // setEmmited(false)
        setPostInput(false)
        setPostField(false)
        // setComment("");
        // setIsLoading(false);
        // setEmmited(false)
        // setEmitComment(false);
       
    })






    return (
        <Fragment>
            {!postInput &&
                <div className="post-new">
                    <div className="post-new-media">
                        <div className="post-new-media-user">
                            <img src={user.image} alt />
                        </div>
                        <div className="post-new-media-input">
                            {/* <input type="text" placeholder="Write your comment..." /> */}

                            <input type="text" onClick={handleTarget} value={post} onChange={handleChange} className="uk-input" placeholder= {`What's on Your Mind ${user.name.split(" ")[0]}?`} />
                        </div>
                    </div>
                    <hr />
                    {/* <div className="post-new-type">
                        <a href="#">
                        
                            <img src={live} alt />
                                                    Go Live
                                                    </a>
                        <a href="#">
                            <img src={photo} alt />
                                                    Photo/Video
                                                    </a>
                        <a href="#" className="uk-visible@s">
                            <img src={photo} alt />
                                                    Tag Friend
                                                    </a>
                        <a href="#"><img src={photo} alt />
                                                    Fealing
                                                    </a>
                    </div> */}
                </div>
            }
            {postInput ?
                <Fragment>
                    <form onSubmit={handleSubmit} >
                        <div className="post-pop" style={{ display: 'block !important' }}>
                            <div className="post-new-overyly" style={{ visibility: "visible !important", zIndex: 0 }} />
                            <div className="post-new uk-animation-slide-top-small" style={{ display: 'block !important', zIndex: 10 }}>
                                <div className="post-new-header">
                                    <h4> Create new post</h4>
                                    {/* close button*/}
                                    <span onClick={handleTarget} className="post-new-btn-close" />
                                </div>
                                <div className="post-new-media">
                                    <div className="post-new-media-user">
                                        {/* <img src={avatar} alt /> */}
                                     <img src={user.image} alt />

                                    </div>
                                    <div className="post-new-media-input">
                                    <input type="text" value={value} onChange={handleChange}
                                    className="uk-input" placeholder= {`What's on Your Mind ${user.name.split(" ")[0]}?`} />
                                        {/* <input type="text" value={post} onChange={e => setPost(e.target.value)} className="uk-input" placeholder="What's Your Mind ? Dennis!" /> */}
                                    </div>
                                </div>
                                <div className="post-new-tab-nav">
                                    <div style={{ width: "100%" }}>
                                        <label htmlFor="upload-button" style={{ display: 'flex', justifyContent: "center" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                <path fill="#4db3f6" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z">
                                                </path>
                                            </svg>
                                            <h5 style={{ marginTop: "13px" }}>Upload your photo</h5>
                                        </label>
                                        <input type="file" multiple accept="image/*" id="upload-button" style={{ display: 'none' }} onChange={encodeFileBase64} />
                                        <TextareaAutosize
                                            style={{ display: "none" }}
                                            maxRows={20}
                                            value={fileBase64String}
                                            onChange={encodeFileBase64}
                                        />
                                        <br />
                                    </div>
{/* 
                                    <div style={{ width: "30%" }}>
                                        <label htmlFor="video-button" style={{ display: 'flex' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 512 512">
                                                <path fill="#71a257" d="M450.6 153.6c-3.3 0-6.5.9-9.3 2.7l-86.5 54.6c-2.5 1.6-4 4.3-4 7.2v76c0 2.9 1.5 5.6 4 7.2l86.5 54.6c2.8 1.7 6 2.7 9.3 2.7h20.8c4.8 0 8.6-3.8 8.6-8.5v-188c0-4.7-3.9-8.5-8.6-8.5h-20.8zM273.5 384h-190C55.2 384 32 360.8 32 332.6V179.4c0-28.3 23.2-51.4 51.4-51.4h190c28.3 0 51.4 23.2 51.4 51.4v153.1c.1 28.3-23 51.5-51.3 51.5z">
                                                </path>
                                            </svg>
                                            <h5 style={{ marginTop: "13px" }}>Upload your video</h5>
                                        </label>
                                        <input type="file" id="video-button" style={{ display: 'none' }} onChange={encodeFileBase64} />
                                        <TextareaAutosize
                                            style={{ display: "none" }}
                                            maxRows={20}
                                            value={fileBase64String}
                                            onChange={encodeFileBase64}
                                        />
                                        <br />
                                    </div> */}

                                    {/* <div style={{ width: "30%" }}>
                                        <label htmlFor="file-button" style={{ display: 'flex' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                <path fill="#4db3f6" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z">
                                                </path>
                                            </svg>
                                            <h5 style={{ marginTop: "13px" }}>Upload your photo</h5>
                                        </label>
                                        <input type="file" id="file-button" multiple accept="image/*" style={{ display: 'none' }} onChange={encodeFileBase64} />
                                        <TextareaAutosize
                                            style={{ display: "none" }}
                                            maxRows={20}
                                            value={fileBase64String}
                                            onChange={encodeFileBase64}
                                        />
                                        <br />
                                    </div> */}
                                    <div style={{display:"flex"}}>
                                        {selectetdFile.length > 0 ? selectetdFile.map((a, i) =>
                                            <span className="img-contain img-mob" style={{
                                                marginRight: "20px"}}>
                                                <img key={i} src={a} style={{
                                                    width: '100%',
                                                    objectFit: 'cover',
                                                    marginRight: '10px',
                                                    height: '100px',
                                                    borderRadius: '20px '
                                                }} />
                                                <p style={{color: "red",marginLeft: "30px"}} onClick={() => handleRemove(i)}>Remove</p>
                                            </span>) : ''
                                        }
                                    </div>

                                </div>
                                <div className="uk-flex uk-flex-between">
                                    <button className="button outline-light circle" type="button" style={{ borderColor: '#e6e6e6', borderWidth: 1 }}>Public</button>
                                    <div uk-dropdown>
                                        <ul className="uk-nav uk-dropdown-nav">
                                            <li className="uk-active"><a href="#">Every One</a></li>
                                            {/* <li><a href="#">Every one</a></li> */}
                                            {/* <li><a href="#"> People I Follow </a></li>
                                            <li><a href="#">I People Follow Me</a></li> */}
                                        </ul>
                                    </div>
                                    <input type="submit" value={isLoaded ? "Loading..." : "Share"} className="button primary px-6" />

                                </div>
                            </div>
                        </div>
                    </form>
                </Fragment> : ''
            }
        </Fragment>

    )

}


inputField.PropTypes = {
    // postItem: PropTypes.bool.isRequired,
    getPosts: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    addCommentLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    removeCommentLike: PropTypes.func.isRequired,
    loader: PropTypes.func.isRequired,
    removeLoader: PropTypes.func.isRequired,

}
const mapStateToProps = (state) => ({
    auth: state.auth,
    post: state.post,
    loader: state.loader

})
export default connect(mapStateToProps, { getPosts, loader, removeLoader, addComment, addLike, removeLike, addComment, addCommentLike, removeCommentLike})(inputField);

// { addLike, removeLike, addComment, addCommentLike, removeCommentLike }
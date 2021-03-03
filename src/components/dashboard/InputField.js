import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from "socket.io-client";
import { getPosts } from '../../actions/post';


import TextareaAutosize from "react-textarea-autosize";

import { addLike, removeLike, addComment, addCommentLike, removeCommentLike } from '../../actions/post';
import LoadingSpinner from '../layout/spinner';

const socket = io.connect('http://localhost:4000')



const inputField = ({user,profile, getPosts}) => {
    const [selectetdFile, setSelectedFile] = useState([]);
    const [post, setPost] = useState("");
    const [emmited, setEmmited] = useState(false);
    const [postField, setPostField] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [postInput, setPostInput] = useState(false);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setIsLoading(true)
        var d = new Date();
        var unique = d.valueOf();


        // alert(`Submitting Name ${post}`)
        // var files 
        if (selectetdFile.length > 0) {
            console.log(selectetdFile)

            socket.emit('post_with_images', {
                file_id: unique,
                text: post,
                name: user.name,
                email: user.email,
                user: profile.user,
                time: Date.now(),
                likes: [],
                comments: [],
                images: selectetdFile
            })

            setEmmited(true)


        } else {

            alert('here1')

            socket.emit('post', {
                file_id: unique,
                name: user.name,
                email: user.email,
                user: profile.user,
                time: Date.now(),
                likes: [],
                comments: [],
                text: post,
                // name: 
            })

            setEmmited(true)


        }

    }

    const [fileBase64String, setFileBase64String] = useState("");

  
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

    
    useEffect(() => {

        if (emmited == true) {
            socket.on('post', function (data) {
                console.log(data);


                dispatch(getPosts(data))
                socket.off("post");
                setPost("")
                setIsLoading(false)
                setEmmited(false)
                setPostInput(false)
                setPostField(false)


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
                    text: data.text,
                    time: data.time,
                    user: data.user
                }
                dispatch(getPosts(msg))
                socket.off("post_with_images");
                setPost("")
                setSelectedFile([])
                setPostField(false)
                setIsLoading(false)
                setPostInput(false)
                setEmmited(false)


            })
        }



    }, [emmited])




    return (
        <Fragment>
            {!postInput &&
                <div className="post-new">
                    <div className="post-new-media">
                        <div className="post-new-media-user">
                            <img src="assets/images/avatars/avatar-2.jpg" alt />
                        </div>
                        <div className="post-new-media-input">
                            {/* <input type="text" placeholder="Write your comment..." /> */}

                            <input type="text" onClick={handleTarget} className="uk-input" placeholder="What's Your Mind ? Hamse!" />
                        </div>
                    </div>
                    <hr />
                    <div className="post-new-type">
                        <a href="#">
                            <img src="assets/images/icons/live.png" alt />
                                                    Go Live
                                                    </a>
                        <a href="#">
                            <img src="assets/images/icons/photo.png" alt />
                                                    Photo/Video
                                                    </a>
                        <a href="#" className="uk-visible@s">
                            <img src="assets/images/icons/tag-friend.png" alt />
                                                    Tag Friend
                                                    </a>
                        <a href="#"><img src="assets/images/icons/reactions_wow.png" alt />
                                                    Fealing
                                                    </a>
                    </div>
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
                                        <img src="assets/images/avatars/avatar-2.jpg" alt />
                                    </div>
                                    <div className="post-new-media-input">
                                        <input type="text" value={post} onChange={e => setPost(e.target.value)} className="uk-input" placeholder="What's Your Mind ? Dennis!" />
                                    </div>
                                </div>
                                <div className="post-new-tab-nav">
                                    <div style={{ width: "30%" }}>
                                        <label htmlFor="upload-button" style={{ display: 'flex' }}>
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
                                        {/* <button>Upload</button> */}
                                    </div>

                                    <div style={{ width: "30%" }}>
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
                                        {/* <button>Upload</button> */}
                                    </div>
                                    <div>
                                        {selectetdFile.length > 0 ? selectetdFile.map((a, i) =>
                                            <span className="img-contain">
                                                <img key={i} src={a} style={{
                                                    width: '15%',
                                                    marginRight: '10px',
                                                    height: '100px',
                                                    borderRadius: '20px '
                                                }} />
                                                {/* <p onClick={() => handleRemove(i)}>Cancel</p> */}
                                            </span>) : ''
                                        }
                                    </div>

                                </div>
                                <div className="uk-flex uk-flex-between">
                                    <button className="button outline-light circle" type="button" style={{ borderColor: '#e6e6e6', borderWidth: 1 }}>Public</button>
                                    <div uk-dropdown>
                                        <ul className="uk-nav uk-dropdown-nav">
                                            <li className="uk-active"><a href="#">Only me</a></li>
                                            <li><a href="#">Every one</a></li>
                                            <li><a href="#"> People I Follow </a></li>
                                            <li><a href="#">I People Follow Me</a></li>
                                        </ul>
                                    </div>
                                    <input type="submit" value={isLoading ? "Loading..." : "Share"} className="button primary px-6" />

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

}
const mapStateToProps = (state) => ({
    auth: state.auth,
})
export default connect(mapStateToProps, { getPosts})(inputField);
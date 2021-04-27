import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from "socket.io-client/dist/socket.io.js";

// import { addFriend } from '../../actions/profile';
// import { getProfileById } from '../../actions/profile';
import { getCurrentProfile, getProfileById } from '../../actions/profile';


import { BrowserRouter, useHistory, useParams } from 'react-router-dom';
import { addFriend } from '../../actions/profile';
import { setAlert } from '../../actions/alert';
import TextareaAutosize from "react-textarea-autosize";

import Alert from '../layout/Alert';




import LoadingSpinner from '../layout/spinner';


const socket = io.connect('https://devbook-node.herokuapp.com', { 'forceNew': true })



const profile = ({ setAlert, getProfileById, getCurrentProfile, profile: { profile }, friendRequests, user, addFriend, onClick }) => {



    const [isLoading, setIsLoading] = useState(false);
    const [emmited, setEmmited] = useState(false);
    const [request, setRequest] = useState(false);
    const [friends, setFriends] = useState(false);
    const [selectetdFile, setSelectedFile] = useState([]);
    const [postInput, setPostInput] = useState(false);
    const [fileBase64String, setFileBase64String] = useState("");




    const dispatch = useDispatch();


    let { user_id } = useParams();

    const handleTarget = () => {
        setPostInput(!postInput)
        console.log({ postInput })
    }

    useEffect(() => {
        const fetchData = async () => {

            await getProfileById(user_id)

        }
        fetchData()

    }, [])

    useEffect(() => {
        
        var arr = []
        console.log({ friendRequests })
        if (friendRequests) {
            if (friendRequests.length) {
                friendRequests.some((req, i) => {
                    req.user == user._id ? arr.push(true) : arr.push(false)
                })
                console.log({ arr })

                arr.includes(true) ? setRequest(true) : setRequest(false)
            } else {
                setRequest(false)
            }
        }
    }, [profile])

    useEffect(() => {
        var arr2 = []
        console.log("friendsList", profile.friendsList)
        if (profile.friendsList) {
            if (profile.friendsList.length) {
                profile.friendsList.some((req, i) => {
                    req.user == user._id ? arr2.push(true) : arr2.push(false)
                })
                console.log({ arr2 })

                arr2.includes(true) ? setFriends(true) : setFriends(false)
            } else {
                setFriends(false)
            }
        }
    }, [profile])


    const addFriends = (e) => {
        e.preventDefault();
        alert('here')
        setIsLoading(true);
        console.log('add');
        socket.emit('add_friend', {
            sender: user._id,
            senderName: user.name,
            receiverName: profile.name,
            senderEmail: user.email,
            receiverEmail: profile.email,
            senderImage: user.image ? user.image : "https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder-480x480.gif",
            receiverImage: profile.image ? profile.image : "https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder-480x480.gif",
            receiver: profile.user,

        })
        setAlert('Friend request sent', 'success');
        setEmmited(true)
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
            setSelectedFile([...newImages]);
            console.log('chk', selectetdFile)
            setPostInput(true)


        }
    }

    const addStory = (e) => {
        e.preventDefault();
        alert('here')
        // setIsLoading(true);
        // console.log('story');
        // socket.emit('add_story', {
        //     sender: user._id,
        //     senderName: user.name,
        //     senderEmail: user.email,
        //     senderImage: user.image ? user.image : "https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder-480x480.gif",
        //     receiver: profile.user,
        // })
        // setAlert('Story added', 'success');
        // setEmmited(true)
    }

    useEffect(() => {
        console.log('dddd', user_id)
        // getProfileById(user_id)

        console.log('utt', profile.user)
        console.log('utt', user._id)

        // if (emmited == true) {
        socket.on('add_friend', function (data) {
            console.log(data);
            // dispatch(addFriend(data))
            setIsLoading(false)
            setEmmited(false)
            // if (data.receiver == user._id || data.sender == user._id) {
                
            // }

            // dispatch(addFriend(data))
            // socket.off("add_friend");
            // setPost("")

            // setPostInput(false)
            // setPostField(false)
        })
        // }
    }, [])



    return (
        <Fragment>
            
            {postInput ?
                <Fragment>
                    <div className="post-pop" style={{
                        display: 'block !important', width: '65%',
                        marginLeft: "auto", marginRight: "auto"
                    }}>
                        <div className="post-new-overyly" style={{ visibility: "visible !important", zIndex: 0 }} />
                        <div className="post-new uk-animation-slide-top-small" style={{ display: 'block !important', zIndex: 10 }}>
                            <div className="post-new-header">
                                <h4> Share Story </h4>
                                {/* close button*/}
                                <span onClick={handleTarget} className="post-new-btn-close" />
                            </div>
                            <div className="post-new-media">
                                <div className="post-new-media-user">
                                    {/* <img src="assets/images/avatars/avatar-2.jpg" alt /> */}
                                </div>
                                <div className="post-new-media-input">
                                    <img src={selectetdFile[0]} style={{
                                        width: '60%', marginLeft: "auto", marginRight: 'auto',
                                        display: "flex"
                                    }} alt />

                                    {/* <input type="text" value={value} onChange={handleChange}
                                    className="uk-input" placeholder="What's Your Mind ? Dennis!" /> */}
                                    {/* <input type="text" value={post} onChange={e => setPost(e.target.value)} className="uk-input" placeholder="What's Your Mind ? Dennis!" /> */}
                                </div>
                            </div>
                            <div className="post-new-tab-nav">
                                <span className="button primary mr-2" style={{
                                    display: "flex",
                                    width: "15%", marginLeft: "auto", marginRight: "auto !important"
                                }}> Send </span>

                            </div>
                        </div>
                    </div>
                </Fragment> : ''
            }
            <div className="profile">
                <div className="profile-cover">
                    {/* profile cover */}
                    <img src={profile.cover} alt />
                    <a onClick={onClick} > <i className="uil-camera" /> Edit </a>
                </div>
                <div className="profile-details">
                    <div className="profile-image">
                        <img src={profile.image ? profile.image : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"} style={{ objectFit: "cover" }} alt />
                        <a onClick={onClick}> </a>
                    </div>
                    <div className="profile-details-info">
                        <h1> {profile.name} </h1>
                        <p>
                            {profile.skills > 0 && profile.skills.map((skill, i) => {
                                return <span>{skill}</span>
                            })}
                            <a onClick={onClick}>Edit </a></p>
                        <p>
                            Works @ {profile.company}
                        </p>
                    </div>
                </div>
                <div className="nav-profile uk-sticky" uk-sticky="media : @s" style={{}}>

                    {request && user._id !== profile.user &&
                        <div className="py-md-2 uk-flex-last">
                            <span className="button primary mr-2"> <i className="uil-plus" /> Friend Request Sent </span>
                            <a href="#" className="button light button-icon mr-2"> <i className="uil-list-ul"> </i> </a>
                            <a href="#" className="button light button-icon mr-lg-3" aria-expanded="false"> <i className="uil-ellipsis-h"> </i> </a>
                            <div uk-dropdown="pos: bottom-left ; mode:hover" className="display-hidden uk-dropdown">
                                <ul className="uk-nav uk-dropdown-nav">
                                    {/* <li><a href="#"> View as guest </a></li>
                                    <li><a href="#"> Block this person </a></li>
                                    <li><a href="#"> Report abuse</a></li> */}
                                </ul>
                            </div>
                        </div>}

                    {friends && user._id !== profile.user &&
                        <div className="py-md-2 uk-flex-last">
                            <span className="button primary mr-2"> <i className="uil-plus" /> Friends </span>
                            <a href="#" className="button light button-icon mr-2"> <i className="uil-list-ul"> </i> </a>
                            <a href="#" className="button light button-icon mr-lg-3" aria-expanded="false"> <i className="uil-ellipsis-h"> </i> </a>
                            <div uk-dropdown="pos: bottom-left ; mode:hover" className="display-hidden uk-dropdown">
                                <ul className="uk-nav uk-dropdown-nav">
                                    {/* <li><a href="#"> View as guest </a></li>
                                    <li><a href="#"> Block this person </a></li>
                                    <li><a href="#"> Report abuse</a></li> */}
                                </ul>
                            </div>
                        </div>}

                    {request == false && user._id == profile.user &&

                        <div className="py-md-2 uk-flex-last">

                            <label htmlFor="upload-button" style={{ display: 'flex' }}>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                <path fill="#4db3f6" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z">
                                                </path>
                                            </svg> */}
                                <span className="button primary mr-2"> <i className="uil-plus" /> Add your story</span>

                                {/* <h5 style={{ marginTop: "13px" }}>Upload your photo</h5> */}
                            </label>
                            <input type="file" multiple accept="image/*" id="upload-button" style={{ display: 'none' }} onChange={encodeFileBase64} />
                            <TextareaAutosize
                                style={{ display: "none" }}
                                maxRows={20}
                                value={fileBase64String}
                                onChange={encodeFileBase64}
                            />

                            <a href="#" className="button light button-icon mr-2"> <i className="uil-list-ul"> </i> </a>
                            <a href="#" className="button light button-icon mr-lg-3" aria-expanded="false"> <i className="uil-ellipsis-h"> </i> </a>
                            <div uk-dropdown="pos: bottom-left ; mode:hover" className="display-hidden uk-dropdown">
                                <ul className="uk-nav uk-dropdown-nav">
                                    {/* <li><a href="#"> View as guest </a></li>
                                    <li><a href="#"> Block this person </a></li>
                                    <li><a href="#"> Report abuse</a></li> */}
                                </ul>
                            </div>
                        </div>}

                    {request == false && friends == false && user._id !== profile.user &&
                        <div className="py-md-2 uk-flex-last">
                            <span className="button primary mr-2" onClick={e => addFriends(e)}> <i className="uil-plus" /> Add Friend </span>
                            <a href="#" className="button light button-icon mr-2"> <i className="uil-list-ul"> </i> </a>
                            <a href="#" className="button light button-icon mr-lg-3" aria-expanded="false"> <i className="uil-ellipsis-h"> </i> </a>
                            <div uk-dropdown="pos: bottom-left ; mode:hover" className="display-hidden uk-dropdown">
                                <ul className="uk-nav uk-dropdown-nav">
                                    {/* <li><a href="#"> View as guest </a></li>
                                    <li><a href="#"> Block this person </a></li>
                                    <li><a href="#"> Report abuse</a></li> */}
                                </ul>
                            </div>
                        </div>}

                    <div className="rem_tab">
                        <nav className="responsive-tab ml-lg-3">
                            <ul style={{ display: 'flex', listStyleType: 'none' }}>
                                <li className="uk-active"><a className="active" href="#">Timeline</a></li>
                                <li><a href="timeline-friends.html">About</a></li>
                                <li><a href="timeline-friends.html">Friend</a></li>
                                <li><a href="timeline-friends.html">Photoes</a></li>
                                <li><a href="timeline-friends.html">Videos</a></li>
                            </ul>
                        </nav>
                        <div className="uk-visible@s">
                            <a href="#" className="nav-btn-more" aria-expanded="false"> More</a>
                            <div uk-dropdown="pos: bottom-left" className="display-hidden uk-dropdown">
                                <ul className="uk-nav uk-dropdown-nav">
                                    <li><a href="#">Moves</a></li>
                                    <li><a href="#">Likes</a></li>
                                    <li><a href="#">Events</a></li>
                                    <li><a href="#">Groups</a></li>
                                    <li><a href="#">Gallery</a></li>
                                    <li><a href="#">Sports</a></li>
                                    <li><a href="#">Gallery</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div><div className="uk-sticky-placeholder" style={{ height: 62, margin: 0 }} hidden />
            </div>

            <Alert />




        </Fragment>

    )

}


profile.PropTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    addFriend: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    alert: state.alert,
})
export default connect(mapStateToProps, { getProfileById, getCurrentProfile, addFriend, setAlert })(profile);


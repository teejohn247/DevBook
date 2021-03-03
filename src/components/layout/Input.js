import React, { useEffect, useState, useRef, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import { editProfile } from '../../actions/profile';

import TextareaAutosize from "react-textarea-autosize";
import io from "socket.io-client";
import { addLike, removeLike, addComment, addCommentLike, removeCommentLike } from '../../actions/post';
import LoadingSpinner from '../layout/spinner';

const socket = io.connect('http://localhost:4000')


const input = ({ editProfile, user, profile, getPosts, onClick, value }) => {


    const [selectetdFile, setSelectedFile] = useState([]);
    const [cover, setCover] = useState([]);

    const [post, setPost] = useState("");
    const [emmited, setEmmited] = useState(false);
    const [postField, setPostField] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [postInput, setPostInput] = useState(false);
    const [close, setClose] = useState(!value);

    const [username, setUsername] = useState(user.name);
    const [company, setCompany] = useState(profile.company);
    const [github, setGithub] = useState(profile.githubusername);
    const [location, setLocation] = useState(profile.location);
    const [website, setWebsite] = useState(profile.website);
    const [skills, setSkills] = useState(profile.skills.join());
    const [bio, setBio] = useState(profile.bio);

    const buttonNameRef = useRef()

    

    






    var val = value;
    // let [valu, setValu] = useState(val ? true:false);

    console.log({ val })

    useEffect(() => {
        console.log({ postInput })
    }, [])

    console.log({ postInput })

    const handleEdit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        let data = {username: username, cover: cover[0], skills: skills, bio: bio, company: company, image:!selectetdFile[0] ? profile.image : selectetdFile[0], github: github ? github:"", location: location, website: website}
        await editProfile(data);
        buttonNameRef.current.click();
        setIsLoading(false);

    }

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
    const [fileBase64StringCover, setFileBase64StringCover] = useState("");



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

    // const handleTarget = () => {
    //     // var val = false;
    //     // console.log({val})
    //     setValu(false)
    // }

    const encodeFileBase64Cover = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newImagesPromises = []
            for (let i = 0; i < e.target.files.length; i++) {
                newImagesPromises.push(fileToDataUri(e.target.files[i]))
            }
            const newImages = await Promise.all(newImagesPromises)
            setCover([...cover, ...newImages]);
            console.log('chk', cover)

        }
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


    // const handleTarget = () => {

    //     setPostInput(!postInput)
    //     console.log({ postInput })
    // }


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

    // }


    return (
        <Fragment>
            {/* {!postInput &&
                <div className="post-new">
                    <div className="post-new-media">
                        <div className="post-new-media-user">
                            <img src="assets/images/avatars/avatar-2.jpg" alt />
                        </div>
                        <div className="post-new-media-input">

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
            } */}
            {val && user._id == profile.user ?
                <Fragment>
                    <form onSubmit={handleSubmit} >
                        <div className="post-pop" style={{ display: 'block !important' }}>
                            <div className="post-new-overyly" style={{ visibility: "visible !important", zIndex: 0 }} />
                            <div className="post-new uk-animation-slide-top-small" style={{ display: 'block !important', zIndex: 10 }}>
                                <div className="post-new-header">
                                    <h4> Create/Edit Profile</h4>
                                    {/* close button*/}
                                    <span ref={buttonNameRef} onClick={onClick} className="post-new-btn-close" />
                                </div>
                                <div className="container-fluid">
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-lg-11">
                                            <div className="card card0 rounded-0">
                                                <div className="uk-grid">
                                                    <div className="uk-width-expand" style={{marginBottom:"10px"}}>
                                                        <div className="card rounded-0 border-0 card1" id="bill" style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgb(0 0 0 / 19%)",backgroundImage:"linear-gradient(to right top, #1c3faa, #0064bf, #0081be, #0099b0, #25aea2)" }}>
                                                            {selectetdFile.length == 0 ?
                                                                <span>
                                                                    <img src={profile.image} alt style={{
                                                                        width: "100%",
                                                                        height: "60%",
                                                                        borderRadius: "10px",
                                                                        objectFit:"cover"
                                                                    }} />

                                                                    <label htmlFor="upload-button" style={{ display: 'flex' }}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                                            <path fill="#4db3f6" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z">
                                                                            </path>
                                                                        </svg>
                                                                        <h5 style={{ marginTop: "13px", color:"white" }}>Edit your photo</h5>
                                                                    </label>
                                                                    <input type="file" multiple accept="image/*" id="upload-button" style={{ display: 'none' }} onChange={encodeFileBase64} />
                                                                    <TextareaAutosize
                                                                        style={{ display: "none" }}
                                                                        maxRows={20}
                                                                        value={fileBase64String}
                                                                        onChange={encodeFileBase64}
                                                                    />

                                                                </span>
                                                                : selectetdFile.map((a, i) => <span>
                                                                    <img key={i} src={a} style={{
                                                                        width: "100%",
                                                                        height: "60%",
                                                                        borderRadius: "10px"
                                                                    }}
                                                                    />
                                                                   
                                                                
                                                                <label htmlFor="upload-button" style={{ display: 'flex' }}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                                            <path fill="#4db3f6" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z">
                                                                            </path>
                                                                        </svg>
                                                                        <h5 style={{ marginTop: "13px", color:"white" }}>Edit your photo</h5>
                                                                    </label>
                                                                    <input type="file" multiple accept="image/*" id="upload-button" style={{ display: 'none' }} onChange={encodeFileBase64} />
                                                                    <TextareaAutosize
                                                                        style={{ display: "none" }}
                                                                        maxRows={20}
                                                                        value={fileBase64String}
                                                                        onChange={encodeFileBase64}
                                                                    />
                                                                
                                                                </span>)}

                                                            <div className="post-new-media" style={{ marginTop: "15px", marginBottom: "0px" }}>
                                                                <div className="post-new-media-user post-title">
                                                                    <h5 style={{ color: "white" }}>Name</h5>
                                                                </div>
                                                                <div className="post-new-media-input" style={{ alignSelf: "flex-end" }}>
                                                                    <h6 style={{ color: "white" }}>{user.name}</h6>
                                                                </div>
                                                            </div>

                                                            <div className="post-new-media" style={{ marginBottom: "0px" }}>
                                                                <div className="post-new-media-user post-title">

                                                                    <h5 style={{ color: "white" }}>Company</h5>
                                                                </div>
                                                                <div className="post-new-media-input" style={{ alignSelf: "flex-end" }}>
                                                                    <h6 style={{ color: "white" }}>{profile.company}</h6>
                                                                </div>
                                                            </div>

                                                            <div className="post-new-media" style={{ marginBottom: "0px" }}>
                                                                <div className="post-new-media-user post-title">

                                                                    <h5 style={{ color: "white" }}>Github</h5>
                                                                </div>
                                                                <div className="post-new-media-input" style={{ alignSelf: "flex-end" }}>
                                                                    <h6 style={{ color: "white" }}>{profile.githubusername}</h6>
                                                                </div>
                                                            </div>

                                                            <div className="post-new-media" style={{ marginBottom: "0px" }}>
                                                                <div className="post-new-media-user post-title">

                                                                    <h5 style={{ color: "white" }}>Website</h5>
                                                                </div>
                                                                <div className="post-new-media-input" style={{ alignSelf: "flex-end" }}>
                                                                    <h6 style={{ color: "white" }}>{profile.website}</h6>
                                                                </div>
                                                            </div>

                                                            <div className="post-new-media" style={{ marginBottom: "0px" }}>
                                                                <div className="post-new-media-user post-title">

                                                                    <h5 style={{ color: "white" }}>Location</h5>
                                                                </div>
                                                                <div className="post-new-media-input" style={{ alignSelf: "flex-end" }}>
                                                                    <h6 style={{ color: "white" }}>{profile.location}</h6>
                                                                </div>
                                                            </div>

                                                            {/* <h3 id="heading1">Payment Summary</h3>
                                                            <div className="row">
                                                                <div className="col-lg-7 col-8 mt-4 line pl-4">
                                                                <h2 className="bill-head">Electronics</h2> <small className="bill-date">2017 Feb 10 at 10:30 PM</small>
                                                                </div>
                                                                <div className="col-lg-5 col-4 mt-4">
                                                                <h2 className="bill-head px-xl-5 px-lg-4">CAF</h2>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-7 col-8 mt-4 line pl-4">
                                                                <h2 className="bill-head">Food</h2> <small className="bill-date">2017 Feb 25 at 11:30 PM</small>
                                                                </div>
                                                                <div className="col-lg-5 col-4 mt-4">
                                                                <h2 className="bill-head px-xl-5 px-lg-4">JFK</h2>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-7 col-8 mt-4 line pl-4">
                                                                <h2 className="bill-head">Grocery</h2> <small className="bill-date">2017 Mar 17 at 10:45 PM</small><br /> <small className="bill-date">2017 Mar 18 at 11:45 PM</small>
                                                                </div>
                                                                <div className="col-lg-5 col-4 mt-4">
                                                                <h2 className="bill-head px-xl-5 px-lg-4">LHR</h2>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-7 col-8 mt-4 line pl-4">
                                                                <h2 className="bill-head">Accessories</h2> <small className="bill-date">2017 Apr 13 at 05:30 PM</small>
                                                                </div>
                                                                <div className="col-lg-5 col-4 mt-4">
                                                                <h2 className="bill-head px-xl-5 px-lg-4">JFK</h2>
                                                                </div>
                                                            </div> */}
                                                                                                            {/* <div className="row">
                                                                <div className="col-md-12 red-bg">
                                                                <p className="bill-date" id="total-label">Total Price</p>
                                                                <h2 className="bill-head" id="total">$ 523.65</h2> <small className="bill-date" id="total-label">Price includes all taxes</small>
                                                                </div>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                    <div className="uk-width-1-2@m fead-area uk-first-column">
                                                        <div className="card rounded-0 border-0 card2" id="paypage">
                                                        {/* <form onSubmit={handleSubmitEdit} > */}
                                                            <div className="form-card">

                                                                <div className="radio-group">
                                                                    
                                                                </div> <label className="pay">Name</label> <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="uk-input" style={{borderRadius:"10px"}} name="holdername" placeholder="John Smith" />
                                                                <div className="row">
                                                                    <div className="col-8 col-md-6"> <label className="pay">Company</label> <input type="text" value={company} onChange={e => setCompany(e.target.value)} name="cardno" id="cr_no" placeholder="Company" className="uk-input" style={{borderRadius:"10px"}} /> </div>
                                                                    <div className="col-4 col-md-6"> <label className="pay">Github Username</label> <input type="text" value={github} onChange={e => setGithub(e.target.value)} name="cardno" id="cr_no" placeholder="Github Username" className="uk-input" style={{borderRadius:"10px"}} /> </div>
                                                                    <div className="col-4 col-md-6"> <label className="pay">Skills</label> <input type="text" value={skills} onChange={e => setSkills(e.target.value)} name="cvcpwd" placeholder="React Js, Javascript, Phython" className="uk-input" style={{borderRadius:"10px"}} /> </div>
                                                                </div>
                                                                <div className="row">
                                                                <div className="col-4 col-md-6"> <label className="pay">Location</label> <input type="text" value={location} onChange={e => setLocation(e.target.value)} name="cvcpwd" placeholder="Location" className="uk-input" style={{borderRadius:"10px"}} /> </div>
                                                                <div className="col-4 col-md-6"> <label className="pay">Website</label> <input type="text" value={website} onChange={e => setWebsite(e.target.value)} name="cvcpwd" placeholder="Website" className="uk-input" style={{borderRadius:"10px"}} /> </div>
                                                                <div className="col-4 col-md-6"> <label className="pay">Bio</label> <textarea type="text" value={bio} onChange={e => setBio(e.target.value)} name="cvcpwd" placeholder="Bio" className="uk-input" style={{borderRadius:"10px", height:"150px"}} rows={5} cols={5} /> </div>
                                                                <div className="col-4 col-md-6">
                                                                 <label htmlFor="upload-cover" style={{ display: 'flex' }}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                                            <path fill="#4db3f6" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z">
                                                                            </path>
                                                                        </svg>
                                                                        <h5 style={{ marginTop: "13px", color:"white" }}>Edit Cover Photo</h5>
                                                                    </label>
                                                                    <input type="file" multiple accept="image/*" id="upload-cover" style={{ display: 'none' }} onChange={encodeFileBase64Cover} />
                                                                    <TextareaAutosize
                                                                        style={{ display: "none" }}
                                                                        maxRows={20}
                                                                        value={fileBase64StringCover}
                                                                        onChange={encodeFileBase64Cover}
                                                                    />

                                                                </div>

                                                                {cover.length == 0 ?
                                                                <span>
                                                                    <img src={profile.cover} alt style={{
                                                                        width: "100%",
                                                                        height: "60%",
                                                                        borderRadius: "10px",
                                                                        objectFit:"contain"
                                                                    }} />
                                                                </span>
                                                                : cover.map((a, i) => <span>
                                                                    <img key={i} src={a} style={{
                                                                        width: "100%",
                                                                        height: "60%",
                                                                        borderRadius: "10px"
                                                                    }}
                                                                    />
                                                                </span>)}

                                                                </div>
                                                                <div className="row">

                                                                </div>
                                                            </div>
                                                            <button onClick={handleEdit} className="button primary px-6" style={{width:"100%"}} disabled={isLoading ? true: false}>{isLoading ? "Loading..." : "Edit Profile"}</button>
                                                            {/* <input type="subm" onClick={handleSubmitEdit} value={isLoading ? "Loading..." : "Edit Profile"} className="button primary px-6" style={{width:"100%"}} /> */}
                                                           {/* </form> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
                </Fragment> : ''
            }
            
            {val && user._id !== profile.user ?

                <Fragment>
                        <div className="post-pop" style={{ display: 'block !important' }}>
                            <div className="post-new-overyly" style={{ visibility: "visible !important", zIndex: 0 }} />
                            <div className="post-new uk-animation-slide-top-small" style={{ display: 'block !important', zIndex: 10 }}>
                                <div className="post-new-header">
                                    <h4>{user.name}'s Profile</h4>
                                    {/* close button*/}
                                    <span ref={buttonNameRef} onClick={onClick} className="post-new-btn-close" />
                                </div>
                                <div className="container-fluid">
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-lg-11">
                                            <div className="card card0 rounded-0">
                                                <div className="uk-grid">
                                                    <div className="uk-width-expand" style={{marginBottom:"10px"}}>
                                                        <div className="card rounded-0 border-0 card1" id="bill" style={{ borderRadius: "10px",  boxShadow: "0 4px 8px rgb(0 0 0 / 19%)",backgroundImage:"linear-gradient(to right top, #1c3faa, #0064bf, #0081be, #0099b0, #25aea2)" }} >
                                                            {selectetdFile.length == 0 ?
                                                                <span>
                                                                    <img src={profile.image} alt style={{
                                                                        width: "100%",
                                                                        height: "60%",
                                                                        borderRadius: "10px",
                                                                        objectFit:"contain"
                                                                    }} />
                                                                </span>
                                                                : selectetdFile.map((a, i) => <span>
                                                                    <img key={i} src={a} style={{
                                                                        width: "100%",
                                                                        height: "60%",
                                                                        borderRadius: "10px"
                                                                    }}
                                                                    />
                                                                </span>)}

                                                            <div className="post-new-media" style={{ marginTop: "15px", marginBottom: "0px" }}>
                                                                <div className="post-new-media-user post-title" style= {{margin: "10px auto"}}>
                                                                    <h2 style={{ color: "white" }}>About Me</h2>
                                                                </div>
                                                                {/* <div className="post-new-media-input" style={{ alignSelf: "flex-end" }}>
                                                                    <h6 style={{ color: "white" }}>{user.name}</h6>
                                                                </div> */}
                                                            </div>

                                                            <div className="post-new-media" style={{ marginBottom: "0px" }}>
                                                                <div className="post-new-media-input" style={{ alignSelf: "flex-end" }}>
                                                                    <p style={{ color: "white" }}>{profile.bio}</p>
                                                                </div>
                                                            </div>
{/* 
                                                            <div className="post-new-media" style={{ marginBottom: "0px" }}>
                                                                <div className="post-new-media-user post-title">

                                                                    <h5 style={{ color: "white" }}>Github</h5>
                                                                </div>
                                                                <div className="post-new-media-input" style={{ alignSelf: "flex-end" }}>
                                                                    <h6 style={{ color: "white" }}>{profile.githubusername}</h6>
                                                                </div>
                                                            </div>

                                                            <div className="post-new-media" style={{ marginBottom: "0px" }}>
                                                                <div className="post-new-media-user post-title">

                                                                    <h5 style={{ color: "white" }}>Website</h5>
                                                                </div>
                                                                <div className="post-new-media-input" style={{ alignSelf: "flex-end" }}>
                                                                    <h6 style={{ color: "white" }}>{profile.website}</h6>
                                                                </div>
                                                            </div>

                                                            <div className="post-new-media" style={{ marginBottom: "0px" }}>
                                                                <div className="post-new-media-user post-title">

                                                                    <h5 style={{ color: "white" }}>Location</h5>
                                                                </div>
                                                                <div className="post-new-media-input" style={{ alignSelf: "flex-end" }}>
                                                                    <h6 style={{ color: "white" }}>{profile.location}</h6>
                                                                </div>
                                                            </div> */}

                                                        </div>
                                                    </div>
                                                    <div className="uk-width-1-2@m fead-area uk-first-column">
                                                        <div className="card rounded-0 border-0 card2" id="paypage">
                                                        {/* <form onSubmit={handleSubmitEdit} > */}
                                                            <div className="form-card">

                                                                <div className="radio-group">
                                                                    
                                                                </div> 
                                                                <div className="row" style={{display: "flex", justifyContent: "space-evenly"}}>

                                                                <div className="col-8 col-md-6" style={{width:"100%"}}><label className="pay">Name</label> <h4>{user.name}</h4></div>
                                                                <div className="col-8 col-md-6" style={{width:"100%"}}> <label className="pay">Company</label> <h4>{profile.company}</h4> </div>
                                                                
                                                                </div>
                                                                <div className="row" style={{display: "flex", justifyContent: "space-evenly"}}>
                                                                    <div className="col-8 col-md-6" style={{width:"100%"}}> <label className="pay">Github Username</label><h4>{profile.github}</h4> </div>
                                                                    <div className="col-8 col-md-6" style={{width:"100%"}}> <label className="pay">Skills</label> <br></br>
                                                                    <span>
                                                                    {profile.skills.map((skill, i) => {
                                                                       return <span style={{marginRight:"5px"}} className="label label-success">{skill}</span> 
                                                                    })}
                                                                    </span> </div>
                                                                </div>
                                                                <div className="row" style={{display: "flex", justifyContent: "space-evenly"}}>
                                                                <div className="col-8 col-md-6" style={{width:"100%"}}> <label className="pay">Location</label> <h4>{profile.loaction}</h4> </div>
                                                                <div className="col-8 col-md-6" style={{width:"100%"}}> <label className="pay">Website</label> <h4>{profile.website}</h4> </div>
                                                                {/* <div className="col-4 col-md-6"> <label className="pay">Bio</label> <h4>{profile.bio}</h4> </div> */}


                                                                </div>
                                                                <div className="row">

                                                                </div>
                                                            </div>
                                                            {/* <button onClick={handleEdit} className="button primary px-6" style={{width:"100%"}} disabled={isLoading ? true: false}>{isLoading ? "Loading..." : "Edit Profile"}</button> */}
                                                            {/* <input type="subm" onClick={handleSubmitEdit} value={isLoading ? "Loading..." : "Edit Profile"} className="button primary px-6" style={{width:"100%"}} /> */}
                                                           {/* </form> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                </Fragment> : ''
                }
        </Fragment>

    )

}

input.PropTypes = {
    editProfile:PropTypes.func.isRequired,
    value: PropTypes.bool.isRequired,
    getPosts: PropTypes.func.isRequired,

}
const mapStateToProps = (state) => ({
    auth: state.auth,
})
export default connect(mapStateToProps, { getPosts, editProfile })(input);
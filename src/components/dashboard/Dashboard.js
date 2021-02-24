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
import TextareaAutosize from "react-textarea-autosize";



const socket = io.connect('http://localhost:4000')

// let socket;


const Dashboard = ({ getCurrentProfile, getCurrentPost, post: { posts }, getPosts, auth: { user }, profile: { profile, loading } }) => {
    const [selectetdFile, setSelectedFile] = useState([]);
    const [post, setPost] = useState("");
    const [emmited, setEmmited] = useState(false);
    const [postField, setPostField] = useState(true);
    const [isLoading, setIsLoading] = useState(false);



    // var post_id = Date.now() + Number(localStorage.getItem('user_id'))


    // const [post, setPost] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(post)
        setIsLoading(true)
        var d = new Date();
        var unique = d.valueOf();


        // alert(`Submitting Name ${post}`)
        // var files 
        alert('here1')
        if (selectetdFile.length > 0) {
            alert('with_image')
            console.log(selectetdFile)

            socket.emit('post_with_images', {
                file_id: unique,
                text: post,
                name: user.name,
                email: user.email,
                user: profile.user,
                time: Date.now(),
                images: selectetdFile
            })

            setEmmited(true)


        } else {
            alert('here2')

            socket.emit('post', {
                file_id: unique,
                name: user.name,
                email: user.email,
                user: profile.user,
                time: Date.now(),
                text: post,
                // name: 
            })

            setEmmited(true)


        }

    }


    // const [files, setFiles] = useState([]);
    const [fileBase64String, setFileBase64String] = useState("");

    // const onFileChange = (e) => {
    //     setSelectedFile(e.target.files);
    //     console.log(e.target.files[0]);
    //     console.log(e.target.files[0].name);
    //     console.log(e.target.files[0].size);
    //     console.log(e.target.files[0].type);
    // };
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
        // e.target.value = "";
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

    useEffect(() => {
        socket.on('connect', function () {
            console.log('connected!')

            // socket.emit('chat', {
            //     text: "testing",
            // }
            // )

            // socket.on('post', function (data) {
            //     console.log(data);
            //     dispatch(getPosts(data))
            //     socket.off("post");
            //     setPost("")
            //     setIsLoading(false)
            //     setEmmited(false)

            //     // setPostField(false)


            // })
            // socket.on('post_with_images', function (data) {
            //     console.log(data);
            //     dispatch(getPosts(data))
            //     socket.off("post_with_images");
            //     setSelectedFile([])
            //     setPostField(false)
            //     setIsLoading(false)
            //     setEmmited(false)


            // })
        })
        getCurrentProfile()
        getCurrentPost()

    }, [])




    useEffect(() => {
        alert(emmited)

        if (emmited == true) {
            alert('here3')
            socket.on('post', function (data) {
                console.log(data);


                dispatch(getPosts(data))
                socket.off("post");
                setPost("")
                setIsLoading(false)
                setEmmited(false)
                // setPostField(false)


            })
            socket.on('post_with_images', function (data) {
                console.log(data);
                var arr = []
                data.images.map(async(file,i) => {
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
                // setPostField(false)
                setIsLoading(false)
                setEmmited(false)


            })
        }



    }, [emmited])

    // console.log(profile)
    return loading && profile == null ? (
        <LoadingSpinner />
    ) : (
            <Fragment>
                <div id="wrapper">
                    <div className="main_sidebar">
                        <div className="side-overlay" uk-toggle="target: #wrapper ; cls: collapse-sidebar mobile-visible" />
                        <div className="sidebar-header">
                            <div id="logo">
                                <a href="feeds.html"> <img src="assets/images/logo-light.png" alt /></a>
                            </div>
                            <span className="btn-close" uk-toggle="target: #wrapper ; cls: collapse-sidebar mobile-visible" />
                        </div>
                        <div className="sidebar">
                            <div className="sidebar_innr" data-simplebar>
                                <div className="sections">
                                    <ul>
                                        <li className="active">
                                            <a href="feeds.html">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <path fill="#047cac" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
                                                </svg>
                                              News Feed </a>
                                        </li>
                                        <li>
                                            <a href="albums.html">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <path fill="#8bc34a" d="M22,16V4A2,2 0 0,0 20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16M11,12L13.03,14.71L16,11L20,16H8M2,6V20A2,2 0 0,0 4,22H18V20H4V6">
                                                    </path>
                                                </svg> Albums </a>
                                        </li>
                                        <li>
                                            <a href="pokes.html">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <path fill="#009688" d="M21,9A1,1 0 0,1 22,10A1,1 0 0,1 21,11H16.53L16.4,12.21L14.2,17.15C14,17.65 13.47,18 12.86,18H8.5C7.7,18 7,17.27 7,16.5V10C7,9.61 7.16,9.26 7.43,9L11.63,4.1L12.4,4.84C12.6,5.03 12.72,5.29 12.72,5.58L12.69,5.8L11,9H21M2,18V10H5V18H2Z">
                                                    </path>
                                                </svg> Pokes </a>
                                        </li>
                                        <li>
                                            <a href="popular-post.html">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <path fill="#8d73cc" d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2V4H5v16h14zM7 6h4v4H7V6zm0 6h10v2H7v-2zm0 4h10v2H7v-2zm6-9h4v2h-4V7z">
                                                    </path>
                                                </svg> Popular Posts </a>
                                        </li>
                                        <li>
                                            <a href="events.html">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <path fill="#f25e4e" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z">
                                                    </path>
                                                </svg> Events </a>
                                        </li>
                                        <li>
                                            <a href="games.html">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <path fill="#03A9F4" d="M16.5,9L13.5,12L16.5,15H22V9M9,16.5V22H15V16.5L12,13.5M7.5,9H2V15H7.5L10.5,12M15,7.5V2H9V7.5L12,10.5L15,7.5Z">
                                                    </path>
                                                </svg> Games </a>
                                        </li>
                                        <li>
                                            <a href="offers.html">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <path fill="#e91e63" d="M5.5,7A1.5,1.5 0 0,1 4,5.5A1.5,1.5 0 0,1 5.5,4A1.5,1.5 0 0,1 7,5.5A1.5,1.5 0 0,1 5.5,7M21.41,11.58L12.41,2.58C12.05,2.22 11.55,2 11,2H4C2.89,2 2,2.89 2,4V11C2,11.55 2.22,12.05 2.59,12.41L11.58,21.41C11.95,21.77 12.45,22 13,22C13.55,22 14.05,21.77 14.41,21.41L21.41,14.41C21.78,14.05 22,13.55 22,13C22,12.44 21.77,11.94 21.41,11.58Z">
                                                    </path>
                                                </svg> Offers </a>
                                        </li>
                                        <li>
                                            <a href="explore.html">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <path fill="#b2c17c" d="M15.5,12C18,12 20,14 20,16.5C20,17.38 19.75,18.21 19.31,18.9L22.39,22L21,23.39L17.88,20.32C17.19,20.75 16.37,21 15.5,21C13,21 11,19 11,16.5C11,14 13,12 15.5,12M15.5,14A2.5,2.5 0 0,0 13,16.5A2.5,2.5 0 0,0 15.5,19A2.5,2.5 0 0,0 18,16.5A2.5,2.5 0 0,0 15.5,14M10,4A4,4 0 0,1 14,8C14,8.91 13.69,9.75 13.18,10.43C12.32,10.75 11.55,11.26 10.91,11.9L10,12A4,4 0 0,1 6,8A4,4 0 0,1 10,4M2,20V18C2,15.88 5.31,14.14 9.5,14C9.18,14.78 9,15.62 9,16.5C9,17.79 9.38,19 10,20H2Z">
                                                    </path>
                                                </svg> Find friends </a>
                                        </li>
                                        <li>
                                            <a href="explore.html">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <path fill="#8BC34A" d="M14.19,14.19L6,18L9.81,9.81L18,6M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,10.9A1.1,1.1 0 0,0 10.9,12A1.1,1.1 0 0,0 12,13.1A1.1,1.1 0 0,0 13.1,12A1.1,1.1 0 0,0 12,10.9Z">
                                                    </path>
                                                </svg> Explore </a>
                                        </li>
                                        <li id="more-veiw" hidden>
                                            <a href="jobs.html">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <path fill="#4caf50" d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4C2.89,21 2,20.1 2,19V8C2,6.89 2.89,6 4,6H8V4C8,2.89 8.89,2 10,2M14,6V4H10V6H14Z">
                                                    </path>
                                                </svg> Jobs </a>
                                        </li>
                                        <li id="more-veiw" hidden>
                                            <a href="funding.html">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <path fill="#673AB7" d="M12.75,3.94C13.75,3.22 14.91,2.86 16.22,2.86C16.94,2.86 17.73,3.05 18.59,3.45C19.45,3.84 20.13,4.3 20.63,4.83C21.66,6.11 22.09,7.6 21.94,9.3C21.78,11 21.22,12.33 20.25,13.27L12.66,20.86C12.47,21.05 12.23,21.14 11.95,21.14C11.67,21.14 11.44,21.05 11.25,20.86C11.06,20.67 10.97,20.44 10.97,20.16C10.97,19.88 11.06,19.64 11.25,19.45L15.84,14.86C16.09,14.64 16.09,14.41 15.84,14.16C15.59,13.91 15.36,13.91 15.14,14.16L10.55,18.75C10.36,18.94 10.13,19.03 9.84,19.03C9.56,19.03 9.33,18.94 9.14,18.75C8.95,18.56 8.86,18.33 8.86,18.05C8.86,17.77 8.95,17.53 9.14,17.34L13.73,12.75C14,12.5 14,12.25 13.73,12C13.5,11.75 13.28,11.75 13.03,12L8.44,16.64C8.25,16.83 8,16.92 7.73,16.92C7.45,16.92 7.21,16.83 7,16.64C6.8,16.45 6.7,16.22 6.7,15.94C6.7,15.66 6.81,15.41 7.03,15.19L11.63,10.59C11.88,10.34 11.88,10.11 11.63,9.89C11.38,9.67 11.14,9.67 10.92,9.89L6.28,14.5C6.06,14.7 5.83,14.81 5.58,14.81C5.3,14.81 5.06,14.71 4.88,14.5C4.69,14.3 4.59,14.06 4.59,13.78C4.59,13.5 4.69,13.27 4.88,13.08C7.94,10 9.83,8.14 10.55,7.45L14.11,10.97C14.5,11.34 14.95,11.53 15.5,11.53C16.2,11.53 16.75,11.25 17.16,10.69C17.44,10.28 17.54,9.83 17.46,9.33C17.38,8.83 17.17,8.41 16.83,8.06L12.75,3.94M14.81,10.27L10.55,6L3.47,13.08C2.63,12.23 2.15,10.93 2.04,9.16C1.93,7.4 2.41,5.87 3.47,4.59C4.66,3.41 6.08,2.81 7.73,2.81C9.39,2.81 10.8,3.41 11.95,4.59L16.22,8.86C16.41,9.05 16.5,9.28 16.5,9.56C16.5,9.84 16.41,10.08 16.22,10.27C16.03,10.45 15.8,10.55 15.5,10.55C15.23,10.55 15,10.45 14.81,10.27V10.27Z">
                                                    </path>
                                                </svg> Fundings </a>
                                        </li>
                                    </ul>
                                    <a href="#" className="button secondary px-5 btn-more" uk-toggle="target: #more-veiw; animation: uk-animation-fade">
                                        <span id="more-veiw">See More <i className="icon-feather-chevron-down ml-2" /></span>
                                        <span id="more-veiw" hidden>See Less<i className="icon-feather-chevron-up ml-2" /> </span>
                                    </a>
                                </div>
                                <div className="sections">
                                    <h3> Explore </h3>
                                    <ul>
                                        <li>
                                            <a href="group.html">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <path fill="#03A9F4" d="M5 3A2 2 0 0 0 3 5H5M7 3V5H9V3M11 3V5H13V3M15 3V5H17V3M19 3V5H21A2 2 0 0 0 19 3M3 7V9H5V7M7 7V11H11V7M13 7V11H17V7M19 7V9H21V7M3 11V13H5V11M19 11V13H21V11M7 13V17H11V13M13 13V17H17V13M3 15V17H5V15M19 15V17H21V15M3 19A2 2 0 0 0 5 21V19M7 19V21H9V19M11 19V21H13V19M15 19V21H17V19M19 19V21A2 2 0 0 0 21 19Z">
                                                    </path>
                                                </svg> Groups </a>
                                        </li>
                                        <li>
                                            <a href="pages.html">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <path fill="#f79f58" d="M14.4,6L14,4H5V21H7V14H12.6L13,16H20V6H14.4Z">
                                                    </path>
                                                </svg> Pages </a>
                                        </li>
                                        <li>
                                            <a href="market.html">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <path fill="#7d8250" d="M12,18H6V14H12M21,14V12L20,7H4L3,12V14H4V20H14V14H18V20H20V14M20,4H4V6H20V4Z">
                                                    </path>
                                                </svg> Market </a>
                                        </li>
                                        <li>
                                            <a href="blog.html">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <path fill="#f35d4d" d="M20,11H4V8H20M20,15H13V13H20M20,19H13V17H20M11,19H4V13H11M20.33,4.67L18.67,3L17,4.67L15.33,3L13.67,4.67L12,3L10.33,4.67L8.67,3L7,4.67L5.33,3L3.67,4.67L2,3V19A2,2 0 0,0 4,21H20A2,2 0 0,0 22,19V3L20.33,4.67Z">
                                                    </path>
                                                </svg> Blog </a>
                                        </li>
                                        <li>
                                            <a href="jobs.html">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <path fill="#4caf50" d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4C2.89,21 2,20.1 2,19V8C2,6.89 2.89,6 4,6H8V4C8,2.89 8.89,2 10,2M14,6V4H10V6H14Z">
                                                    </path>
                                                </svg> Jobs </a>
                                        </li>
                                    </ul>
                                </div>
                                {/*  Optional Footer */}
                                <div id="foot">
                                    <ul>
                                        <li> <a href="page-term.html"> About Us </a></li>
                                        <li> <a href="page-setting.html"> Setting </a></li>
                                        <li> <a href="page-privacy.html"> Privacy Policy </a></li>
                                        <li> <a href="page-term.html"> Terms - Conditions </a></li>
                                    </ul>
                                    <div className="foot-content">
                                        <p>© 2020 <strong>Simplest</strong>. All Rights Reserved. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* contents */}
                    <div className="main_content">
                        {/* header */}
                        <div id="main_header">
                            <header>
                                <div className="header-innr">
                                    {/* Logo*/}
                                    <div className="header-btn-traiger is-hidden" uk-toggle="target: #wrapper ; cls: collapse-sidebar mobile-visible">
                                        <span /></div>
                                    {/* Logo*/}
                                    <div id="logo">
                                        <a href="feeds.html"> <img src="assets/images/logo.png" alt /></a>
                                        <a href="feeds.html"> <img src="assets/images/logo-light.png" className="logo-inverse" alt /></a>
                                    </div>
                                    {/* form search*/}
                                    <div className="head_search">
                                        <form>
                                            <div className="head_search_cont">
                                                <input defaultValue type="text" className="form-control" placeholder="Search for Friends , Videos and more.." autoComplete="off" />
                                                <i className="s_icon uil-search-alt" />
                                            </div>
                                            {/* Search box dropdown */}
                                            <div uk-dropdown="pos: top;mode:click;animation: uk-animation-slide-bottom-small" className="dropdown-search display-hidden">
                                                {/* User menu */}
                                                <ul className="dropdown-search-list">
                                                    <li className="list-title"> Recent Searches </li>
                                                    <li> <a href="#">
                                                        <img src="assets/images/avatars/avatar-2.jpg" alt />
                                                        <p> Erica Jones <span> 2 hours ago </span> </p>
                                                    </a>
                                                    </li>
                                                    <li> <a href="#">
                                                        <img src="assets/images/avatars/avatar-3.jpg" alt />
                                                        <p> Adrian Mohani <span> 13 days ago </span> </p>
                                                    </a>
                                                    </li>
                                                    <li> <a href="#">
                                                        <img src="assets/images/avatars/avatar-4.jpg" alt />
                                                        <p> Mountain Riders <span> 3 days ago <span>Group</span> </span> </p>
                                                    </a>
                                                    </li>
                                                    <li> <a href="#">
                                                        <img src="assets/images/avatars/avatar-5.jpg" alt />
                                                        <p> Coffee Addicts <span> 12 days ago <span> Page</span></span> </p>
                                                    </a>
                                                    </li>
                                                    <li className="menu-divider" />
                                                    <li className="list-footer"> <a href="your-history.html"> Searches History </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </form>
                                    </div>
                                    {/* user icons */}
                                    <div className="head_user">
                                        {/* browse apps  */}
                                        <a href="#" className="opts_icon uk-visible@s" uk-tooltip="title: Create ; pos: bottom ;offset:7">
                                            <img src="assets/images/icons/apps.svg" alt />
                                        </a>
                                        {/* browse apps dropdown */}
                                        <div uk-dropdown="mode:click ; pos: bottom-center ; animation: uk-animation-scale-up" className="icon-browse display-hidden">
                                            <a href="#" className="icon-menu-item">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <path fill="#9c27b0" d="M12,8H4A2,2 0 0,0 2,10V14A2,2 0 0,0 4,16H5V20A1,1 0 0,0 6,21H8A1,1 0 0,0 9,20V16H12L17,20V4L12,8M21.5,12C21.5,13.71 20.54,15.26 19,16V8C20.53,8.75 21.5,10.3 21.5,12Z">
                                                    </path>
                                                </svg>
                Create Ad </a>
                                            <a href="#" className="icon-menu-item">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <path fill="#009da0" d="M18,20H6V18H4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V18H18V20M14,2H6A2,2 0 0,0 4,4V12H6V4H14V8H18V12H20V8L14,2M11,16H8V14H11V16M16,16H13V14H16V16M3,14H6V16H3V14M21,16H18V14H21V16Z">
                                                    </path>
                                                </svg>
                Create Blog </a>
                                            <a href="#" className="icon-menu-item">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <path fill="#f25e4e" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z">
                                                    </path>
                                                </svg>
                Create Event </a>
                                            <a href="#" className="icon-menu-item">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <path fill="#03A9F4" d="M12,6A3,3 0 0,0 9,9A3,3 0 0,0 12,12A3,3 0 0,0 15,9A3,3 0 0,0 12,6M6,8.17A2.5,2.5 0 0,0 3.5,10.67A2.5,2.5 0 0,0 6,13.17C6.88,13.17 7.65,12.71 8.09,12.03C7.42,11.18 7,10.15 7,9C7,8.8 7,8.6 7.04,8.4C6.72,8.25 6.37,8.17 6,8.17M18,8.17C17.63,8.17 17.28,8.25 16.96,8.4C17,8.6 17,8.8 17,9C17,10.15 16.58,11.18 15.91,12.03C16.35,12.71 17.12,13.17 18,13.17A2.5,2.5 0 0,0 20.5,10.67A2.5,2.5 0 0,0 18,8.17M12,14C10,14 6,15 6,17V19H18V17C18,15 14,14 12,14M4.67,14.97C3,15.26 1,16.04 1,17.33V19H4V17C4,16.22 4.29,15.53 4.67,14.97M19.33,14.97C19.71,15.53 20,16.22 20,17V19H23V17.33C23,16.04 21,15.26 19.33,14.97Z">
                                                    </path>
                                                </svg>
                Create Groups </a>
                                            <a href="#" className="icon-menu-item">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <path fill="#f79f58" d="M14.4,6L14,4H5V21H7V14H12.6L13,16H20V6H14.4Z" />
                                                </svg>
                Create Page </a>
                                            <a href="#" className="icon-menu-item">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <path fill="#8bc34a" d="M22,16V4A2,2 0 0,0 20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16M11,12L13.03,14.71L16,11L20,16H8M2,6V20A2,2 0 0,0 4,22H18V20H4V6">
                                                    </path>
                                                </svg>
                Albums </a>
                                            <a href="#" className="more-app"> More Apps</a>
                                        </div>
                                        {/* Message  notificiation dropdown */}
                                        <a href="#" className="opts_icon" uk-tooltip="title: Messages ; pos: bottom ;offset:7">
                                            <img src="assets/images/icons/chat.svg" alt /> <span>4</span>
                                        </a>
                                        {/* Message  notificiation dropdown */}
                                        <div uk-dropdown="mode:click ; animation: uk-animation-slide-bottom-small" className="dropdown-notifications display-hidden">
                                            {/* notification contents */}
                                            <div className="dropdown-notifications-content" data-simplebar>
                                                {/* notivication header */}
                                                <div className="dropdown-notifications-headline">
                                                    <h4>Messages</h4>
                                                    <a href="#">
                                                        <i className="icon-feather-settings" uk-tooltip="title: Message settings ; pos: left" />
                                                    </a>
                                                </div>
                                                {/* notiviation list */}
                                                <ul>
                                                    <li>
                                                        <a href="#">
                                                            <span className="notification-avatar status-online">
                                                                <img src="assets/images/avatars/avatar-2.jpg" alt />
                                                            </span>
                                                            <div className="notification-text notification-msg-text">
                                                                <strong>Jonathan Madano</strong>
                                                                <p>Thanks for The Answer ... <span className="time-ago"> 2 h </span> </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <span className="notification-avatar">
                                                                <img src="assets/images/avatars/avatar-3.jpg" alt />
                                                            </span>
                                                            <div className="notification-text notification-msg-text">
                                                                <strong>Stella Johnson</strong>
                                                                <p> Alex will explain you how ... <span className="time-ago"> 3 h </span>
                                                                </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <span className="notification-avatar status-online">
                                                                <img src="assets/images/avatars/avatar-1.jpg" alt />
                                                            </span>
                                                            <div className="notification-text notification-msg-text">
                                                                <strong>Alex Dolgove</strong>
                                                                <p> Alia just joined Messenger! <span className="time-ago"> 3 h </span> </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <span className="notification-avatar status-online">
                                                                <img src="assets/images/avatars/avatar-4.jpg" alt />
                                                            </span>
                                                            <div className="notification-text notification-msg-text">
                                                                <strong>Adrian Mohani</strong>
                                                                <p>Thanks for The Answer ... <span className="time-ago"> 2 h </span> </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <span className="notification-avatar">
                                                                <img src="assets/images/avatars/avatar-2.jpg" alt />
                                                            </span>
                                                            <div className="notification-text notification-msg-text">
                                                                <strong>Jonathan Madano</strong>
                                                                <p>Thanks for The Answer ... <span className="time-ago"> 2 h </span> </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <span className="notification-avatar">
                                                                <img src="assets/images/avatars/avatar-3.jpg" alt />
                                                            </span>
                                                            <div className="notification-text notification-msg-text">
                                                                <strong>Stella Johnson</strong>
                                                                <p> Alex will explain you how ... <span className="time-ago"> 3 h </span>
                                                                </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <span className="notification-avatar">
                                                                <img src="assets/images/avatars/avatar-1.jpg" alt />
                                                            </span>
                                                            <div className="notification-text notification-msg-text">
                                                                <strong>Alex Dolgove</strong>
                                                                <p> Alia just joined Messenger! <span className="time-ago"> 3 h </span> </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <span className="notification-avatar">
                                                                <img src="assets/images/avatars/avatar-4.jpg" alt />
                                                            </span>
                                                            <div className="notification-text notification-msg-text">
                                                                <strong>Adrian Mohani</strong>
                                                                <p>Thanks for The Answer ... <span className="time-ago"> 2 h </span> </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="dropdown-notifications-footer">
                                                <a href="#"> See all in Messages</a>
                                            </div>
                                        </div>
                                        {/* notificiation icon  */}
                                        <a href="#" className="opts_icon" uk-tooltip="title: Notifications ; pos: bottom ;offset:7">
                                            <img src="assets/images/icons/bell.svg" alt /> <span>3</span>
                                        </a>
                                        {/* notificiation dropdown */}
                                        <div uk-dropdown="mode:click ; animation: uk-animation-slide-bottom-small" className="dropdown-notifications display-hidden">
                                            {/* notification contents */}
                                            <div className="dropdown-notifications-content" data-simplebar>
                                                {/* notivication header */}
                                                <div className="dropdown-notifications-headline">
                                                    <h4>Notifications </h4>
                                                    <a href="#">
                                                        <i className="icon-feather-settings" uk-tooltip="title: Notifications settings ; pos: left" />
                                                    </a>
                                                </div>
                                                {/* notiviation list */}
                                                <ul>
                                                    <li>
                                                        <a href="#">
                                                            <span className="notification-avatar">
                                                                <img src="assets/images/avatars/avatar-2.jpg" alt />
                                                            </span>
                                                            <span className="notification-icon bg-gradient-primary">
                                                                <i className="icon-feather-thumbs-up" /></span>
                                                            <span className="notification-text">
                                                                <strong>Adrian Moh.</strong> Like Your Comment On Video
                        <span className="text-primary">Learn Prototype Faster</span>
                                                                <br /> <span className="time-ago"> 9 hours ago </span>
                                                            </span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <span className="notification-avatar">
                                                                <img src="assets/images/avatars/avatar-3.jpg" alt />
                                                            </span>
                                                            <span className="notification-icon bg-gradient-danger">
                                                                <i className="icon-feather-star" /></span>
                                                            <span className="notification-text">
                                                                <strong>Alex Dolgove</strong> Added New Review In Video
                        <span className="text-primary">Full Stack PHP Developer</span>
                                                                <br /> <span className="time-ago"> 19 hours ago </span>
                                                            </span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <span className="notification-avatar">
                                                                <img src="assets/images/avatars/avatar-4.jpg" alt />
                                                            </span>
                                                            <span className="notification-icon bg-gradient-success">
                                                                <i className="icon-feather-message-circle" /></span>
                                                            <span className="notification-text">
                                                                <strong>Stella John</strong> Replay Your Comment in
                        <span className="text-primary">Adobe XD Tutorial</span>
                                                                <br /> <span className="time-ago"> 12 hours ago </span>
                                                            </span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <span className="notification-avatar">
                                                                <img src="assets/images/avatars/avatar-2.jpg" alt />
                                                            </span>
                                                            <span className="notification-icon bg-gradient-primary">
                                                                <i className="icon-feather-thumbs-up" /></span>
                                                            <span className="notification-text">
                                                                <strong>Adrian Moh.</strong> Like Your Comment On Video
                        <span className="text-primary">Learn Prototype Faster</span>
                                                                <br /> <span className="time-ago"> 9 hours ago </span>
                                                            </span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <span className="notification-avatar">
                                                                <img src="assets/images/avatars/avatar-3.jpg" alt />
                                                            </span>
                                                            <span className="notification-icon bg-gradient-warning">
                                                                <i className="icon-feather-star" /></span>
                                                            <span className="notification-text">
                                                                <strong>Alex Dolgove</strong> Added New Review In Video
                        <span className="text-primary">Full Stack PHP Developer</span>
                                                                <br /> <span className="time-ago"> 19 hours ago </span>
                                                            </span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <span className="notification-avatar">
                                                                <img src="assets/images/avatars/avatar-4.jpg" alt />
                                                            </span>
                                                            <span className="notification-icon bg-gradient-success">
                                                                <i className="icon-feather-message-circle" /></span>
                                                            <span className="notification-text">
                                                                <strong>Stella John</strong> Replay Your Comment in
                        <span className="text-primary">Adobe XD Tutorial</span>
                                                                <br /> <span className="time-ago"> 12 hours ago </span>
                                                            </span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* profile -image */}
                                        <a className="opts_account" href="#"> <img src="assets/images/avatars/avatar-2.jpg" alt /></a>
                                        {/* profile dropdown*/}
                                        <div uk-dropdown="mode:click ; animation: uk-animation-slide-bottom-small" className="dropdown-notifications rounded display-hidden">
                                            {/* User Name / Avatar */}
                                            {/* User Name / Avatar */}
                                            <a href="timeline.html">
                                                <div className="dropdown-user-details">
                                                    <div className="dropdown-user-cover">
                                                        <img src="assets/images/avatars/profile-cover.jpg" alt />
                                                    </div>
                                                    <div className="dropdown-user-avatar">
                                                        <img src="assets/images/avatars/avatar-1.jpg" alt />
                                                    </div>
                                                    <div className="dropdown-user-name"> James Lewis </div>
                                                </div>
                                            </a>
                                            <ul className="dropdown-user-menu">
                                                <li><a href="#"> <i className="fas fa-rocket" /> Boost Posts </a> </li>
                                                <li><a href="#"> <i className="fas fa-rocket" /> Boost Pages </a> </li>
                                                <li><a href="#"> <i className="fas fa-bullhorn" /> Advertising </a></li>
                                                <li><a href="#"> <i className="fas fa-user-edit" /> General Settings</a></li>
                                                <li><a href="#"> <i className="fas fa-user-cog" /> Admi Area</a></li>
                                                <li>
                                                    <a href="#" id="night-mode" className="btn-night-mode">
                                                        <i className="fas fa-moon" /> Night mode
                    <span className="btn-night-mode-switch">
                                                            <span className="uk-switch-button" />
                                                        </span>
                                                    </a>
                                                </li>
                                                <li><a href="form-login.html"> <i className="fas fa-sign-out-alt" />Log Out</a>
                                                </li>
                                            </ul>
                                            <hr className="m-0" />
                                            <ul className="dropdown-user-menu">
                                                <li><a href="page-setting.html" className="bg-secondery"> <i className="uil-bolt" />
                                                    <div> Upgrade To Premium <span> Pro features give you complete control </span>
                                                    </div>
                                                </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div> {/* / heaader-innr */}
                            </header>
                        </div>
                        <div className="main_content_inner">
                            <div className="uk-grid" uk-grid>
                                <div className="uk-width-2-3@m fead-area">
                                    <div className="uk-position-relative" uk-slider="finite: true">
                                        <div className="uk-slider-container pb-3">
                                            <ul className="uk-slider-items uk-child-width-1-5@m uk-child-width-1-3@s uk-child-width-1-3 story-slider uk-grid">
                                                <li>
                                                    <a href="#" uk-toggle="target: body ; cls: is-open">
                                                        <div className="story-card" data-src="assets/images/avatars/avatar-lg-1.jpg" uk-img>
                                                            <i className="uil-plus" />
                                                            <div className="story-card-content">
                                                                <h4> Dennis </h4>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" uk-toggle="target: body ; cls: is-open">
                                                        <div className="story-card" data-src="assets/images/events/listing-5.jpg" uk-img>
                                                            <img src="assets/images/avatars/avatar-5.jpg" alt />
                                                            <div className="story-card-content">
                                                                <h4> Jonathan </h4>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" uk-toggle="target: body ; cls: is-open">
                                                        <div className="story-card" data-src="assets/images/avatars/avatar-lg-3.jpg" uk-img>
                                                            <img src="assets/images/avatars/avatar-6.jpg" alt />
                                                            <div className="story-card-content">
                                                                <h4> Stella </h4>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" uk-toggle="target: body ; cls: is-open">
                                                        <div className="story-card" data-src="assets/images/avatars/avatar-lg-4.jpg" uk-img>
                                                            <img src="assets/images/avatars/avatar-4.jpg" alt />
                                                            <div className="story-card-content">
                                                                <h4> Alex </h4>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" uk-toggle="target: body ; cls: is-open">
                                                        <div className="story-card" data-src="assets/images/avatars/avatar-lg-2.jpg" uk-img>
                                                            <img src="assets/images/avatars/avatar-2.jpg" alt />
                                                            <div className="story-card-content">
                                                                <h4> Adrian </h4>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" uk-toggle="target: body ; cls: is-open">
                                                        <div className="story-card" data-src="assets/images/avatars/avatar-lg-5.jpg" uk-img>
                                                            <img src="assets/images/avatars/avatar-5.jpg" alt />
                                                            <div className="story-card-content">
                                                                <h4> Dennis </h4>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="uk-visible@m">
                                                <a className="uk-position-center-left-out slidenav-prev" href="#" uk-slider-item="previous" />
                                                <a className="uk-position-center-right-out slidenav-next" href="#" uk-slider-item="next" />
                                            </div>
                                            <div className="uk-hidden@m">
                                                <a className="uk-position-center-left slidenav-prev" href="#" uk-slider-item="previous" />
                                                <a className="uk-position-center-right slidenav-next" href="#" uk-slider-item="next" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="post-newer mt-lg-2">
                                        <div className="post-new" uk-toggle="target: body ; cls: post-focus">
                                            <div className="post-new-media">
                                                <div className="post-new-media-user">
                                                    <img src="assets/images/avatars/avatar-2.jpg" alt />
                                                </div>
                                                <div className="post-new-media-input">
                                                    <input type="text" className="uk-input" placeholder="What's Your Mind ? Hamse!" />
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
                                        {postField == true ?
                                            <Fragment>
                                                <form onSubmit={handleSubmit}>
                                                    <div className="post-pop">
                                                        <div className="post-new-overyly" uk-toggle="target: body ; cls: post-focus" />
                                                        <div className="post-new uk-animation-slide-top-small">
                                                            <div className="post-new-header">
                                                                <h4> Create new post</h4>
                                                                {/* close button*/}
                                                                <span className="post-new-btn-close" uk-toggle="target: body ; cls: post-focus" uk-tooltip="title:Close; pos: left " />
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
                                                                {/* <a href="#">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                            <path fill="#4db3f6" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z">
                                                            </path>
                                                        </svg>
                                                        <input type="file" id="input" onChange={onFileChange} style={{ "display": "none" }} />
                                                        <label htmlFor="file" >
                                                            <span> Upload Image</span>
                                                        </label>

                                                    </a> */}

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
                                                                {/* 
                                                    <a href="#">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 512 512">
                                                            <path fill="#71a257" d="M450.6 153.6c-3.3 0-6.5.9-9.3 2.7l-86.5 54.6c-2.5 1.6-4 4.3-4 7.2v76c0 2.9 1.5 5.6 4 7.2l86.5 54.6c2.8 1.7 6 2.7 9.3 2.7h20.8c4.8 0 8.6-3.8 8.6-8.5v-188c0-4.7-3.9-8.5-8.6-8.5h-20.8zM273.5 384h-190C55.2 384 32 360.8 32 332.6V179.4c0-28.3 23.2-51.4 51.4-51.4h190c28.3 0 51.4 23.2 51.4 51.4v153.1c.1 28.3-23 51.5-51.3 51.5z">
                                                            </path>
                                                        </svg>
                                                        <span style={{marginTop: "10px"}}> Upload Videos</span>
                                                    </a>
                                                    <a href="#">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={23} height={23} viewBox="0 0 24 24">
                                                            <path fill="#f3c038" d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10c5.514,0,10-4.486,10-10S17.514,2,12,2z M8.5,8C9.328,8,10,8.896,10,10	s-0.672,2-1.5,2S7,11.104,7,10S7.672,8,8.5,8z M12,18c-1.905,0-3.654-0.874-4.8-2.399l1.599-1.201C9.563,15.417,10.73,16,12,16	c1.27,0,2.436-0.583,3.2-1.601l1.6,1.201C15.653,17.126,13.904,18,12,18z M15.5,12c-0.828,0-1.5-0.896-1.5-2s0.672-2,1.5-2	S17,8.896,17,10S16.328,12,15.5,12z">
                                                            </path>
                                                        </svg>
                                                        <span> Feeling </span>
                                                    </a>
                                                    <a href="#">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24">
                                                            <path fill="#673ab7" d="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z">
                                                            </path>
                                                        </svg>
                                                        <span> Post Color </span>
                                                    </a>
                                                    <a href="#">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={23} height={23} viewBox="0 0 24 24">
                                                            <path fill="#ff3a55" d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z">
                                                            </path>
                                                        </svg>
                                                        <span> Recording </span>
                                                    </a>
                                                    <a href="#">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 512 512">
                                                            <path fill="#6bcfef" d="M312 155h91c2.8 0 5-2.2 5-5 0-8.9-3.9-17.3-10.7-22.9L321 63.5c-5.8-4.8-13-7.4-20.6-7.4-4.1 0-7.4 3.3-7.4 7.4V136c0 10.5 8.5 19 19 19z">
                                                            </path>
                                                            <path fill="#6bcfef" d="M267 136V56H136c-17.6 0-32 14.4-32 32v336c0 17.6 14.4 32 32 32h240c17.6 0 32-14.4 32-32V181h-96c-24.8 0-45-20.2-45-45z">
                                                            </path>
                                                        </svg>
                                                        <span> File </span>
                                                    </a>
                                                    <a href="#">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24">
                                                            <path fill="#f07729" d="M3.572,5.572l4.506,10.813C8.233,16.757,8.597,17,9.001,17H18c0.417,0,0.79-0.259,0.937-0.648l3-8 c0.115-0.308,0.072-0.651-0.114-0.921C21.635,7.161,21.328,7,21,7H6.333L4.923,3.615C4.768,3.243,4.404,3,4,3H2v2h1L3.572,5.572z">
                                                            </path>
                                                            <circle fill="#f07729" cx="10.5" cy="20.5" r="1.5" />
                                                            <circle fill="#f07729" cx="16.438" cy="20.5" r="1.5" />
                                                        </svg>
                                                        <span> Product </span>
                                                    </a>
                                                    <a href="#">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 24 24">
                                                            <path fill="#31a38c" d="M17,17H15V13H17M13,17H11V7H13M9,17H7V10H9M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z">
                                                            </path>
                                                        </svg>
                                                        <span> Create Poll </span>
                                                    </a>
                                                    <a href="#">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={23} height={23} viewBox="0 0 24 24">
                                                            <path fill="#f35369" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z">
                                                            </path>
                                                        </svg>
                                                        <span> Location </span>
                                                    </a> */}
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

                                                                {/* <input type="submit" value="Share" className="button primary px-6" /> */}
                                                                {/* <a href="#" className="button primary px-6"> Share </a> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </Fragment> : ''}
                                    </div>

                                    {/* <div className="post"> */}
                                        {posts.map(post => (
                                            <PostItem key={post.file_id} post={post} postId={post.file_id} />
                                        ))}

                                        {/* post comments */}
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
                                    {/* </div> */}
                                    <div className="post">
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
                                        {/* post comments */}
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
                                    </div>
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
                                        {/* post comments */}
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
                                    </div>
                                    <div className="post">
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
                                        {/* post comments */}
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
                                </div>
                                <div className="uk-width-expand">
                                    <div className="sl_sidebar_sugs_title border-0"> Trending !
            <i className="icon-feather-rotate-cw" />
                                    </div>
                                    <div className="list-group-item sl_htag">
                                        <a href="#">
                                            <span className="htag_top"> #hello</span>
                                        </a>
                                    </div>
                                    <div className="list-group-item sl_htag">
                                        <a href="#">
                                            <span className="htag_top"> #test</span>
                                        </a>
                                    </div>
                                    <div className="list-group-item sl_htag">
                                        <a href="#">
                                            <span className="htag_top"> #template</span>
                                        </a>
                                    </div>
                                    <div className="list-group-item sl_htag">
                                        <a href="#">
                                            <span className="htag_top"> #social</span>
                                        </a>
                                    </div>
                                    <div className="list-group-item sl_htag">
                                        <a href="#">
                                            <span className="htag_top"> #simplest</span>
                                        </a>
                                    </div>
                                    <div className="list-group-item sl_htag">
                                        <a href="#">
                                            <span className="htag_top"> #new</span>
                                        </a>
                                    </div>
                                    <div className="sl_sidebar_sugs_title mt-4">Pro Members
            <i className="icon-feather-rotate-cw" />
                                    </div>
                                    <div className="uk-position-relative" uk-slider="finite: true; autoplay:true">
                                        <div className="uk-slider-container pb-3">
                                            <ul className="uk-slider-items uk-child-width-1-3@m uk-grid-small uk-grid sl_pro_users">
                                                <li>
                                                    <a className="user" href="#">
                                                        <img src="assets/images/avatars/avatar-1.jpg" alt />
                                                        <span>Stella Johnson 1</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="user" href="#">
                                                        <img src="assets/images/avatars/avatar-2.jpg" alt />
                                                        <span>Stella Johnson 2</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="user" href="#">
                                                        <img src="assets/images/avatars/avatar-3.jpg" alt />
                                                        <span>Stella Johnson 3</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="user" href="#">
                                                        <img src="assets/images/avatars/avatar-4.jpg" alt />
                                                        <span>Stella Johnson 4</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="user" href="#">
                                                        <img src="assets/images/avatars/avatar-5.jpg" alt />
                                                        <span>Stella Johnson 5</span>
                                                    </a>
                                                </li>
                                            </ul>
                                            <a className="uk-position-center-left uk-hidden-hover slidenav-prev sl_pro_users_prev" href="#" uk-slider-item="previous" />
                                            <a className="uk-position-center-right-out uk-position-small uk-hidden-hover slidenav-next sl_pro_users_next" href="#" uk-slider-item="next" />
                                        </div>
                                    </div>
                                    <div className="sl_sidebar_sugs_title">People you may know
            <i className="icon-feather-rotate-cw" />
                                    </div>
                                    <div className="sl_sidebar_sugs">
                                        <div className="sl_sidebar_sugs_avatar">
                                            <img src="assets/images/avatars/avatar-1.jpg" alt />
                                        </div>
                                        <div className="sl_sidebar_sugs_text">
                                            <a href="#" className="sl_user_link_name"> Jonathan Madano </a>
                                        </div>
                                        <div className="user-follow-button sl_sidebar_sugs_btns">
                                            <button type="button" className="button small">
                                                <span> Follow</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="sl_sidebar_sugs">
                                        <div className="sl_sidebar_sugs_avatar">
                                            <img src="assets/images/avatars/avatar-6.jpg" alt />
                                        </div>
                                        <div className="sl_sidebar_sugs_text">
                                            <a href="#" className="sl_user_link_name"> Monera Khalifa </a>
                                        </div>
                                        <div className="user-follow-button sl_sidebar_sugs_btns">
                                            <button type="button" className="button small">
                                                <span> Accept</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="sl_sidebar_sugs">
                                        <div className="sl_sidebar_sugs_avatar">
                                            <img src="assets/images/avatars/avatar-3.jpg" alt />
                                        </div>
                                        <div className="sl_sidebar_sugs_text">
                                            <a href="#" className="sl_user_link_name"> Adrian Mohani </a>
                                        </div>
                                        <div className="user-follow-button sl_sidebar_sugs_btns">
                                            <button type="button" className="button small">
                                                <span> Follow</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="sl_sidebar_sugs">
                                        <div className="sl_sidebar_sugs_avatar">
                                            <img src="assets/images/avatars/avatar-2.jpg" alt />
                                        </div>
                                        <div className="sl_sidebar_sugs_text">
                                            <a href="#" className="sl_user_link_name"> Stella Johnson </a>
                                        </div>
                                        <div className="user-follow-button sl_sidebar_sugs_btns">
                                            <button type="button" className="button small">
                                                <span> Follow</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="sl_sidebar_sugs_title mt-4">Pages you may like
            <i className="icon-feather-rotate-cw" />
                                    </div>
                                    <div className="sl_sidebar_sugs">
                                        <div className="sl_sidebar_sugs_avatar">
                                            <img src="assets/images/brand/brand-avatar-3.png" alt />
                                        </div>
                                        <div className="sl_sidebar_sugs_text">
                                            <a href="#" className="sl_user_link_name"> Suranna Brand </a>
                                            <span> Education</span>
                                        </div>
                                        <div className="user-follow-button sl_sidebar_sugs_btns">
                                            <button type="button" className="button small">
                                                <span> Like </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="sl_sidebar_sugs">
                                        <div className="sl_sidebar_sugs_avatar">
                                            <img src="assets/images/brand/brand-avatar-4.png" alt />
                                        </div>
                                        <div className="sl_sidebar_sugs_text">
                                            <a href="#" className="sl_user_link_name"> Uk Brands </a>
                                            <span> Shopping</span>
                                        </div>
                                        <div className="user-follow-button sl_sidebar_sugs_btns">
                                            <button type="button" className="button small">
                                                <span> Like </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="sl_sidebar_sugs_title mt-4">Suggested groups
            <i className="icon-feather-rotate-cw" />
                                    </div>
                                    <div className="sl_sidebar_sugs">
                                        <div className="sl_sidebar_sugs_avatar">
                                            <img src="assets/images/group/group-2.jpg" alt />
                                        </div>
                                        <div className="sl_sidebar_sugs_text">
                                            <a href="#" className="sl_user_link_name"> Coffee Addicts </a>
                                            <span> 6 Members</span>
                                        </div>
                                        <div className="user-follow-button sl_sidebar_sugs_btns">
                                            <button type="button" className="button small">
                                                <span> Join </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="sl_sidebar_sugs">
                                        <div className="sl_sidebar_sugs_avatar">
                                            <img src="assets/images/group/group-1.jpg" alt />
                                        </div>
                                        <div className="sl_sidebar_sugs_text">
                                            <a href="#" className="sl_user_link_name"> Architecture </a>
                                            <span> 12 Members</span>
                                        </div>
                                        <div className="user-follow-button sl_sidebar_sugs_btns">
                                            <button type="button" className="button small">
                                                <span> Join </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="sl_sidebar_sugs">
                                        <div className="sl_sidebar_sugs_avatar">
                                            <img src="assets/images/group/group-3.jpg" alt />
                                        </div>
                                        <div className="sl_sidebar_sugs_text">
                                            <a href="#" className="sl_user_link_name"> Mountain Riders </a>
                                            <span> 32 Members</span>
                                        </div>
                                        <div className="user-follow-button sl_sidebar_sugs_btns">
                                            <button type="button" className="button small">
                                                <span> Join </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="sl_sidebar_sugs">
                                        <div className="sl_sidebar_sugs_avatar">
                                            <img src="assets/images/group/group-4.jpg" alt />
                                        </div>
                                        <div className="sl_sidebar_sugs_text">
                                            <a href="#" className="sl_user_link_name"> Graphic Design </a>
                                            <span> 25 Members</span>
                                        </div>
                                        <div className="user-follow-button sl_sidebar_sugs_btns">
                                            <button type="button" className="button small">
                                                <span> Join </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="sl_sidebar_sugs_title mt-4">Online Users 1
          </div>
                                    <div className="sl_sidebar_sugs_title mt-1"> Invite Your Friends
            <i className="icon-feather-rotate-cw" />
                                    </div>
                                    <form action="#" className="invite-user-form">
                                        <div className="sl_form_fields invite-user-combine">
                                            <input type="text" name="email" placeholder="E-mail" className="form-control" />
                                            <button className="button small" title="Send Invitation"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                                            </svg></button>
                                        </div>
                                    </form>
                                    <div className="sl_sidebar_sugs_title mt-4">Promoted Pages
            <i className="icon-feather-rotate-cw" />
                                    </div>
                                    <div className="sl_sidebar_sugs">
                                        <div className="sl_sidebar_sugs_avatar">
                                            <img src="assets/images/brand/brand-avatar-3.png" alt />
                                        </div>
                                        <div className="sl_sidebar_sugs_text">
                                            <a href="#" className="sl_user_link_name"> Suranna Brand </a>
                                            <span> Education</span>
                                        </div>
                                        <div className="user-follow-button sl_sidebar_sugs_btns">
                                            <button type="button" className="button small">
                                                <span> Like </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="sl_sidebar_sugs">
                                        <div className="sl_sidebar_sugs_avatar">
                                            <img src="assets/images/brand/brand-avatar-4.png" alt />
                                        </div>
                                        <div className="sl_sidebar_sugs_text">
                                            <a href="#" className="sl_user_link_name"> Uk Brands </a>
                                            <span> Shopping</span>
                                        </div>
                                        <div className="user-follow-button sl_sidebar_sugs_btns">
                                            <button type="button" className="button small">
                                                <span> Like </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="sl_sidebar_sugs">
                                        <div className="sl_sidebar_sugs_avatar">
                                            <img src="assets/images/brand/brand-avatar-1.png" alt />
                                        </div>
                                        <div className="sl_sidebar_sugs_text">
                                            <a href="#" className="sl_user_link_name"> Reveal Store </a>
                                            <span> Shopping</span>
                                        </div>
                                        <div className="user-follow-button sl_sidebar_sugs_btns">
                                            <button type="button" className="button small">
                                                <span> Like </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="sl_sidebar_sugs">
                                        <div className="sl_sidebar_sugs_avatar">
                                            <img src="assets/images/brand/brand-avatar-2.png" alt />
                                        </div>
                                        <div className="sl_sidebar_sugs_text">
                                            <a href="#" className="sl_user_link_name"> Phase Designers </a>
                                            <span> Design</span>
                                        </div>
                                        <div className="user-follow-button sl_sidebar_sugs_btns">
                                            <button type="button" className="button small">
                                                <span> Like </span>
                                            </button>
                                        </div>
                                    </div>
                                    {/* Footer menus*/}
                                    <div className="footer-wrapper-sidebar mt-4">
                                        <div className="footer-powered">
                                            <p> © 2020 Simplest.net</p>
                                        </div>
                                        <hr />
                                        <ul className="list-inline">
                                            <li><a href="#">About</a></li>
                                            <li><a href="#">Blog</a></li>
                                            <li><a href="#"> Privecy</a></li>
                                            <li><a href="#">Contact Us</a></li>
                                            <li><a href="#">Developers</a></li>
                                            <li>
                                                <div className="dropdown dropup sun_foot_drop_menu">
                                                    <a href="#" className="dropdown-toggle">
                                                        More <span className="caret" />
                                                    </a>
                                                    <div uk-dropdown="pos: bottom-left ; mode:hover " className="uk-dropdown uk-dropdown-bottom-right" style={{ left: 745, top: 87 }}>
                                                        <ul className="uk-nav uk-dropdown-nav">
                                                            <li><a href="#"> View as guast </a></li>
                                                            <li><a href="#"> Bloc this person </a></li>
                                                            <li><a href="#"> Report abuse</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="clear" />
                                    </div>
                                </div>
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
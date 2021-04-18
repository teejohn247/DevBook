import React, { useEffect, useState, useRef, Fragment } from 'react';
import { loadUser } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { fetchChats, chat } from '../../actions/chat';
import LoadingSpinner from '../layout/chatLoader';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { Socket } from 'socket.io-client';
import io from "socket.io-client";




const socket = io.connect('http://localhost:4000', { 'forceNew': true })

const Online = ({ chat, fetchChats, online: { onlineUsers }, user }) => {
    const [chats, setChats] = useState(false);
    const [userChat, setUserChat] = useState(false);
    // user._id, user.name, user.image

    const [receiver, setReceiver] = useState('');
    const [text, setText] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [receiverImage, setReceiverImage] = useState('');

    const [trackChat, setTrackhat] = useState(false);


    const [chatLoader, setChatLoader] = useState(false);


    const dispatch = useDispatch()


    const textEndRef = useRef(null)

    useEffect(() => {

        socket.emit('online_users', {
            user_id: user._id,
            user_image: user.image,
            name: user.name,
        })
        
        if (textEndRef) {
            textEndRef.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, [])

    console.log({ onlineUsers })
    const handleChat = (e) => {
        e.preventDefault();
        setChats(!chats)
    }

    const sendChat = (e) => {
        e.preventDefault();

        socket.emit('chat', {
            user: user._id,
            msg: text,
            sender_id: user._id,
            receiver_id: receiver,
            sender_image: user.image,
            receiver_image: receiverImage,
            sender_name: user.name,
            receiver_name: receiverName,
            chatsBetween: [user._id, receiver]
        })

        setText('')

        // setReceiver('')
        // setReceiverName('')
        // setReceiverImage('')
    }



    const handleUserChat = async (e, user_id, name, image) => {
        e.preventDefault();
        setUserChat(!userChat)
        setChats(false)
        setChatLoader(true)
        setReceiver(user_id)
        setReceiverName(name)
        setReceiverImage(image)
        const data = {
            "sender_id": user._id,
            "receiver_id": user_id
        }
        await fetchChats(data)
        console.log({ userChat })
        setChatLoader(false)
        setTrackhat(true)

        console.log("check_well", chat)

    }
    return (
        <Fragment>
            <a className="chat-plus-btn" href="#sidebar-chat" style={{ zIndex: "200" }} uk-toggle onClick={e => handleChat(e)}>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>
            </a>

            {/* {chatLoader ? <LoadingSpinner /> : */}

            <div id="sidebar-chat" className="sidebar-chat px-3 uk-offcanvas uk-offcanvas-overlay uk-open for_index" uk-offcanvas="flip: true; overlay: true" style={{ display: !userChat ? "none" : "block" }}>
                <div className="uk-offcanvas-bar uk-offcanvas-bar-animation uk-offcanvas-slide chat_side" style={{
                   
                }}>
                    <div className="sidebar-chat-head mb-2">
                        <div className="btn-actions">
                            <a href="#" uk-tooltip="title: Search ;offset:7" uk-toggle="target: .sidebar-chat-search; animation: uk-animation-slide-top-small" title aria-expanded="false"> <i className="icon-feather-search" /> </a>
                            <a href="#" uk-tooltip="title: settings ;offset:7" title aria-expanded="false"> <i className="icon-feather-settings" /> </a>
                            <a href="#"> <i className="uil-ellipsis-v" /> </a>
                            <a href="#" className="uk-hidden@s"> <button className="uk-offcanvas-close uk-close uk-icon" type="button" uk-close> <svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" data-svg="close-icon"><line fill="none" stroke="#000" strokeWidth="1.1" x1={1} y1={1} x2={13} y2={13} /><line fill="none" stroke="#000" strokeWidth="1.1" x1={13} y1={1} x2={1} y2={13} /></svg></button> </a>
                        </div>
                        <h2> {receiverName} </h2>
                    </div>

                    <ul className="uk-child-width-expand sidebar-chat-tabs uk-tab" uk-tab>
                        <li className="uk-active">Chat</li>
                    </ul>
                    <div className="media_chat" ref={textEndRef} style={{}}>

                        {trackChat && chat.loading == false ?
                            console.log("chkk", chat) : console.log("false", chat.loading)}

                        {trackChat && chat.loading == false ?
                            <Fragment>
                                {(trackChat && chat.chat.map((ch, i) => (
                                    // console.log('check_well', ch)
                                    ch.user == user._id ?
                                        <a href="#" style={{ display: "flex", margin: "10px", justifyContent: "flex-start" }}>
                                            <div className="contact-list-media" style={{height: "45px"}}> <img src={ch.sender_image} alt />
                                                <span className="online-dot" /> </div>
                                            <div className="contact-list" style={{ background: "#f1f3f4", width: "70%" }}>
                                                <h5 style={{overflowWrap: "anywhere" }}> {ch.msg} </h5>
                                            </div>
                                        </a>
                                        :
                                        <a href="#" style={{ display: "flex", margin: "10px", justifyContent: "flex-end" }}>
                                            <div className="contact-list" style={{ background: "#007BFF", width: "70%" }}>
                                                <h5 style={{ color: "white", overflowWrap: "anywhere" }} >{ch.msg}</h5>
                                            </div>
                                            <div className="contact-list-media" style={{height: "45px"}}> <img src={ch.receiver_image} alt />
                                                <span className="online-dot" /> </div>
                                        </a>
                                ))
                                )}


                            </Fragment> :
                            <LoadingSpinner />
                        }
                    </div>



                    {/* //        :
                        //        (<a href="#" style={{ display: "flex", margin: "10px", justifyContent: "flex-end" }}>
                        //        <div className="contact-list" style={{ background: "#007BFF", width: "70%" }}>
                        //                <h5 style={{ color: "white" }}>{ch.receiver_name}</h5>
                        //        </div>
                        //        <div className="contact-list-media"> <img src={ch.receiver_image} alt />
                        //            <span className="online-dot" /> </div>
                        //    </a>)

                        //    ) */}

                    {/* <a href="#" style={{ display: "flex", margin: "10px", justifyContent: "flex-end" }}>
                                <div className="contact-list" style={{ background: "#007BFF", width: "70%" }}>
                                    <h5 style={{ color: "white" }}> Erica Jones </h5>
                                </div>
                                <div className="contact-list-media"> <img src="assets/images/avatars/avatar-1.jpg" alt />
                                    <span className="online-dot" /> </div>
                            </a> */}

                    <div className="sidebar-chat-search  " aria-hidden="false" style={{
                        position: "fixed",
                        width: "325px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        bottom: 0
                    }}>
                        {/* uk-toggle="target: .sidebar-chat-search; animation: uk-animation-slide-top-small" */}

                        <textarea style={{lineHeight:"18px !important"}} value={text} onChange={e => setText(e.target.value)} type="text" className="uk-input" placeholder="Search in Messages" ></textarea>
                        <span className="btn-close" onClick={e => sendChat(e)}> <i className="icon-feather-send" /> </span>
                    </div>

                </div>
            </div>

            {chats &&
                // chat ? <LoadingSpinner /> :
                <div id="sidebar-chat" className="sidebar-chat px-3 uk-offcanvas uk-offcanvas-overlay uk-open" uk-offcanvas="flip: true; overlay: true" style={{ display: !chats ? "none" : "block", zIndex: "100" }}>
                    <div className="uk-offcanvas-bar uk-offcanvas-bar-animation uk-offcanvas-slide for_que" >
                    {/* style={{ left: '76%' }} */}
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
                        {onlineUsers.map((users, i) => (
                            user._id != users._id &&
                            <span>
                                <div className="contact-list" onClick={e => handleUserChat(e, users._id, users.name, users.image)}>
                                    <div className="contact-list-media"> <img src={users.image} alt />
                                        <span className="online-dot" /> </div>
                                    <h5> {users.name} </h5>
                                </div>
                            </span>
                        ))
                        }

                        {/* <a href="#">
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
                        </a> */}
                    </div>
                </div>
            }


        </Fragment>

    )
}

Online.PropTypes = {
    loadUser: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    fetchChats: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
    getCurrentPost: PropTypes.func.isRequired,
    onlineFriends: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post,
    profile: state.profile,
    online: state.online,
    chat: state.chat
})


export default connect(mapStateToProps, { fetchChats })(Online);

import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFriend, confirmFriend } from '../../actions/profile';
import { setAlert } from '../../actions/alert';
import Alert from '../layout/Alert';

import io from "socket.io-client";

const Find = ({ addFriend, socket, confirmed, setAlert, req, prof, user, profil }) => {
    const [sentReq, setSentReq] = useState(false)
    console.log({ confirmed })
    console.log({ req })

    // useEffect(() => {
    //     profil.sentRequests.map((req,i) => {
    //         console.log(req.user, prof.user,req.user == prof.user)
    //         req.user == prof.user ? setSentReq(true) : setSentReq(false)
    //     })
    // }, [profil]);
    const addFriends = (e) => {
        e.preventDefault();
        // setIsLoading(true);
        // console.log('add');


        socket.emit('add_friend', {
            sender: user._id,
            senderName: user.name,
            receiverName: prof.name,
            senderEmail: user.email,
            receiverEmail: prof.email,
            senderImage: user.image ? user.image : "https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder-480x480.gif",
            receiverImage: prof.image ? prof.image : "https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder-480x480.gif",
            receiver: prof.user,

            user: user._id,
            sender_id: user._id,
            receiver_id: prof.user,
            sender_image: user.image,
            receiver_image: prof.image,
            sender_name: user.name,
            receiver_name: prof.name,
            notificationType: "FriendRequest"
        })


        // setAlert('Friend request sent', 'success');
        // setEmmited(true)
    }
    return (

        <Fragment>

            {/* users   */}
            {/* <div className="uk-child-width-1-4@m uk-child-width-1-2@s uk-grid-small uk-grid" uk-grid> */}
           {user._id !== prof.user &&
           
            <div className="uk-first-column" style={{ marginBottom: "20px" }}>
                <div className="sl_find_frns_user">
                    <div className="sl_find_frns_user_cover">
                        <img src={prof.image} alt />
                    </div>
                    <div className="sl_find_frns_user_info">
                        <div className="sl_find_frns_user_avatar">
                            {/* <a href="timeline.html"> */}
                            <img src={prof.image} alt />
                            {/* </a> */}
                        </div>
                        <h4> {prof.name} </h4>
                        {/* <p>  </p> */}
                    </div>
                    <div className="sl_find_frns_user_btns">

                        {confirmed == true  ?
                            <span>
                                <button type="button" className="btn button small primary" style={{ height: "auto" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="8.5" cy={7} r={4} />
                                        <line x1={20} y1={8} x2={20} y2={14} />
                                        <line x1={23} y1={11} x2={17} y2={11} />
                                    </svg>
                                    <span>Friends</span>
                                </button>
                            </span> :

                            req == true  ?
                                <span>

                                    <button type="button" className="btn button small primary" style={{ height: "auto" }} disabled>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="8.5" cy={7} r={4} />
                                            <line x1={20} y1={8} x2={20} y2={14} />
                                            <line x1={23} y1={11} x2={17} y2={11} />
                                        </svg>
                                        <span>Friend Request Sent</span>
                                    </button>
                                </span> :
                                (confirmed == false) && (req == false) &&
                                <span>
                                    <button type="button" className="btn button small primary" style={{ height: "auto" }} onClick={e => addFriends(e)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="8.5" cy={7} r={4} />
                                            <line x1={20} y1={8} x2={20} y2={14} />
                                            <line x1={23} y1={11} x2={17} y2={11} />
                                        </svg>
                                        <span> Add as Friend</span>
                                    </button>
                                </span>

                        }
                        {/* {!conf && !req ?
                            <span>
                                <button type="button" className="btn button small primary" style={{height: "auto"}} onClick={e => addFriends(e)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="8.5" cy={7} r={4} />
                                        <line x1={20} y1={8} x2={20} y2={14} />
                                        <line x1={23} y1={11} x2={17} y2={11} />
                                    </svg>
                                    <span> Add as Friend</span>
                                </button>
                            </span>
                        : 
                        <span>
                        <button type="button" className="btn button small primary" style={{height: "auto"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="8.5" cy={7} r={4} />
                                <line x1={20} y1={8} x2={20} y2={14} />
                                <line x1={23} y1={11} x2={17} y2={11} />
                            </svg>
                            <span>Friends</span>
                        </button>
                    </span>
                    } */}
                    </div>
                </div>

                {/* </div> */}


            </div>
           }
            {/* <div className="load-more">
                <button className="btn button">Load more users</button>
            </div> */}
            <Alert />
        </Fragment>
    );
}


Find.PropTypes = {
    setAlert: PropTypes.func.isRequired,
    addFriend: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    alert: state.alert,
})
export default connect(mapStateToProps, { addFriend, setAlert })(Find);


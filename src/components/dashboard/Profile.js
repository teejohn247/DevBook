import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from "socket.io-client";
import { addLike, removeLike, addComment, addCommentLike, removeCommentLike } from '../../actions/post';
import LoadingSpinner from '../layout/spinner';


const profile = ({profile, user, onClick}) => {
    // const handleTarget = () => {

    //     setPostInput(!postInput)
    //     console.log({ postInput })
    // }

    return (
        <Fragment>
            <div className="profile">
                <div className="profile-cover">
                    {/* profile cover */}
                    <img src={profile.cover} alt />
                    <a onClick={onClick} > <i className="uil-camera" /> Edit </a>
                </div>
                <div className="profile-details">
                    <div className="profile-image">
                        <img src={profile.image} style={{objectFit: "contain"}} alt />
                        <a href="#"> </a>
                    </div>
                    <div className="profile-details-info">
                        <h1> {user.name} </h1>
                        <p> 
                        {profile.skills.map((skill,i) => {
                            return <span>{skill}</span>
                        })}
                       <a href="#">Edit </a></p>
                       <p> 
                        Works @ {profile.company}
                       </p>
                    </div>
                </div>
                <div className="nav-profile uk-sticky" uk-sticky="media : @s" style={{}}>
                {user._id == profile.user ?

                    <div className="py-md-2 uk-flex-last">
                        <a href="#" className="button primary mr-2"> <i className="uil-plus" /> Add your story</a>
                        <a href="#" className="button light button-icon mr-2"> <i className="uil-list-ul"> </i> </a>
                        <a href="#" className="button light button-icon mr-lg-3" aria-expanded="false"> <i className="uil-ellipsis-h"> </i> </a>
                        <div uk-dropdown="pos: bottom-left ; mode:hover" className="display-hidden uk-dropdown">
                            <ul className="uk-nav uk-dropdown-nav">
                                <li><a href="#"> View as guest </a></li>
                                <li><a href="#"> Block this person </a></li>
                                <li><a href="#"> Report abuse</a></li>
                            </ul>
                        </div>
                    </div> : 
                    <div className="py-md-2 uk-flex-last">
                        <a href="#" className="button primary mr-2"> <i className="uil-plus" /> Add Friend</a>
                        <a href="#" className="button light button-icon mr-2"> <i className="uil-list-ul"> </i> </a>
                        <a href="#" className="button light button-icon mr-lg-3" aria-expanded="false"> <i className="uil-ellipsis-h"> </i> </a>
                        <div uk-dropdown="pos: bottom-left ; mode:hover" className="display-hidden uk-dropdown">
                            <ul className="uk-nav uk-dropdown-nav">
                                <li><a href="#"> View as guest </a></li>
                                <li><a href="#"> Block this person </a></li>
                                <li><a href="#"> Report abuse</a></li>
                            </ul>
                        </div>
                    </div> }

                    <div>
                        <nav className="responsive-tab ml-lg-3">
                            <ul style={{display:'flex', listStyleType:'none'}}>
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

        </Fragment>

    )

}


profile.PropTypes = {
    profile: PropTypes.object.isRequired,
    user:PropTypes.object.isRequired
    
}
const mapStateToProps = (state) => ({
    auth: state.auth,
})
export default connect(mapStateToProps)(profile);
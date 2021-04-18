
import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingSpinner from '../layout/spinner';
import { getFriendsProfiles,getCurrentProfile } from '../../actions/profile';
import Find from './Find';
import SideBar from "./SideBar";
import io from "socket.io-client";
import Header from "./Header";
import { loadUser } from '../../actions/auth';
import Alert from '../layout/Alert';
import { setAlert } from '../../actions/alert';


import { BrowserRouter, useHistory, useParams } from 'react-router-dom';


const socket = io.connect('http://localhost:4000', { 'forceNew': true })

const findFriends = ({setAlert,  getCurrentProfile, getFriendsProfiles, loadUser, auth: { user }, profile: { loading, profiles, profile } }) => {
console.log("ppp", profile)
    // useEffect(() => {
    //     socket.on('connect', function () {
    //         console.log('connected!')

    //     })
    //     // const fetchData = async () => {
    //     //     // await loadUser()
    //     //     await getCurrentProfile()
    //     //     await getFriendsProfiles()

    //     // }

    //     // fetchData();
    //     return () => {
    //         socket.off('disconnect');
    //     };
    // }, [])

    // useEffect(() => {
    
    //     const fetchData = async () => {
    //         await getCurrentProfile()
    //     }
    //     fetchData();
       
    // }, [profile.friendsList])

    // useEffect(() => {
    //     // var arr2 = []
    //     // console.log("friendsList", profile.friendsList)
    //     // if (profile.friendsList) {
    //         const fetchData = async () => {
    //             await getCurrentProfile()
    //         }
    //         fetchData();
    //     // }
    // }, [profile])



    return loading ? (
        <LoadingSpinner />
    ) : (
            <Fragment>
                <div id="wrapper">
                    <SideBar />
                    <div className="main_content" style={{marginLeft: "0px"}}>
                        {/* <Header /> */}
                        <div className="main_content_inner">
                            <div className="sl_filter_btn" uk-toggle="target: #offcanvas-flip">  <i className="uil-filter" />   Open Filter </div>
                            <ul id="component-nav" className="uk-switcher" style={{ touchAction: 'pan-y pinch-zoom' }}>
                                <li className="uk-active">
                                    <h2> Find Friend</h2>
                                    <div className="section-small pt-2">
                                        <div className="uk-child-width-1-4@m uk-child-width-1-2@s uk-grid-small uk-grid" uk-grid>

                                            {profiles.length > 0 && profiles.map((prof, key) => {
                                                console.log({ prof })
                                                let arr = [];
                                                let conf = [];
                                                profile.sentRequests.map(pr => arr.push(pr.user))
                                                profile.friendsList.map(pr => conf.push(pr.user))

                                                let use = prof.user
                                                return <Find key={key} socket={socket} req={arr.includes(use)} confirmed={conf.includes(use)} user={user} profil={profile} prof={prof} />
                                            }
                                            )}
                                        </div>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
                <Alert />
            </Fragment>

        )

}

findFriends.PropTypes = {
    getFriendsProfiles: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    alert: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    alert: state.alert,
    profile: state.profile
})


export default connect(mapStateToProps, { getFriendsProfiles, setAlert, getCurrentProfile, loadUser})(findFriends);















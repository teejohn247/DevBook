import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from "socket.io-client";
import { addLike, removeLike, addComment, addCommentLike, removeCommentLike } from '../../actions/post';
import LoadingSpinner from '../layout/spinner';


const rightSideBar = () => {
    return (
        <Fragment>
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
        </Fragment>

    )

}

export default rightSideBar;
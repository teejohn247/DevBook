import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from "socket.io-client";
import { addLike, removeLike, addComment, addCommentLike, removeCommentLike } from '../../actions/post';
import LoadingSpinner from '../layout/spinner';


const story = () => {
    return (
        <Fragment>
            
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
        </Fragment>

    )

}

export default story;
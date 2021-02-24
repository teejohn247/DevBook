import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingSpinner from '../layout/spinner';









{/* <p>{text}</p>
{images.map((file,i) => {
    <div className="fullsizeimg">
    <img src={file.image} alt />
    </div>
})} */}
const PostItem = ({ post: { file_id, user, name, email, text, time, images, loading } }) => {


    return loading == true ? (<LoadingSpinner />) : images ? (
        
        <Fragment>
            <div className="post">
                <div className="post-heading">
                    <div className="post-avature">
                        <img src="assets/images/avatars/avatar-4.jpg" alt />
                    </div>
                    <div className="post-title">
                        <h4> {name} </h4>
                        <p> {time}<span> hrs</span> <i className="uil-users-alt" /> </p>
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
                {/* <div class="post-description">
                <div class="uk-grid-small uk-grid">
                <div class="uk-width-1-1@m">
                <img src="assets/images/post/img-4.jpg" class="rounded"></div>

                <div class="uk-width-1-2@m uk-width-1-2"><img src="assets/images/post/img-2.jpg" class="rounded"></div>

                <div class="uk-width-1-2@m uk-width-1-2 uk-position-relative">
                <img src="assets/images/post/img-3.jpg" class="rounded">
                <div class="uk-position-center uk-light"><a href="#">
                <h3> + 15 more </h3>
                </a></div></div></div><div class="post-state-details"><div><img src="assets/images/icons/reactions_like.png"><img src="assets/images/icons/reactions_love.png"><p> 13 </p></div><p> <span class="mr-2"> <i class="uil-eye"></i> Veiws </span> 212 Comments </p></div></div> */}

                <div className="post-description">
                    <p> {text} </p>
                    <div class="uk-grid-small uk-grid">
                    {/* <div class="uk-width-1-1@m">
                     
                            </div> */}


                        {images.map((file, i) => {
                            if(images.length == 1){
                                return <div key={i} className="uk-width-1-1@m">
                                <img src={file.image} style={{width: '100%'}} className="rounded" alt />
                                </div>
                            }else{
                                return <div key={i} className="uk-width-1-2@m uk-width-1-2">
                                <img src={file.image} style={{width: '100%'}} className="rounded" alt />
                                </div>
                            }
                           
                        })
                        }
                        {/* <div className="fullsizeimg">

                            {images.map((file, i) => {
                                <img src={file.image} alt />
                            })
                            } */}
                    </div>

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
        </Fragment >
    ) : (
            <Fragment>
                <div className="post">
                    <div className="post-heading">
                        <div className="post-avature">
                            <img src="assets/images/avatars/avatar-4.jpg" alt />
                        </div>
                        <div className="post-title">
                            <h4> {name} </h4>
                            <p> {time}<span> hrs</span> <i className="uil-users-alt" /> </p>
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
                        <p> {text}</p>
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
            </Fragment >
        )


}

// return loading == true ? ( <Loader /> )
//  : (

PostItem.PropTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    // addLikes: PropTypes.func.isRequired, 
    // removeLikes: PropTypes.func.isRequired,
    // deletePost: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth,
})
export default connect(mapStateToProps)(PostItem);



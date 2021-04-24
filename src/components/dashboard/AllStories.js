import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import TextareaAutosize from "react-textarea-autosize";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import io from "socket.io-client";
import { addLike, removeLike, addComment, addCommentLike, removeCommentLike } from '../../actions/post';
import LoadingSpinner from '../layout/spinner';
import { addStory } from '../../actions/story';


const Allstories = ({addStory, socket, user, story:{stories}}) => {

    const [selectetdFile, setSelectedFile] = useState([]);
    const [postInput, setPostInput] = useState(false);
    const [fileBase64String, setFileBase64String] = useState("");
    const dispatch = useDispatch();

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
            var d = new Date();
            var unique = d.valueOf();
            socket.emit('story', {
                file_id: unique,
                user_id: user._id,
                user_image: user.image,
                name: user.name,
                email: user.email,
                image: newImages[0],
            })
            console.log('chk', newImages)
        }
    }

    socket.on('story', function (data) {
        console.log(data);



        // dispatch(addStory(data))
        // socket.off("post");
        setPostInput(true)

    })
  


    return (
        <Fragment>

            
<div className="story-pop uk-animation-slide-bottom-small">
                        <div className="story-side uk-width-1-4@s">
                            <div className="uk-flex uk-flex-between uk-flex-middle mb-2">
                                <h2 className="mb-0" style={{ fontWeight: 700 }}>All Story</h2>
                                <a href="#" className="text-primary"> Setting</a>
                            </div>
                            <div className="story-side-innr" data-simplebar>
                                {/* <h4 className="mb-1"> Your Story</h4>
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
                                </ul> */}
                                <div className="uk-flex uk-flex-between uk-flex-middle my-3">
                                    <h4 className="m-0"> Friends Story</h4>
                                    <a href="#" className="text-primary"> See all</a>
                                </div>
                                <ul className="story-side-list" uk-switcher="connect: #story-slider-switcher ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium">
                                   
                                   {stories.map(story => {
                                       return <li>
                                       <a href="#">
                                           <div className="story-user-media">
                                               <img src={story.image} alt />
                                           </div>
                                           <div className="story-user-innr">
                                               <h5>{story.name}</h5>
                                               <p> <span className="story-count"> 2 new </span> <span className="story-time-ago"> 4hr ago
                                            </span></p>
                                           </div>
                                       </a>
                                   </li>
                                   })}
                                   
                                   
                                    {/* <li>
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
                                    </li> */}
                                    {/* <li>
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
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                        <div className="story-content">
                            {/* close button*/}
                            <span className="story-btn-close" uk-toggle="target: body ; cls: is-open" uk-tooltip="title:Close story ; pos: left " />
                            <div className="story-content-innr">
                                <ul id="story-slider-switcher" className="uk-switcher">
                                {stories.map(story => {
                                       return <li>
                                       <a href="#" uk-switcher-item="previous" className="uk-position-center-left-out uk-position-medium slidenav-prev" />
                                       <a href="#" uk-switcher-item="next" className="uk-position-center-right-out uk-position-medium slidenav-next" />
                                       <div className="uk-position-relative uk-visible-toggle" uk-slider>
                                           {/* navigation */}
                                           <ul className="uk-slider-nav uk-dotnav story-slider-nav" />
                                           {/* Story posted image */}
                                           <ul className="uk-slider-items uk-child-width-1-1 story-slider">
                                               <li>
                                                   <div className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                                                       <img src={story.image} alt />
                                                   </div>
                                               </li>
                                               {/* <li>
                                                   <div className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                                                       <img src={user_image} alt />
                                                   </div>
                                               </li> */}
                                           </ul>
                                       </div>
                                   </li>
                                   })}
                                    {/* <li>
                                        <a href="#" uk-switcher-item="previous" className="uk-position-center-left-out uk-position-medium slidenav-prev" />
                                        <a href="#" uk-switcher-item="next" className="uk-position-center-right-out uk-position-medium slidenav-next" />
                                        <div className="uk-position-relative uk-visible-toggle" uk-slider>
                                            {/* navigation 
                                            <ul className="uk-slider-nav uk-dotnav story-slider-nav" />
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
                                        <a href="#" uk-switcher-item="previous" className="uk-position-center-left-out uk-position-medium slidenav-prev" />
                                        <a href="#" uk-switcher-item="next" className="uk-position-center-right-out uk-position-medium slidenav-next" />
                                        <div className="uk-position-relative uk-visible-toggle" uk-slider>
                                            <ul className="uk-slider-nav uk-dotnav story-slider-nav" />
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
                                        <a href="#" uk-switcher-item="previous" className="uk-position-center-left-out uk-position-medium slidenav-prev" />
                                        <a href="#" uk-switcher-item="next" className="uk-position-center-right-out uk-position-medium slidenav-next" />
                                        <div className="uk-position-relative uk-visible-toggle" uk-slider>
                                            <ul className="uk-slider-nav uk-dotnav story-slider-nav" />
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
                                        <a href="#" uk-switcher-item="previous" className="uk-position-center-left-out uk-position-medium slidenav-prev" />
                                        <a href="#" uk-switcher-item="next" className="uk-position-center-right-out uk-position-medium slidenav-next" />
                                        <div className="uk-position-relative uk-visible-toggle" uk-slider>
                                            <ul className="uk-slider-nav uk-dotnav story-slider-nav" />
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
                                        <a href="#" uk-switcher-item="previous" className="uk-position-center-left-out uk-position-medium slidenav-prev" />
                                        <a href="#" uk-switcher-item="next" className="uk-position-center-right-out uk-position-medium slidenav-next" />
                                        <div className="uk-position-relative uk-visible-toggle" uk-slider>
                                            <ul className="uk-slider-nav uk-dotnav story-slider-nav" />
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
                                        <a href="#" uk-switcher-item="previous" className="uk-position-center-left-out uk-position-medium slidenav-prev" />
                                        <a href="#" uk-switcher-item="next" className="uk-position-center-right-out uk-position-medium slidenav-next" />
                                        <div className="uk-position-relative uk-visible-toggle" uk-slider>
                                            <ul className="uk-slider-nav uk-dotnav story-slider-nav" />
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
                                        <a href="#" uk-switcher-item="previous" className="uk-position-center-left-out uk-position-medium slidenav-prev" />
                                        <a href="#" uk-switcher-item="next" className="uk-position-center-right-out uk-position-medium slidenav-next" />
                                        <div className="uk-position-relative uk-visible-toggle" uk-slider>
                                            <ul className="uk-slider-nav uk-dotnav story-slider-nav" />
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
                                        <a href="#" uk-switcher-item="previous" className="uk-position-center-left-out uk-position-medium slidenav-prev" />
                                        <a href="#" uk-switcher-item="next" className="uk-position-center-right-out uk-position-medium slidenav-next" />
                                        <div className="uk-position-relative uk-visible-toggle" uk-slider>
                                            <ul className="uk-slider-nav uk-dotnav story-slider-nav" />
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
                                        <a href="#" uk-switcher-item="previous" className="uk-position-center-left-out uk-position-medium slidenav-prev" />
                                        <a href="#" uk-switcher-item="next" className="uk-position-center-right-out uk-position-medium slidenav-next" />
                                        <div className="uk-position-relative uk-visible-toggle" uk-slider>
                                            <ul className="uk-slider-nav uk-dotnav story-slider-nav" />
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
                                        <a href="#" uk-switcher-item="previous" className="uk-position-center-left-out uk-position-medium slidenav-prev" />
                                        <a href="#" uk-switcher-item="next" className="uk-position-center-right-out uk-position-medium slidenav-next" />
                                        <div className="uk-position-relative uk-visible-toggle" uk-slider>
                                            <ul className="uk-slider-nav uk-dotnav story-slider-nav" />
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
                                        <a href="#" uk-switcher-item="previous" className="uk-position-center-left-out uk-position-medium slidenav-prev" />
                                        <a href="#" uk-switcher-item="next" className="uk-position-center-right-out uk-position-medium slidenav-next" />
                                        <div className="uk-position-relative uk-visible-toggle" uk-slider>
                                            <ul className="uk-slider-nav uk-dotnav story-slider-nav" />
                                            <ul className="uk-slider-items uk-child-width-1-1 story-slider">
                                                <li>
                                                    <div className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                                                        <img src="assets/images/avatars/avatar-lg-4.jpg" alt />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
        </Fragment>

    )

}

Allstories.PropTypes = {
    user: PropTypes.object.isRequired,
    addStory: PropTypes.func.isRequired,

    // profile: PropTypes.object.isRequired,
    // friendRequests: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post,
    profile: state.profile,
    story: state.story

})


export default connect(mapStateToProps, {addStory})(Allstories);
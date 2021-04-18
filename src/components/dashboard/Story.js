import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import TextareaAutosize from "react-textarea-autosize";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from "socket.io-client";
import { addLike, removeLike, addComment, addCommentLike, removeCommentLike } from '../../actions/post';
import LoadingSpinner from '../layout/spinner';
import { addStory } from '../../actions/story';


const story = ({addStory, socket, user, story:{stories}}) => {

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

            <div className="uk-position-relative" uk-slider="finite: true">
                <div className="uk-slider-container pb-3">
                    <ul className="uk-slider-items uk-child-width-1-5@m uk-child-width-1-3@s uk-child-width-1-3 story-slider uk-grid">
                        <li>
                        {/* uk-toggle="target: body ; cls: is-open" */}
                            <a href="#" >
                                <div className="story-card" style={{backgroundImage: `url(${user.image})`}} uk-img>

                                    {/* <i className="uil-plus" /> */}

                                    <label htmlFor="upload-story" >

                                        <i className="uil-plus" style={{position: "relative",top: "-120px",background: "white",
                                         "padding": "10px", borderRadius: "20px"}}/>

                                        {/* <h5 style={{ marginTop: "13px" }}>Upload your photo</h5> */}
                                    </label>
                                    <input type="file" multiple accept="image/*" id="upload-story" style={{ display: 'none' }} onChange={encodeFileBase64} />
                                    <TextareaAutosize
                                        style={{ display: "none" }}
                                        maxRows={20}
                                        value={fileBase64String}
                                        onChange={encodeFileBase64}
                                    />


                                    <div className="story-card-content">
                                        <h4>{user.name.split(' ')[0]}</h4>
                                    </div>
                                </div>
                            </a>
                        </li>
                            {stories.map(story => {
                            return <li>
                             <a href="#" uk-toggle="target: body ; cls: is-open">
                            <div className="story-card" data-src="assets/images/events/listing-5.jpg" style={{backgroundImage: `url(${story.image})`}} uk-img>
                                <img src={story.user_image} alt />
                                <div className="story-card-content">
                                    <h4>{story.name}</h4>
                                </div>
                            </div>
                        </a>
                        </li>
                            })}
                            {/* <a href="#" uk-toggle="target: body ; cls: is-open">
                                <div className="story-card" data-src="assets/images/events/listing-5.jpg" uk-img>
                                    <img src="assets/images/avatars/avatar-5.jpg" alt />
                                    <div className="story-card-content">
                                        <h4>{story}</h4>
                                    </div>
                                </div>
                            </a>
                        </li> */}
                        {/* <li>
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
                        </li> */}
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

story.PropTypes = {
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


export default connect(mapStateToProps, {addStory})(story);
import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import LoadingSpinner from '../layout/spinner';
import { setAlert } from '../../actions/alert';
import Alert from '../layout/Alert';
import Loader from '../layout/small_spinner';


const Register = ({ setAlert, register, isAuthenticated, alert }) => {
    const dispatch = useDispatch();

    if(alert.msg){
        console.log('alert', alert.msg)
        setLoading(false)
    }

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',

    })

    const { name, email, password, password2 } = formData;
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
        if (password !== password2) {
           await setAlert('Password do not match', 'error')
           setLoading(false)
        } 
        else{
        await register({ name, email, password })
        setLoading(false)
        }
    }

    if (isAuthenticated) {
        return <Redirect to="/login" />
    }

    return (
        <Fragment>
            <div className="login" style={{ "height": "100vh" }} >
                <div uk-height-viewport className="uk-flex uk-flex-middle">
                    <div className="uk-width-2-3@m uk-width-1-2@s m-auto rounded uk-overflow-hidden shadow-lg">
                        <div className="uk-child-width-1-2@m uk-grid-collapse bg-gradient-primary uk-grid log_mob" uk-grid
                            style={{ "marginTop": "7vh" }}>
                            {/* column one */}
                            <div className="uk-margin-auto-vertical uk-text-center uk-animation-scale-up p-3 uk-light">
                                <img src="assets/images/logo-light-icon.png" alt />
                                <h3 className="mb-3 mt-lg-4"> Simplest</h3>
                                <p>Share what's new and life moments with <br /> your friends. </p>
                            </div>
                            {/* column two */}
                            <div className="uk-card-default px-5 py-8">
                                <div className="mb-4 uk-text-center">
                                    <h2 className="mb-0"> Create new Account</h2>
                                    <p className="my-2">Login to manage your account.</p>
                                </div>

                                <form className="uk-child-width-1-1 uk-grid-small for_form" uk-grid onSubmit={e => onSubmit(e)}>
                                    <div>
                                        <div className="uk-form-group">
                                            <label className="uk-form-label"> Name</label>
                                            <div className="uk-position-relative w-100">
                                                <span className="uk-form-icon">
                                                    <i className="icon-feather-user" />
                                                </span>
                                                <input className="uk-input" type="text" placeholder="Full name"
                                                    name="name" value={name}
                                                    onChange={e => onChange(e)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="uk-form-group">
                                            <label className="uk-form-label"> Email</label>
                                            <div className="uk-position-relative w-100">
                                                <span className="uk-form-icon">
                                                    <i className="icon-feather-mail" />
                                                </span>
                                                <input className="uk-input" type="email" placeholder="Email Address" name="email" value={email}
                                                    onChange={e => onChange(e)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="uk-form-group">
                                            <label className="uk-form-label"> Password</label>
                                            <div className="uk-position-relative w-100">
                                                <span className="uk-form-icon">
                                                    <i className="icon-feather-lock" />
                                                </span>
                                                <input className="uk-input" type="password"
                                                    placeholder="Confirm Password" name="password" minLength="6" value={password}
                                                    onChange={e => onChange(e)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="uk-form-group">
                                            <label className="uk-form-label"> Confirm password</label>
                                            <div className="uk-position-relative w-100">
                                                <span className="uk-form-icon">
                                                    <i className="icon-feather-lock" />
                                                </span>
                                                <input className="uk-input" type="password"
                                                    placeholder="Confirm Password" name="password2" minLength="6" value={password2}
                                                    onChange={e => onChange(e)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mt-4 uk-flex-middle uk-grid-small" uk-grid>
                                            <div className="uk-width-expand@s">
                                                <p> Do you have account <a href="/login">Sign in</a></p>
                                            </div>
                                            {loading == false ?
                                                <div className="uk-width-auto@s" style={{"height": "30px"}}>
                                                    <input type="submit" className="button primary" style={{"width": "100%"}} defaultValue="Get Started" />
                                                </div> : <Loader />
                                            }
                                        </div>
                                    </div>
                                </form>
                                <Alert />


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

Register.PropTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool

};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    alert:state.alert

});
export default connect(mapStateToProps, { setAlert, register })(Register);
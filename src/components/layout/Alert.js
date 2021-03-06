import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => 
    alerts !== null && alerts.length > 0 && alerts.map(alert => (
        <div key = {alert.id} className ={`alert alert-${alert.alertType}`}>
        <span><img className="alert-img" src={`assets/images/${alert.alertType =='success-grn' ? 'success-grn.png' : 'error.png'}`} alt />{alert.msg}</span>
        </div>
    ));


Alert.PropTypes ={
    alerts: PropTypes.array.isRequired
};
const mapStateToProps = state =>({
    alerts:state.alert
});
export default connect(mapStateToProps)(Alert);
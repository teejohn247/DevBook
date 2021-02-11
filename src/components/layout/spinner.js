import React from 'react';
import spinner from './load.gif';

export default () => {
    return (
        <div style={{"height":"30px"}}>
            <img
                src={spinner}
                style={{
                    "width": "20%",
                    "marginLeft": "auto",
                    "marginRight": "auto",
                    "display": "flex"
                }}
                // style={{ width: '200px', margin: 'auto', display: 'block' }}
                alt="Loading..."
            />
        </div>
    );
};
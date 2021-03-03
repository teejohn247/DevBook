import React from 'react';
import spinner from './llo.gif';

export default () => {
    return (
        <div style={{height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"}}>
            <img
                src={spinner}
                style={{
                    width: "20%",
                    // display: "grid",
                    // placeContent:"center",
                    // alignItems:"center"
                }}
                // style={{ width: '200px', margin: 'auto', display: 'block' }}
                alt="Loading..."
            />
        </div>
    );
};
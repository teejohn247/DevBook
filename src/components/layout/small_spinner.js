import React from 'react';
import spinner from './Load_1.gif';

export default () => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"}}>
            <img
                src={spinner}
                style={{
                    width: "18%",
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
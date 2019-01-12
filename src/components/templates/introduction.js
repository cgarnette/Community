import React from 'react';

export const Introduction = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <b style={{marginTop: '1em'}}><h1>Welcome to the Community App!</h1></b>
            <b style={{marginTop: '2em'}}>
                <h3>
                    This application will help you get to know your community and keep you in the loop.
                </h3>
            </b>
            <b style={{ marginTop: '1em'}}>
                <h3>
                    For News pertaining to your community please visit the News Tab
                </h3>
            </b>
            <b style={{marginTop: '1em'}}>
                <h3>
                    For Events taking place in or near your community please visit the Events Tab
                </h3>
            </b>
            <b style={{fontSize: '1em', marginTop: '1em'}}>
                <h4>
                    For information regarding a variety of services offered 
                    in the community please visit the Services Tab (Under Development)
                </h4>
            </b>
        </div>
    );
};
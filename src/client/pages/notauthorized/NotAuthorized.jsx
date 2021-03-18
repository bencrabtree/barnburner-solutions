import React from 'react';
import './not-auth.scss';

const NotAuthorized = () => {

    return (
        <div className='non-home-div'>
            <div className='non-home-body'>
                <div className='non-home-status'>
                    <h1>401</h1>
                </div>
                <div className='non-home-message'>
                    <h1>You are not authorized to view this page.</h1>
                    <h2>Please try contacting system admin or trying with a different Google account.</h2>
                </div>
            </div>
        </div>
    )
}

export default NotAuthorized;
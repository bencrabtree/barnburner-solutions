import React from 'react';
import PropTypes from 'prop-types';
import './avatar.scss';

const Avatar = ({
    uri,
    title
}) => {
    return (
        <div className='avatar' title={title} >
            <img src={uri} alt={title} />
        </div>
    )
}

export default Avatar;
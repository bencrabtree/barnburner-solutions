import React from 'react';
import PropTypes from 'prop-types';
import './bbs-icon.scss';

const BBSIcon = ({ type, style, onClick, title }) => {

    return (
        <div className={`bbs-icon ${style}`} onClick={ onClick } title={title}>
            <div className={ type } />
        </div>
    )
}

BBSIcon.propTypes = {
    type: PropTypes.oneOf([
        'mtg-logo-black',
        'mtg-logo-green',
        'search-icon',
        'add-icon',
        'google-small',
        'default-avatar',
        'settings',
        'under-construction',
        'info'
    ]).isRequired,
    style: PropTypes.oneOf([
        "round",
        "rigid"
    ]),
    title: PropTypes.string,
    onClick: PropTypes.func
}

BBSIcon.defaultProps = {
    style: "rigid"
}

export default BBSIcon;
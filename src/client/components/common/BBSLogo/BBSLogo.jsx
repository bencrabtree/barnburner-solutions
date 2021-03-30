import React from 'react';
import PropTypes from 'prop-types';
import './bbs-logo.scss';

const BBSLogo = ({ onClick }) => {

    return (
        <div className={`bbs-logo ${ onClick ? 'clickable' : ''}`} onClick={ onClick }>
            <div className='bbs-logo-svg'><h1>barnburner</h1></div>
        </div>
    )
}

BBSLogo.propTypes = {
    onClick: PropTypes.func
}

export default BBSLogo;
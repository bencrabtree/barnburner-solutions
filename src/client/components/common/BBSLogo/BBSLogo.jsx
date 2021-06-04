import React from 'react';
import PropTypes from 'prop-types';
import './bbs-logo.scss';

const BBSLogo = ({ onClick, showText }) => {

    return (
        <div className={`bbs-logo ${ onClick ? 'clickable' : ''}`} onClick={ onClick }>
            
            <div className='bbs-logo-svg'>
                <div className='imglogo'/>
                { showText && <div className='bbs-copy'>
                    <h1>barnburner</h1>
                    {/* <h2>Solutions</h2> */}
                </div> }
            </div>
        </div>
    )
}

BBSLogo.propTypes = {
    onClick: PropTypes.func,
    showText: PropTypes.bool
}

BBSLogo.defaultProps = {
    showText: true
}

export default BBSLogo;
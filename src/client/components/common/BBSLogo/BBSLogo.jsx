import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './bbs-logo.scss';

const BBSLogo = ({ onClick, showText, transparent, textColor }) => {

    useEffect(() => {

    }, [])

    return (
        <div className={`bbs-logo ${ onClick ? 'clickable' : ''} ${textColor}`} onClick={ onClick }>
            <div className='bbs-logo-svg'>
                {/* { !imagesLoaded && <div className='i-placeholder' />} */}
                <div className={`imglogo ${transparent ? 'transparent' : ''}`}/>
                { showText && <div className='bbs-copy'>
                    <h1>barnburner</h1>
                </div> }
            </div>
        </div>
    )
}

BBSLogo.propTypes = {
    onClick: PropTypes.func,
    showText: PropTypes.bool,
    textColor: PropTypes.oneOf([
        'base',
        'accent',
        'white'
    ])
}

BBSLogo.defaultProps = {
    showText: true,
    transparent: false,
    textColor: 'base'
}

export default BBSLogo;
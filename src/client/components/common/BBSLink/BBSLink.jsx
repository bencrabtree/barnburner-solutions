import React from 'react';
import PropTypes from 'prop-types';

// wraps children in link
const BBSLink = ({ href, children }) => {
    return (
        <a className='bbs-link' href={href}>
            { children }
        </a>
    )
}

BBSLink.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export default BBSLink;
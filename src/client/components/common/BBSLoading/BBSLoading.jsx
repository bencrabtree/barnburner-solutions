import React from 'react';
import PropTypes from 'prop-types';
import './bbs-loading.scss';
import { CircularProgress } from '@material-ui/core';

const BBSLoading = ({
    size
}) => {

    return (
        <div className='bbs-loading'>
            <CircularProgress size={size} />
        </div>
    )
}

BBSLoading.propTypes = {
    size: PropTypes.string
}

BBSLoading.defaultProps = {
    size: '5rem'
}

export default BBSLoading;
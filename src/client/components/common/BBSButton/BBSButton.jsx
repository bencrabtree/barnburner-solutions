import React from 'react';
import PropTypes from 'prop-types';
import './bbs-button.scss';
import { Button } from '@material-ui/core';

const BBSButton = ({
    label,
    onClick,
    startIcon,
    endIcon,
    title,
    type,
    disabled
}) => {
    return (
        <div className={`bbs-button ${type} ${disabled ? 'disabled' : 'active'}`} onClick={onClick} title={title}>
            <Button
                startIcon={ startIcon }
                endIcon={ endIcon }
                disabled={disabled}
            >
                { label }
            </Button>
        </div>
    )
}

BBSButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    startIcon: PropTypes.node,
    endIcon: PropTypes.node,
    type: PropTypes.oneOf([
        'primary',
        'secondary',
        'tertiary'
    ]),
    disabled: PropTypes.bool
}

BBSButton.defaultProps = {
    type: 'primary',
    disabled: false
}

export default BBSButton;
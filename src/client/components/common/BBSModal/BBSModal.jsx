import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './bbs-modal.scss';
import { Modal, TextField, Chip } from '@material-ui/core';
import { useAppState } from '../../../store';

const BBSModal = ({
    isOpen,
    onClose,
    title,
    content,
    footerElts,
    errorMessage,
    disableBackdropClick
}) => {
    const { lightMode } = useAppState();
    
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            className={`bbs-modal-wrapper ${lightMode ? 'theme--default' : 'theme--dark'}`}
            disableBackdropClick={disableBackdropClick}
        >
                <div className="bbs-modal-container">
                    { title && <h1>{ title }</h1> }
                    <div className='bbs-modal-content'>
                        { content }
                    </div>
                    { footerElts && footerElts.length > 0 &&
                        <div className='bbs-modal-footer'>
                            <div className='error-box'>
                                { errorMessage }
                            </div>
                            { footerElts.map((elt, key) => (
                                <div className='bbs-modal-footer-elt' key={key}>
                                    { elt }
                                </div>
                            )) }
                        </div>
                    }
                </div>

        </Modal>
    )
}

export default BBSModal;
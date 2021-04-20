import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../common/BBSModal/bbs-modal.scss';
import './new-lead-modal.scss';
import { useAppState } from '../../store';
import { Modal } from '@material-ui/core';
import BBSButton from '../common/BBSButton/BBSButton';
import BBSLoading from '../common/BBSLoading/BBSLoading';
import BBSInput from '../common/BBSInput/BBSInput';
import BBSDropzone from '../common/BBSDropzone/BBSDropzone';
import BBSPills from '../common/BBSPills/BBSPills';
import { cloneDeep } from 'lodash';
import { getSocial, getLabel } from '../../../shared/util/constants';
import { Client } from '../../../shared/dto';
import { Tags } from '../../../shared/util/types';

const NewLeadModal = ({
    isOpen,
    onClose,
    onSubmit,
    artistName
}) => {
    /**
     * 
     */
    const [ newLead, setNewLead ] = useState(new Client());
    const [ loading, setLoading ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState();
    const [ currentTab, setCurrentTab ] = useState(0);
    const { fullRoster } = useAppState();
    const tabs = [
        { id: 0, label: "Info" },
        { id: 1, label: "Social" },
        { id: 2, label: "Tags" }
    ]

    useEffect(() => {
        let client = new Client();
        client.full_name = artistName;
        setNewLead(client);
        setCurrentTab(0);
    }, [ isOpen ]);

    /**
     * 
     */
    const handleSubmit = () => {
        if (!validateTab(0)) {
            setErrorMessage('Artist name and photo are required.')
        } else if (!validateTab(1)) {
            setErrorMessage('At least one social is required.')
        } else if (!validateTab(2)) {
            setErrorMessage('At least one artist tag is required.')
        } else {
            onSubmit(newLead);
            onClose();
        }
    }

    /**
     * 
     */
    const handleClose = () => {
        onClose();
    }

    /**
     * 
     */
    const handleInputChange = (id, value) => {
        let tempModel = cloneDeep(newLead);
        if (id === 'photo_uri') {
            console.log('photo val', value)
        }
        tempModel[id] = value;
        console.log(id, value)
        if (validateTab(currentTab)) setErrorMessage();
        setNewLead(tempModel);
    }

    //
    const validateTab = id => {
        switch (id) {
            case 0:
                return newLead.full_name && newLead.photo_uri;
            case 1:
                let isValid = false;
                getSocial.forEach(elt => {
                    if (newLead[elt]) {
                        isValid = true;
                    }
                });
                return isValid;
            case 2:
                return newLead.tags && newLead.tags.length > 0;
        }
    }

    const generateTabClassName = id => {
        let className = "tab-content";
        if (currentTab === id) className += " active";
        if (!validateTab(id)) className += " invalid";
        return className;
    }

    const handleTabClick = id => {
        setCurrentTab(id)
    }

    const generateTitle = id => {
        return validateTab(id) ? `Artist ${tabs[id].label}` : 'This tab contains invalid or incomplete information.';
    }

    const renderTabs = () => {
        return (
            <div className='new-lead-tabs'>
                { tabs.map((tab, key) => {
                    return (
                        <div key={key} className={generateTabClassName(tab.id)} onClick={ () => handleTabClick(tab.id) } title={generateTitle(tab.id)}>
                            { tab.label }
                        </div>
                    )
                })}
            </div>
        )
    }

    const renderContent = () => {
        if (loading) {
            return (
                <div className="new-lead-modal-content">
                    <BBSLoading />
                </div>
            )
        } else {
            switch (currentTab) {
                case 1:
                    return (
                        <div className='new-lead-form two-columns'>
                            { getSocial.map((id, key) => (
                                <BBSInput
                                    id={id} key={key}
                                    value={newLead[id]}
                                    label={ getLabel[id] }
                                    onChange={ handleInputChange }
                                />
                            ))}
                        </div>
                    );
                case 2:
                    return (
                        <div className='new-lead-form'>
                            <BBSPills
                                id="tags"
                                options={Tags}
                                onChange={ handleInputChange }
                                defaultValue={newLead.tags}
                                placeholder="Artist Tags"
                            />
                            <BBSInput
                                id="notes"
                                type='textarea'
                                label="Notes"
                                rows="10"
                                value={newLead.notes}
                                onChange={ handleInputChange }
                            />
                        </div>
                    )
                case 0:
                default:
                    return (
                        <div className='new-lead-form'>
                            <BBSInput
                                id='full_name'
                                label="Artist Name"
                                value={newLead.full_name}
                                onChange={ handleInputChange }
                            />
                            <BBSInput
                                id='contact'
                                label="Contact"
                                value={newLead.contact}
                                onChange={ handleInputChange }
                            />
                            <BBSInput
                                id='description'
                                label="Description"
                                type="textarea"
                                value={newLead.description}
                                onChange={ handleInputChange }
                            />
                            <BBSDropzone
                                id='photo_uri'
                                message="Drag or Select Artist Photo"
                                maxFileCount={1}
                                onChange={ handleInputChange }
                            />
                        </div>
                    );
            }
        }
    }

    return (
            <Modal
                open={isOpen}
                onClose={onClose}
                className='bbs-modal-wrapper'
                disableBackdropClick
            >
                <div className="newlead-content bbs-modal-content">
                    { renderTabs() }
                    { renderContent() }
                    <div className='bbs-modal-footer'>
                        <div className='error-box'>
                            { errorMessage }
                        </div>
                        <BBSButton label="Cancel" onClick={handleClose} title="Abandon new lead creation" />
                        <BBSButton label="Submit" onClick={handleSubmit} title="Submit new lead" />
                    </div>
                </div>
            </Modal>
    )
}

NewLeadModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    artistName: PropTypes.string
}

NewLeadModal.defaultProps = {
    artistName: ""
}

export default NewLeadModal;
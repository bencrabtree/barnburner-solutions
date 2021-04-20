import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BBSModal from '../../../components/common/BBSModal/BBSModal';
import BBSButton from '../../../components/common/BBSButton/BBSButton';
import BBSInput from '../../../components/common/BBSInput/BBSInput';
import BBSPills from '../../../components/common/BBSPills/BBSPills';
import { clientStatus } from '../../../../shared/util/constants';
import { Tags } from '../../../../shared/util/types';
import { http } from '../../../util/api';
import { getArtistImageSrc } from '../../../util/constants';
import { artistService } from '../../../services/';
import BBSDropzone from '../../../components/common/BBSDropzone/BBSDropzone';

const EditArtistModal = ({
    artist,
    isOpen,
    onClose
}) => {
    const [ formValues, setFormValues ] = useState(artist);
    const [ errorMessage, setErrorMessage ] = useState();

    useEffect(() => {
        setFormValues(artist)
    }, [ artist ]);

    const handleClose = () => {
        onClose();
    }

    const handlePhotoSelection = async (id, value) => {
        setErrorMessage();
        await artistService.uploadPhoto(artist.id, value);
    }

    const handlePhotoError = (message) => {
        setErrorMessage(message);
    }

    const handleSubmit = async () => {
        try {
            const { data, status } = await http.put(`/roster/${artist.id}`, {
                full_name: formValues.full_name,
                tags: formValues.tags,
                status: formValues.status
            });

            if (data && status === 200) {
                console.log('Update Artist: Success:', 200);
                onClose();
            } else {
                console.log('Update Artist: Bad Response:', status)
            }
        } catch (error) {
            console.log('Update Artist:', error);
        }
    }

    const handleChange = (id, value) => {
        let tempValues = formValues;
        tempValues[id] = value;
        setFormValues(tempValues);
    }

    const renderArtistContent = () => {
        console.log(formValues)
        return (
            <div className="edit-artist-content">
                <div className='form'>
                    <h2>Artist Info</h2>
                    <div className='form-content'>
                        <div className='form-column'>
                            <img src={ getArtistImageSrc(formValues.photo?.file_path) } />
                            <BBSDropzone
                                id="file_path"
                                message="Select a new photo"
                                maxFileCount={1}
                                onChange={ handlePhotoSelection }
                                onError={ handlePhotoError }
                            />
                            <p>Max file size is 5mb</p>
                        </div>
                        <div className='form-column'>
                            <BBSInput
                                id="full_name"
                                value={formValues.full_name}
                                label="Artist Name"
                                onChange={ handleChange }
                            />
                            <div className="bbs-select">
                                <label for="status">Change Status:</label>
                                <select id="status" value={formValues.status} onChange={(e) => handleChange(e.target.id, e.target.value)}>
                                    { clientStatus.map((status, key) => {
                                        return (
                                            <option key={key} id={status.id} value={ status.id }>{ status.label }</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className='form'>
                    <h2>Artist Tags</h2>
                    <div className='form-content tags'>
                        <BBSPills
                            options={Tags}
                            id="tags"
                            onChange={ handleChange }
                            defaultValue={formValues.tags}
                            placeholder="Artist Tags"
                            disabled={ false }
                        />
                    </div>
                </div>
            </div>
        )
    }

    const renderFooter = () => {
        return [
            <BBSButton
                label="Save"
                onClick={ handleSubmit }
            />,
            <BBSButton
                label="Cancel"
                onClick={ handleClose }
            />
        ]
    }

    return (
        <div className="edit-artist-modal">
            <BBSModal
                isOpen={isOpen}
                onClose={ handleClose }
                title="Edit Artist"
                content={renderArtistContent()}
                footerElts={renderFooter()}
                disableBackdropClick={true}
                errorMessage={errorMessage}
            />
        </div>
    )
}

export default EditArtistModal;
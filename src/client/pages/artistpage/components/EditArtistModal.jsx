import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BBSModal from '../../../components/common/BBSModal/BBSModal';
import BBSButton from '../../../components/common/BBSButton/BBSButton';
import BBSInput from '../../../components/common/BBSInput/BBSInput';
import BBSPills from '../../../components/common/BBSPills/BBSPills';
import { clientStatus } from '../../../../shared/util/constants';
import { Tags } from '../../../../shared/util/types';
import { http } from '../../../util/api';

const EditArtistModal = ({
    artist,
    isOpen,
    onClose
}) => {
    const [ formValues, setFormValues ] = useState(artist);

    useEffect(() => {
        setFormValues(artist)
    }, [ artist ]);

    const handleClose = () => {
        onClose();
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
        console.log(id, value)
        let tempValues = formValues;
        tempValues[id] = value;
        setFormValues(tempValues);
        console.log(tempValues)
    }

    const renderArtistContent = () => {
        console.log(formValues)
        return (
            <div className="edit-artist-content">
                <div className='form'>
                    <h2>Artist Info</h2>
                    <div className='form-content'>
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
            />
        </div>
    )
}

export default EditArtistModal;
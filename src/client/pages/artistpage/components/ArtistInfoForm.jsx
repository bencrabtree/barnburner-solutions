import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BBSInput from '../../../components/common/BBSInput/BBSInput';
import { getLabel, getSocial } from '../../../../shared/util/constants';

const ArtistInfoForm = ({
    artistInfo,
    accountOwners,
    disabled
}) => {
    const [ formInfo, setFormInfo ] = useState({

    });

    useEffect(() => {

    }, []);

    const handleInputChange = (id, value) => {

    }

    const generateInputValues = () => {
        return ['manager_name', 'manager_email', 'manager_phone', 'account_owners'].map((elt, key) => {
            return (
                <BBSInput
                    id={ elt }
                    label={ getLabel(elt) }
                    value={ formInfo[elt] }
                    onChange={ handleInputChange }
                    isDisabled={ disabled }
                />
            )
        })
    }

    const generateSocialValues = () => {
        return getSocial().map((elt, key) => {
            return (
                <BBSInput
                    id={ elt }
                    label={ getLabel(elt) }
                    value={ formInfo[elt] }
                    onChange={ handleInputChange }
                    isDisabled={ disabled }
                />
            )
        })
    }

    return (
        <div className='artist-info-form'>
            <div className='form-content'>
                { generateInputValues() }
            </div>
            <div className='form-content'>
                <h2>Socials</h2>
                { generateSocialValues() }
            </div>
        </div>
    )
}

ArtistInfoForm.propTypes = {
    artistInfo: PropTypes.shape({

    })
}

export default ArtistInfoForm;
import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import BBSInput from '../../../components/common/BBSInput/BBSInput';
import BBSPills from '../../../components/common/BBSPills/BBSPills';
import BBSLoading from '../../../components/common/BBSLoading/BBSLoading';
import { getLabel, getSocial } from '../../../../shared/util/constants';
import { useAppState } from '../../../store';
import { http } from '../../../util/api';
import { clone } from 'lodash';
import { isDeleteExpression } from 'typescript';

const ArtistInfoForm = forwardRef(({
    artistName,
    disabled
}, ref) => {
    const { allTags, allUsers } = useAppState();
    const [ loading, setLoading ] = useState(true);
    const [ artist, setArtist ] = useState({});

    useImperativeHandle(ref, () => ({
        getNewInfo() {
            return artist;
        }
    }));

    useEffect(() => {
        fillArtistInfo();
    }, []);

    const fillArtistInfo = async () => {
        try {
            const { data, status } = await http.get(`/roster/${artistName}`);
            if (data && status === 200) {
                setArtist(data);
                setLoading(false);
                console.log('FillArtistInfo: Success:', status);
            } else {
                console.log('FillArtistInfo: BadResponse:', status)
            }
        } catch (error) {
            console.log('FillArtistInfo:', error);
        }
    }

    const handleInputChange = (id, value) => {
        let tempArtist = clone(artist);
        tempArtist[id] = value;
        setArtist(tempArtist);
    }

    const generateInputValues = () => {
        return ['manager_name', 'manager_email', 'manager_phone', 'account_owners'].map((elt, key) => {
            if (elt === 'account_owners') {
                return (
                    <BBSPills
                        id={elt}
                        options={allUsers.map(x => x.email)}
                        defaultValue={artist[elt] || []}
                        onChange={ handleInputChange }
                        placeholder="Account Owners"
                        disabled={ disabled }
                        label={true}
                    />
                )
            }
            return (
                <BBSInput
                    key={key}
                    id={ elt }
                    label={ getLabel[elt] }
                    value={ artist[elt] }
                    onChange={ handleInputChange }
                    isDisabled={ disabled }
                />
            )
        })
    }

    const generateSocialValues = () => {
        return getSocial.map((elt, key) => {
            return (
                <BBSInput key={key}
                    id={ elt }
                    label={ getLabel[elt] }
                    value={ artist[elt] }
                    onChange={ handleInputChange }
                    isDisabled={ disabled }
                />
            )
        })
    }

    const renderArtistInfoForm = () => {
        if (loading) {
            return (
                <div className='artist-info-form'>
                    <BBSLoading />
                </div>
            )
        } else {
            return (
                <div className='artist-info-form'>
                    <div className='form-content columns general'>
                        { generateInputValues() }
                    </div>
                    <div className='form'>
                        <h2>Socials</h2>
                        <div className='form-content columns socials'>
                            { generateSocialValues() }
                        </div>
                    </div>
                    <div className='form'>
                        <h2>Artist Tags</h2>
                        <div className='form-content tags'>
                            <BBSPills
                                options={allTags}
                                onChange={ handleInputChange }
                                defaultValue={artist.tags}
                                placeholder="Artist Tags"
                                disabled={ disabled }
                            />
                        </div>

                    </div>
                </div>
            )
        }
    }

    return renderArtistInfoForm();

});

ArtistInfoForm.propTypes = {
    artistName: PropTypes.string.isRequired
}

export default ArtistInfoForm;
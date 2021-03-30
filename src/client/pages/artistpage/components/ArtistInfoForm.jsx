import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import BBSInput from '../../../components/common/BBSInput/BBSInput';
import BBSPills from '../../../components/common/BBSPills/BBSPills';
import BBSLoading from '../../../components/common/BBSLoading/BBSLoading';
import { getLabel, getSocial } from '../../../../shared/util/constants';
import { useAppState } from '../../../store';
import { http } from '../../../util/api';
import { clone } from 'lodash';

const ArtistInfoForm = forwardRef(({
    info,
    disabled
}, ref) => {
    const { allTags, allUsers } = useAppState();
    const [ loading, setLoading ] = useState(info.loading);
    const [ artist, setArtist ] = useState(info.data);

    useImperativeHandle(ref, () => ({
        getNewInfo() {
            console.log(artist)
            return artist;
        }
    }));

    useEffect(() => {
        setLoading(info.loading);
        setArtist(info.data)
    }, [ info ])

    const handleInputChange = (id, value) => {
        let tempArtist = clone(artist);
        tempArtist[id] = value;
        console.log(id, value)
        setArtist(tempArtist);
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
                    <div className='form'>
                        <h2>About</h2>
                        <div className='form-content about'>
                            <BBSInput
                                id="description"
                                label={ getLabel["description"] }
                                value={ artist.description }
                                onChange={ handleInputChange }
                                isDisabled={ disabled }
                                type="textarea"
                                rows={5}
                            />
                        </div>
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
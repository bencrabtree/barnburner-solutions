import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useAppState } from '../../../store';
import { getArtistImageSrc } from '../../../util/constants';
import BBSButton from '../../../components/common/BBSButton/BBSButton';

const ArtistDetails = ({
    artistId
}) => {
    const history = useHistory();
    const { getArtistById } = useAppState();
    const [ artist, setArtist ] = useState();

    useEffect(() => {
        setArtist(getArtistById(artistId));
    }, [artistId]);

    const handleArtistClick = () => {
        history.push(`/artists/${encodeURIComponent(artist.full_name)}`);
        history.go(0);
    }

    const renderContent = () => {
        if (artist) {
            return (
                <div className="artist-header">
                    <div className='artist-image-wrapper'>
                        <img src={ getArtistImageSrc(artist.photo?.file_path) } />
                    </div>
                    <h1 className='artist-name-link' onClick={handleArtistClick} title={artist.full_name}>{ artist.full_name }</h1>
                </div>
            )
        } else {
            return (
                <h1>Select an artist to view their profile</h1>
            )
        }
    }

    return (
        <div className='artist-details'>
            { renderContent() }
        </div>
    )
}

export default ArtistDetails;
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './artist-card.scss';
import { useAppState } from '../../store';
import { ArtistStatus } from '../../../shared/util/types';
import { getArtistImageSrc } from '../../util/constants';

const ArtistCard = ({
    artist,
}) => {
    const { useProfile, artistRelationships } = useAppState();
    const history = useHistory();

    const handleArtistSelection = (artist) => {
        history.push(`/artists/${encodeURIComponent(artist.full_name)}`);
        history.go(0);
    }

    return (
        <div className={`artist-card card ${artist.status}`} onClick={() => handleArtistSelection(artist) }>
            <img src={ getArtistImageSrc(artist.artist_photo) } />
            <div className="artist-card-content">
                <div className="artist-card-extras">
                    <h2 className="normal-weight capitalize">{ artist.relation }</h2>
                    <span className={`artist-status-pill ${artist.status}`}>
                        { artist.status }
                    </span>
                </div>
                <h1 className='artist-name'>{ artist.full_name }</h1>
                <div className="artist-bites">

                </div>
            </div>
        </div>
    )
}

export default ArtistCard;
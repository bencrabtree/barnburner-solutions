import React from 'react';
import PropTypes from 'prop-types';
import './artist-card.scss';
import { useAppState } from '../../store';
import { ArtistStatus } from '../../../shared/util/types';

const ArtistCard = ({
    artist,
    status
}) => {
    const { useProfile, artistRelationships } = useAppState();

    const renderSignedArtist = () => {
        return (
            <div className={`artist-card-content ${artist.status}`}>
                <img src={ artist.artist_photo } />
                <div className='artist-card-info'>
                    <span className={`artist-status-pill ${artist.status}`}>
                        { artist.status }
                    </span>
                    <div className="">
                        <h1>{ artist.full_name }</h1>
                    </div>
                    <div className="uppercase">
                        <h2>{ artist.relation }</h2>
                    </div>
                </div>
            </div>
        )
    }

    const renderUnsignedArtist = () => {
        return (
            <div className='artist-card-content'>
                
            </div>
        )
    }

    return (
        <div className="artist-card">
            { status === ArtistStatus.Signed ? renderSignedArtist() : renderUnsignedArtist() }
        </div>
    )
}

export default ArtistCard;
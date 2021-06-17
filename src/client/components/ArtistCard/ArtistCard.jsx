import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './artist-card.scss';
import { useAppState } from '../../store';
import { ArtistStatus, UserArtistRelation } from '../../../shared/util/types';
import { getArtistImageSrc } from '../../util/constants';
import HeartIcon from '../HeartIcon/HeartIcon';

const ArtistCard = ({
    artistId,
    photo_path,
    onClick,
    className
}) => {
    const { getArtistRelationship, getArtistById } = useAppState();
    const [ artist, setArtist ] = useState();
    const history = useHistory();

    useEffect(() => {
        setArtist(getArtistById(artistId));
    }, [artistId])

    const handleArtistSelection = () => {
        onClick(artistId);
    }

    const renderContent = () => {
        if (artist) {
            return (
                <div className={`artist-card card ${artist.status} ${className}`} onClick={handleArtistSelection}>
                    <div className='artist-image-wrapper'>
                        {/* <img src={ getArtistImageSrc(photo_path) } /> */}
                    </div>
                    <div className="artist-card-content">
                        <h1 className='artist-name'>{ artist.full_name }</h1>
                        <div className="artist-card-extras">
                            <span className={`artist-status-pill ${artist.status}`}>
                                { artist.status }
                            </span>
                        </div>
                        {/* <div className="artist-bites">
                            { artist.tags.map((tag, key) => {
                                return (
                                    <div className='pill' key={key}>
                                        { tag }
                                    </div>
                                )
                            })}
                        </div> */}
                    </div>
                </div>
            )
        } else {
            return (
                <div />
            )
        }
    }

    return renderContent();

}

ArtistCard.defaultProps = {
    onClick: () => {
        history.push(`/app/roster/${encodeURIComponent(artist.full_name)}`);
        history.go(0);
    }
}

export default ArtistCard;
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './artist-card.scss';
import { useAppState } from '../../store';
import { ArtistStatus, UserArtistRelation } from '../../../shared/util/types';
import { getArtistImageSrc } from '../../util/constants';
import HeartIcon from '../HeartIcon/HeartIcon';

const ArtistCard = ({
    artist,
}) => {
    const { useProfile, artistRelationships } = useAppState();
    const [ data, setData ] = useState(artist);
    const history = useHistory();

    useEffect(() => {
        setData(artist);
    }, [artist])

    const handleArtistSelection = () => {
        history.push(`/artists/${encodeURIComponent(data.full_name)}`);
        history.go(0);
    }

    return (
        <div className={`artist-card card ${data.status}`} onClick={handleArtistSelection}>
            <div className='artist-photo-wrap'>
                <img src={ getArtistImageSrc(data.artist_photo) } />
            </div>
            <div className="artist-card-content">
                <div className="artist-card-extras">
                    { data.relation === UserArtistRelation.Favorited ?
                        <HeartIcon isLiked={true} /> :
                        <h2 className="normal-weight capitalize">{ data.relation }</h2>
                    }
                    <span className={`artist-status-pill ${data.status}`}>
                        { data.status }
                    </span>
                </div>
                <h1 className='artist-name'>{ data.full_name }</h1>
                <div className="artist-bites">
                    { data.tags.map((tag, key) => {
                        return (
                            <div className='pill' key={key}>
                                { tag }
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ArtistCard;
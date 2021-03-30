import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAppState } from '../../store';
import './my-roster.scss';
import { UserArtistRelation } from '../../../shared/util/types';
import { getArtistImageSrc } from '../../util/constants';

const MyRoster = ({

}) => {
    const { artistRelationships } = useAppState();
    const history = useHistory();

    const handleArtistSelection = (artist) => {
        history.push(`/artists/${encodeURIComponent(artist.full_name)}`);
        history.go(0);
    }

    const generateArtistCards = () => {
        return artistRelationships.map((artist, key) => {
            return (
                <div className={`artist-card card ${artist.status}`} key={key}>
                    <img src={ getArtistImageSrc(artist.artist_photo) } />
                    <div className="artist-card-content">
                        <div className="artist-card-extras">
                            <h2 className="normal-weight capitalize">{ artist.relation }</h2>
                            <span className={`artist-status-pill ${artist.status}`}>
                                { artist.status }
                            </span>
                        </div>
                        <h1 className='artist-name' onClick={() => handleArtistSelection(artist) }>{ artist.full_name }</h1>
                        <div className="artist-bites">

                        </div>
                    </div>
                </div>
            )
        })
    }

    /**
     * Filters
     * 
     * Pills with Artist Status, Pills with Artist Relation, Pills with Artist Tags
     */
    return (
        <div className="my-roster-container">
            <div className="roster-filters card">
                <h1>Filters</h1>
            </div>
            <div className="roster-content">
                <div className="roster-head card">
                    <h1>Roster</h1>
                </div>
                <div className="roster-cards">
                    { generateArtistCards() }
                    { generateArtistCards() }
                    { generateArtistCards() }
                    { generateArtistCards() }
                    { generateArtistCards() }
                    { generateArtistCards() }
                </div>
            </div>
        </div>
    )
}

export default MyRoster;
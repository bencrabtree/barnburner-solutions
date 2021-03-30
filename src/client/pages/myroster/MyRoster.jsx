import React from 'react';
import { useAppState } from '../../store';
import './my-roster.scss';
import { UserArtistRelation } from '../../../shared/util/types';
import ArtistCard from '../../components/ArtistCard/ArtistCard';

const MyRoster = ({

}) => {
    const { artistRelationships } = useAppState();
    //const [ ]

    const generateArtistCards = () => {
        return artistRelationships.map((artist, key) => {
            return (
                <ArtistCard key={key} artist={artist} />
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
            <div className="roster-filters card-rounded">
                <h1>Filters</h1>
            </div>
            <div className="roster-content">
                <div className="roster-head card-rounded">
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
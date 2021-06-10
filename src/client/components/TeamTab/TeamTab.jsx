import React, { useState } from 'react';
import './team-tab.scss';
import TeamCard from './components/TeamCard';
import { useAppState } from '../../store';
import { UserArtistRelation } from '../../../shared/util/types';

const TeamTab = ({
    info
}) => {
    const [ loading, setLoading ] = useState(info.loading);
    const [ team, setTeam ] = useState(info.data);
    const { userProfile } = useAppState();

    const renderTeam = () => {
        let splitTeam = team.reduce((acc, elt) => {
            if (elt.relation === UserArtistRelation.Favorited) {
                acc.favorited.push(elt)
            } else if (elt.relation === UserArtistRelation.Owner) {
                acc.owner.push(elt);
            }
            return acc;
        }, { favorited: [], owner: []});
        return (
            <div className="team-tab-container">
                <div className="team-owners">
                    <h1>Owners</h1>
                    <div className='card-container'>
                        { splitTeam.owner.map((elt, key) => {
                            return (
                                <TeamCard key={key}
                                    photo={elt.user_photo}
                                    name={elt.full_name}
                                    email={elt.email}
                                    role={elt.relation}
                                />
                            )
                        }) }
                    </div>
                </div>
                <div className="team-favorites">
                    <h1>Favorited</h1>
                    <div className='card-container'>
                        { splitTeam.favorited.map((elt, key) => {
                            return (
                                <TeamCard key={key}
                                    photo={elt.user_photo}
                                    name={elt.full_name}
                                    email={elt.email}
                                    role={elt.relation}
                                />
                            )
                        }) } 
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="team-tab">
            { renderTeam() }
        </div>
    )
}

export default TeamTab;
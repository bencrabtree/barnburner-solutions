import React, { useState } from 'react';
import { getArtistImageSrc, toReadableDate } from '../../../util/constants';
import ProgressStepper from '../../../components/common/ProgressStepper/ProgressStepper';
import BBSButton from '../../../components/common/BBSButton/BBSButton';
import { clientStatus } from '../../../../shared/util/constants';
import BBSIcon from '../../../components/common/BBSIcon/BBSIcon';
import { useAppState } from '../../../store';
import { http } from '../../../util/api';
import { UserArtistRelation } from '../../../../shared/util/types';

const ArtistHeader = ({
    artist,
    updateArtist,
    relationship
}) => {
    const { userProfile, artistRelationships, setArtistRelationships } = useAppState();

    const handleInfoSelect = () => {
        alert(`Selected ${artist.full_name}`)
    }

    const handleStepSelect = (selectedStep) => {
        if (artist.account_owners?.find(x => x === userProfile.email)) {
            updateStep(selectedStep);
        } else {
            alert('You do not have permissions to update the status of this lead. Please contact an account owner or system administrator.')
        }
    }

    const updateStep = async (step) => {
        try {
            const { data, status } = await http.put(`/roster/${artist.full_name}`, { ...artist, status: step.id });
            if (data && status === 200) {
                const message = `${artist.full_name}'s lead status is now ${step.label}`;
                alert(message);
                updateArtist(data);
                console.log('StepChange: Success:', status);
            } else {
                alert('Unable to update lead status. Please contact a system administrator.');
                console.log('StepChange: BadResponse:', status);
            }
        } catch (error) {
            console.log('StepChange:', error);
        }
    }

    const onFollowToggle = async () => {
        switch (relationship) {
            case UserArtistRelation.None:
                try {
                    const { data, status } = await http.post('/roster/favorite', {
                        userId: userProfile.id,
                        artistId: artist.id
                    });
        
                    if (data && status === 200) {
                        setArtistRelationships(data);
                        console.log('Favorited: Success:', status)
                    } else {
                        console.log('Favorited: BadResponse:', status)
                    }
                } catch (error) {
                    console.log('Favorited:', error)
                }
                break;
            case UserArtistRelation.Favorited:
                try {
                    const { data, status } = await http.post('/roster/unfavorite', {
                        userId: userProfile.id,
                        artistId: artist.id
                    });
        
                    if (data && status === 200) {
                        setArtistRelationships(data);
                        console.log('unfavorite: Success:', status)
                    } else {
                        console.log('unfavorite: BadResponse:', status)
                    }
                } catch (error) {
                    console.log('unfavorite:', error)
                }
                break;
            case UserArtistRelation.Owner:
            default:
                alert('You are the account owner of this artist. You cannot unfollow')
                break;
        }
    }

    const generateFollowBtn = () => {
        // make this filled in/empty heart ( or something else idk )
        // if owner, don't let them unfollow (x when hovering with title explaining)
        if (artistRelationships.find(x => x.id = artist.id)) {
            return (
                <BBSButton
                    label="Unfollow -"
                    type="secondary"
                    onClick={ onFollowToggle }
                />
            );
        } else {
            return (
                <BBSButton
                    label="Follow +"
                    type="secondary"
                    onClick={ onFollowToggle }
                />
            );
        }
    }

    const renderArtistStats = () => {
        const stats = [
            { id: 'created', label: "Created Date", value: toReadableDate(artist.created_on), nullValue: 'N/A' },
            { id: 'updated', label: "Last Update", value: toReadableDate(artist.updated_on), nullValue: 'N/A' },
            { id: 'relationship', label: "My Relationship", value: relationship, nullValue: 'N/A' }            
        ];

        return stats.map((elt) => {
            return (
                <div className='artist-stat' id={ elt.id }>
                    <h4 className='artist-stat-label'>{ elt.label }</h4>
                    <h3 className='artist-stat-value'>{ elt.value || elt.nullValue }</h3>
                </div>
            )
        })
    }

    return (
        <div className={`artist-header card ${artist.status}`}>
            <div className="top-content">
                <div className='artist-profile'>
                    <img className='artist-picture'
                        src={ getArtistImageSrc(artist.photo?.file_path) }
                    />
                    <div className='artist-name'>
                        <div className='artist-name-title'>
                            <h2>Artist</h2>
                            <span className={`artist-status-pill ${artist.status}`}>
                                { artist.status }
                            </span>
                        </div>
                        <span>
                            <h1>{ artist.full_name }</h1>
                            {/* <BBSIcon
                                type='info'
                                style='round'
                                onClick={ handleInfoSelect }
                                title="More info"
                            /> */}
                        </span>
                    </div>
                </div>
                <div className='divider-bar' />
                <div className='lead-status'>
                    { renderArtistStats() }
                </div>
                <div className='lead-actions'>
                        { generateFollowBtn() }
                        <BBSButton
                            label="Edit"
                            type="primary"
                            onClick={ () => {} }
                        />
                        <BBSButton
                            label="Public View"
                            type="tertiary"
                            onClick={ () => {} }
                        />
                </div>
            </div>
        </div>
    )
}

export default ArtistHeader;
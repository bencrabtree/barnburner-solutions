import React, { useState } from 'react';
import { getArtistImageSrc, toReadableDate } from '../../../util/constants';
import ProgressStepper from '../../../components/common/ProgressStepper/ProgressStepper';
import BBSButton from '../../../components/common/BBSButton/BBSButton';
import { clientStatus } from '../../../../shared/util/constants';
import HeartIcon from '../../../components/HeartIcon/HeartIcon';
import { useAppState } from '../../../store';
import { http } from '../../../util/api';
import { UserArtistRelation } from '../../../../shared/util/types';
import EditArtistModal from './EditArtistModal';

const ArtistHeader = ({
    artist,
    updateArtist,
    relationship
}) => {
    const { userProfile, artistRelationships, setArtistRelationships } = useAppState();
    const [ editArtistModal, setEditArtistModal ] = useState(false);

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

    const openEditArtistModal = () => {
        setEditArtistModal(true);
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
            case UserArtistRelation.Favorited:
                try {
                    const { data, status } = await http.post('/roster/unfavorite', {
                        userId: userProfile.id,
                        artistId: artist.id
                    });
        
                    if (data && status === 200) {
                        console.log(data)
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
                alert('You are the account owner of this artist. You cannot unfollow')
                break;

            case UserArtistRelation.None:
            default:
                try {
                    const { data, status } = await http.post('/roster/favorite', {
                        userId: userProfile.id,
                        artistId: artist.id
                    });
        
                    if (data && status === 200) {
                        console.log(data)
                        setArtistRelationships(data);
                        console.log('Favorited: Success:', status)
                    } else {
                        console.log('Favorited: BadResponse:', status)
                    }
                } catch (error) {
                    console.log('Favorited:', error)
                }
                break;
        }
    }

    const generateFollowBtn = () => {
        // make this filled in/empty heart ( or something else idk )
        // if owner, don't let them unfollow (x when hovering with title explaining)
        return (
            <HeartIcon
                disabled={relationship === UserArtistRelation.Owner}
                isLiked={relationship != UserArtistRelation.None}
                onClick={ onFollowToggle }
            />
        );
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
                            onClick={ openEditArtistModal }
                        />
                        <BBSButton
                            label="Public View"
                            type="tertiary"
                            onClick={ () => {} }
                        />
                </div>
            </div>
            { editArtistModal && <EditArtistModal
                isOpen={ editArtistModal }
                onClose={ () => setEditArtistModal(false) }
                artist={artist}
            /> }
        </div>
    )
}

export default ArtistHeader;
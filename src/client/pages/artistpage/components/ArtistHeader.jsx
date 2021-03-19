import React from 'react';
import { getArtistImageSrc, toReadableDate } from '../../../util/constants';
import ProgressStepper from '../../../components/common/ProgressStepper/ProgressStepper';
import BBSButton from '../../../components/common/BBSButton/BBSButton';
import { clientStatus } from '../../../../shared/util/constants';
import BBSIcon from '../../../components/common/BBSIcon/BBSIcon';
import { useAppState } from '../../../store';
import { http } from '../../../util/api';

const ArtistHeader = ({
    artist,
    onWatchClick,
    onEditClick,
    onUpdateClick,
    updateArtist
}) => {
    const { userProfile } = useAppState();

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

    return (
        <div className="artist-header card">
            <div className="top-content">
                <div className='artist-profile'>
                    <img className='artist-picture'
                        src={ getArtistImageSrc(artist.photo_uri) }
                    />
                    <div className='artist-name'>
                        <h2>Artist</h2>
                        <span>
                            <h1>{ artist.full_name }</h1>
                            <BBSIcon
                                type='info'
                                style='round'
                                onClick={ handleInfoSelect }
                                title="More info"
                            />
                        </span>
                    </div>
                </div>
                <div className='divider-bar' />
                <div className='lead-status'>
                    <ProgressStepper
                        steps={clientStatus}
                        currentStep={ artist.status }
                        onStepClick={ handleStepSelect }
                    />
                </div>
                <div className='lead-actions'>
                        <BBSButton
                            label="+ Watch"
                            type="secondary"
                            onClick={ onWatchClick }
                        />
                        <BBSButton
                            label="Edit"
                            type="primary"
                            onClick={ onEditClick }
                        />
                        <BBSButton
                            label="Update"
                            type="tertiary"
                            onClick={ onUpdateClick }
                        />
                </div>
            </div>
            <div className='bottom-content'>
                <div className='artist-stat'>
                    <h4 className='artist-stat-label'>Current Status</h4>
                    <h3 className='artist-stat-value'>{ clientStatus.find(x => x.id === artist.status)?.label || 'N/A' }</h3>
                </div>
                <div className='artist-stat'>
                    <h4 className='artist-stat-label'>Created Date</h4>
                    <h3 className='artist-stat-value'>{ toReadableDate(artist.created_on) }</h3>
                </div>
                <div className='artist-stat'>
                    <h4 className='artist-stat-label'>Last Update</h4>
                    <h3 className='artist-stat-value'>{ toReadableDate(artist.updated_on) } </h3>
                </div>
                <div className='artist-stat'>
                    <h4 className='artist-stat-label'>Account Owner</h4>
                    <h3 className='artist-stat-value'>{artist.account_owners}</h3>
                </div>
            </div>
        </div>
    )
}

export default ArtistHeader;
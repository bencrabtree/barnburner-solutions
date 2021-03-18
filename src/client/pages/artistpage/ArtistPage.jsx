import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './artist-page.scss';
import BBSButton from '../../components/common/BBSButton/BBSButton';
import BBSLoading from '../../components/common/BBSLoading/BBSLoading';
import { artistService } from '../../services';
import { useAppState } from '../../store';
import TabCard from '../../components/TabCard/TabCard';
import ArtistHeader from './components/ArtistHeader';

const ArtistPage = ({
    match
}) => {
    const { fullRoster } = useAppState();
    const [ selectedArtist, setSelectedArtist ] = useState();
    const [ selectedTab, setSelectedTab ] = useState('account');
    const [ isEditing, setIsEditing ] = useState(false);

    useEffect(() => {
        changeSelectedArtist();
    }, [ match.params.artistName ]);

    const changeSelectedArtist = async () => {
        if (
            match.params.artistName && 
            fullRoster.find(x => x.full_name === match.params.artistName)
        ) {
            let artist = await artistService.getArtist(match.params.artistName);
            setSelectedArtist(artist);
        }
    }

    const handleWatchSelect = () => {
        alert(`You are now watching ${selectedArtist.full_name}`)
    }

    const handleEditSelect = () => {
        alert(`You are now editing ${selectedArtist.full_name}'s profile`);
        setSelectedTab('account');
        setIsEditing(true);
    }

    const handleUpdateSelect = () => {
        alert(`You are now updating the lead status of ${selectedArtist.full_name}`)
    }

    const renderArtistHeader = () => {
        return (
            <ArtistHeader
                artist={selectedArtist}
                onEditClick={handleEditSelect}
                onUpdateClick={handleUpdateSelect}
                onWatchClick={handleWatchSelect}
            />
        )
    }

    const renderArtistContent = () => {
        return (
            <TabCard
                tabs={[
                    { id: 'account', label: 'Account', onClick: () => setSelectedTab('account') },
                    { id: 'files', label: 'Files', onClick: () => setSelectedTab('files') },
                    { id: 'team', label: 'Team', onClick: () => setSelectedTab('team') },
                    { id: 'dash', label: 'Dashboard', onClick: () => setSelectedTab('dash') }
                ]}
                activeTab={selectedTab}
            >
                Hey My Man { selectedTab }
            </TabCard>
        )
    }

    const renderArtistPosts = () => {
        return (
            <TabCard
                tabs={[
                    { id: 'posts', label: 'Posts' },
                    { id: 'timeline', label: 'Timeline' },
                ]}
                activeTab='posts'
            >
                Notify team members of any updates to the lead. Post a message to all agents or just the lead agents for this act.
            </TabCard>
        )
    }

    const renderArtistPage = () => {
        if (!selectedArtist) {
            return <BBSLoading />
        } else {
            return (
                <div className="artist-page">
                    { renderArtistHeader() }
                    <div className='artist-content'>
                        { renderArtistContent() }
                        { renderArtistPosts() }
                    </div>
                </div>
            )
        }
    }

    return renderArtistPage();
}

export default ArtistPage;
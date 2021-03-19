import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './artist-page.scss';
import BBSLoading from '../../components/common/BBSLoading/BBSLoading';
import { artistService } from '../../services';
import { useAppState } from '../../store';
import TabCard from '../../components/TabCard/TabCard';
import ArtistHeader from './components/ArtistHeader';
import ArtistInfoForm from './components/ArtistInfoForm';
import { http } from '../../util/api';

const ArtistPage = ({
    match
}) => {
    const artistInfoRef = useRef();
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

    const handleArtistContentSubmit = async () => {
        try {
            let newInfo = artistInfoRef.current.getNewInfo();
            console.log(newInfo)
            const { data, status } = await http.put(`/roster/${selectedArtist.full_name}`, newInfo);
            if (data && status === 200) {
                setIsEditing(false);
                setSelectedArtist(data);
                console.log('UpdateArtist: Success:', status);
            } else {
                console.log('UpdateArtist: BadResponse:', status)
            }
        } catch (error) {
            console.log('UpdateArtist:', error);
        }
    }

    const generateArtistContentTabActions = () => {
        switch (selectedTab) {
            case 'account':
                return isEditing ? [
                    { name: 'save', onClick: handleArtistContentSubmit, title: 'Save Content' }
                ] : [
                    { name: 'edit', onClick: () => setIsEditing(true), title: 'Edit Content' }
                ];
        }
    }

    const renderArtistHeader = () => {
        return (
            <ArtistHeader
                artist={selectedArtist}
                onEditClick={handleEditSelect}
                onUpdateClick={handleUpdateSelect}
                onWatchClick={handleWatchSelect}
                updateArtist={setSelectedArtist}
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
                actions={
                    generateArtistContentTabActions()
                }
                activeTab={selectedTab}
            >
                { generateAritstContent() }
            </TabCard>
        )
    }

    const generateAritstContent = () => {
        switch (selectedTab) {
            case 'account':
                return (
                    <ArtistInfoForm
                        artistName={selectedArtist?.full_name}
                        disabled={!isEditing}
                        ref={artistInfoRef}
                    />
                )
            default:
                return `Selected ${selectedTab}`
        }
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
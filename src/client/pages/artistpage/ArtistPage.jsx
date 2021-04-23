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
import TeamTab from '../../components/TeamTab/TeamTab';
import { isLoggedIn } from '../../util/auth';
import { UserArtistRelation, UserRole } from '../../../shared/util/types';


/**
 * 
 * let's load all data for each tab in background on render of page
 * have loading var tied to each one so we can dyanmically load
 * 
 * - css shimmer for loading data
 * 
 * - team, files, contact tab material ui table
 * 
 * - schedule integrates with bandsintown, songkick, internal (v2)
 */
const ArtistPage = ({
    match
}) => {
    const artistInfoRef = useRef();
    const { fullRoster, userProfile, artistRelationships, setArtistRelationships } = useAppState();
    const [ selectedArtist, setSelectedArtist ] = useState({});
    const [ selectedTab, setSelectedTab ] = useState('account');
    const [ isEditing, setIsEditing ] = useState(false);
    //
    const [ relationship, setRelationship ] = useState();
    //
    const [ teamsTabInfo, setTeamsTabInfo ] = useState({ data: [], loading: true });
    const [ artistFormInfo, setArtistFormInfo ] = useState({ data: [], loading: true });


    useEffect(() => {
        getData();
    }, [ match.params.artistName ]);

    const getData = () => {
        getArtistInfo();
    }

    useEffect(() => {
        setRelationship(artistRelationships.find(x => x.full_name === selectedArtist?.full_name)?.relation);
    }, [ artistRelationships ]);

    const getArtistInfo = async () => {
        try {
            const artist = await artistService.getArtist(match.params.artistName);
            setArtistFormInfo({ data: artist, loading: false });
            setRelationship(artistRelationships.find(x => x.full_name === artist.full_name)?.relation)
            setSelectedArtist(artist);
        } catch (error) {
            console.log('FillArtistInfo:', error);
        }
    }

    const handleArtistContentSubmit = async () => {
        try {
            let newInfo = artistInfoRef.current.getNewInfo();
            const { data, status } = await http.put(`/roster/${selectedArtist.id}`, newInfo );
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
        if (isLoggedIn() && (
            (!!relationship && relationship === UserArtistRelation.Owner) ||
            (userProfile.role === UserRole.SuperAdmin)
        )) {
            switch (selectedTab) {
                case 'account':
                    return isEditing ? [
                        <i className="fas fa-save" onClick={handleArtistContentSubmit} title="Save Content"></i>
                    ] : [
                        <i className="fas fa-edit" onClick={() => setIsEditing(true)} title="Edit Content"></i>
                    ];
            }
        }
    }

    const renderArtistHeader = () => {
        return (
            <ArtistHeader
                artist={selectedArtist}
                updateArtist={setSelectedArtist}
                relationship={relationship}
            />
        )
    }

    const renderArtistContent = () => {
        return (
            <TabCard
                tabs={[
                    { id: 'account', label: 'Account', onClick: () => setSelectedTab('account') },
                    { id: 'schedule', label: 'Schedule', onClick: () => setSelectedTab('schedule') },
                    { id: 'contact', label: 'Contact', onClick: () => setSelectedTab('contact') },
                    { id: 'files', label: 'Files', onClick: () => setSelectedTab('files') },
                    { id: 'team', label: 'Team', onClick: () => setSelectedTab('team') },
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
                        info={artistFormInfo}
                        artistName={selectedArtist?.full_name}
                        disabled={!isEditing}
                        ref={artistInfoRef}
                    />
                )
            case 'team':
                // return (
                //     <TeamTab
                //         info={teamsTabInfo}
                //     />
                // )
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
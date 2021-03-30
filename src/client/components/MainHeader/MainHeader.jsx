import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './main-header.scss';
import BBSLogo from '../common/BBSLogo/BBSLogo';
import NewLeadModal from '../../components/NewLeadModal/NewLeadModal';
import SearchBar from '../SearchBar/SearchBar';
import BBSIcon from '../common/BBSIcon/BBSIcon';
import { Menu, MenuItem } from '@material-ui/core';
import { isLoggedIn, logOut } from '../../util/auth';
import { useAppState } from '../../store';
import BBSButton from '../common/BBSButton/BBSButton';
import Avatar from '../common/Avatar/Avatar';

const MainHeader = ({ }) => {
    const history = useHistory();
    const { addNewClient, userProfile, setLoading } = useAppState();
    const [ userMenuRef, setUserMenuRef ] = useState();
    const [ searchAddArtist, setSearchAddArtist ] = useState();
    const [ newLeadModalIsOpen, setNewLeadModalIsOpen ] = useState(false);
    const [ selectedTab, setSelectedTab ] = useState('')

    const navigateBackHome = () => {
        if (history.location.pathname != "/home") {
            history.push("/home");
            history.go(0);
        }
    }

    const handleUserLogout = async () => {
        setLoading(true);
        logOut();
        history.push('/home');
        history.go(0)
    }

    const handleUserLogin = () => {
        history.push('/signin');
        history.go(0);
    }

    const handleTabSelection = id => {
        setSelectedTab(id);
        let path = "/" + id;
        history.push(path)
        history.go(0);
    }

    const onAddNewLead = (leadEntry) => {
        setSearchAddArtist(leadEntry);
        setNewLeadModalIsOpen(true);
    }

    const handleNewLeadModalClose = () => {
        setSearchAddArtist(null);
        setNewLeadModalIsOpen(false);
    }

    const handleNewLeadModalSubmit = async (value) => {
        await addNewClient(value);
    }

    const handleSearchBarSubmit = (artist) => {
        history.push(`/artists/${encodeURIComponent(artist.full_name)}`);
        history.go(0);
    }

    const handleUserMenuToggle = (e) => {
        setUserMenuRef(e.target)
    }

    const handleUserMenuClose = () => {
        setUserMenuRef(null);
    }

    const renderMenu = () => {
        if (isLoggedIn()) {
            return (
                <div className='action-bar'>
                    <BBSButton
                        label="New Lead"
                        type="tertiary"
                        onClick={ () => setNewLeadModalIsOpen(true) }
                        title="Create new lead"
                    />
                    <span className='divider-bar dark-background' />
                    <div className='user-profile-dropdown' onClick={ handleUserMenuToggle }>
                        <Avatar uri={ userProfile?.photo?.file_path } title="My account" />
                    </div>
                    <Menu
                        id="main-menu"
                        anchorEl={userMenuRef}
                        keepMounted
                        open={Boolean(userMenuRef)}
                        onClose={handleUserMenuClose}
                        getContentAnchorEl={null}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    >
                        <MenuItem onClick={handleUserMenuClose}>Preferences</MenuItem>
                        <MenuItem onClick={handleUserMenuClose}>Roster</MenuItem>
                        <MenuItem onClick={handleUserMenuClose}>Calendar</MenuItem>
                        <MenuItem onClick={handleUserLogout} className="logout-menu-item" >Log Out</MenuItem>
                    </Menu>
                    <NewLeadModal
                        artistName={searchAddArtist}
                        isOpen={ newLeadModalIsOpen }
                        onClose={ handleNewLeadModalClose }
                        onSubmit={ handleNewLeadModalSubmit }
                    />
                </div>
            )
        } else {
            return (
                <div className='action-bar'>
                    <BBSButton
                        label="Login"
                        onClick={ handleUserLogin }
                        type="tertiary"
                    />
                </div>
            )
        }
    }

    const generateSubTabs = () => {
        const tabs = [
            { id: 'myroster', label: 'Roster' },
            { id: 'calendar', label: 'Calendar' },
            // { id: 'settings', label: 'Settings' },
        ];

        return (
            <div className='subtab-container'>
                { tabs.map((tab, key) => {
                    return (
                        <div key={key} className={`sub-tab ${selectedTab === tab.id ? 'active' : 'notactive'}`} onClick={() => handleTabSelection(tab.id)}>
                            <p>{ tab.label }</p>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className='header'>
            <div className='main-header'>
            <div className='sub-header'>
                <BBSLogo onClick={ navigateBackHome } />
                { generateSubTabs() }
            </div>
                <SearchBar onSubmit={ handleSearchBarSubmit } onAddNewLead={ onAddNewLead } />
                { renderMenu() }
            </div>

        </div>
    )
}

export default MainHeader;
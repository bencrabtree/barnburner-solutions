import React, { useRef, useState } from 'react';
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
import Drawer from '@material-ui/core/Drawer';
import Avatar from '../common/Avatar/Avatar';
import { createBrowserHistory } from 'history';

const MainHeader = ({
    newLeadModalIsOpen,
    setNewLeadModalIsOpen,
    darkBackground
}) => {
    const history = createBrowserHistory();
    const {
        lightMode,
        addNewClient,
        userProfile,
        setLoading,
        toggleSideMenu,
        toggleMode,
        sideMenuOpen
    } = useAppState();
    const [ userMenuRef, setUserMenuRef ] = useState();
    const [ searchAddArtist, setSearchAddArtist ] = useState();
    const [ selectedTab, setSelectedTab ] = useState('')

    const navigateBackHome = () => {
        if (history.location.pathname != "/") {
            history.push("/");
            history.go(0);
        }
    }

    const handleUserLogout = async () => {
        setLoading(true);
        logOut();
        history.push('/');
        history.go(0)
    }

    const handleUserLogin = () => {
        history.push('/signin');
        history.go(0);
    }

    const handleUserSignUp = () => {
        let body = `Hi!\n\nI'm interested in learning more about how I can streamline my operations with BarnBurner Solutions.\n\nThanks,`
        window.location.href = `mailto:ben@barnburner.solutions?subject=Requesting%20A%20Demo&body=${encodeURI(body)}`
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

    const generateTabItems = () => {
        const tabs = [
            { id: 'myroster', label: 'Roster', icon: 'fas fa-address-book' },
            { id: 'calendar', label: 'Calendar', icon: 'fas fa-calendar' },
            { id: 'intranet', label: 'Intranet', icon: 'fas fa-network-wired' }
        ];

        return tabs.map((elt, key) => {
            return (
                <div className={
                    `side-menu-item
                    ${history?.location.pathname === "/" + elt.id ? 'active' : 'inactive'}`}
                    onClick={() => handleTabSelection(elt.id)}
                    key={key}
                >
                    <i className={elt.icon}></i>
                    <h2>{ elt.label }</h2>
                </div>
            )
        })
    }

    const renderMenu = () => {
        if (isLoggedIn()) {
            return (
                <div className='action-bar'>
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
                        <MenuItem onClick={handleUserMenuClose}>Account</MenuItem>
                        <MenuItem onClick={toggleMode}>Toggle Mode</MenuItem>
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
                        type="secondary"
                    />
                    <BBSButton
                        label="Request a Demo"
                        onClick={ handleUserSignUp }
                        type="tertiary"
                    />
                </div>
            )
        }
    }

    return (
        <header className={`main-navigation ${darkBackground ? 'blue' : ''}`} key="main-header">
            <div className='main-header'>
                <div className='sub-header'>
                    { isLoggedIn() && <BBSIcon
                        type="hamburger"
                        style="round"
                        onClick={() => toggleSideMenu()}
                    /> }
                    <BBSLogo onClick={ navigateBackHome } />
                </div>
                { isLoggedIn() && <SearchBar onSubmit={ handleSearchBarSubmit } onAddNewLead={ onAddNewLead } /> }
                { renderMenu() }
            </div>
            <Drawer anchor="left" open={sideMenuOpen} onClose={ toggleSideMenu }>
                <div className={`side-menu ${lightMode ? 'theme--default' : 'theme--dark'}`}>
                    <BBSButton
                        className="add-new-lead-button"
                        label="Add a new lead"
                        type="tertiary"
                        onClick={() => setNewLeadModalIsOpen(true) }
                    />
                    { generateTabItems() }
                </div>
            </Drawer>
        </header>
    )
}

export default MainHeader;
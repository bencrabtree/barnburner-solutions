import React, { useEffect, useState } from 'react';
import { createBrowserHistory } from 'history';
import SearchBar from '../../components/SearchBar/SearchBar';
import { Menu, MenuItem } from '@material-ui/core';
import Avatar from '../../components/common/Avatar/Avatar';
import useAppState from '../../store/appState';
import { logOut } from '../../util/auth';
import './app.scss';
import BBSLoading from '../../components/common/BBSLoading/BBSLoading';
import Navigation from './components/Navigation';
import { getIdFromPath, navElements } from '../../util/constants';
import { isNull } from 'lodash';

const App = () => {
    const history = createBrowserHistory();
    const {
        userProfile,
        toggleMode,
        setLoading,
        loading
    } = useAppState()
    const [ activeNav, setActiveNav ] = useState(getIdFromPath(history.location.pathname));
    const [ userMenuRef, setUserMenuRef ] = useState();

    useEffect(() => {
        console.log('hi')
        console.log(location.pathname)
        setActiveNav(getIdFromPath(location.pathname))
    }, [ history.location ]);

    const handleUserLogout = async () => {
        setLoading(true);
        logOut();
        history.push('/');
        history.go(0)
    }

    const handleArtistSearchSubmit = (artist) => {
        history.push(`/roster/${encodeURIComponent(artist.full_name)}`);
    }

    const handleUserMenuToggle = e => {
        setUserMenuRef(e.target)
    }

    const handleUserMenuClose = () => {
        setUserMenuRef(null);
    }

    const handleNavClick = (elt, showPath) => {
        if (showPath) {
            setActiveNav(elt.id);
            history.push(elt.path);
        }
    }

    const renderHeaderNavigation = () => {
        const elt = navElements.find(x => activeNav.includes(x.id));
        const path = history.location.pathname.split(elt.path)[1];
        console.log('path', path)

        if (elt) {
            return (
                <div className='header-nav-content'>
                    <div className={`header-nav-base ${path && 'hasSubelt'}`} onClick={ () => handleNavClick(elt, !isNull(path)) } >
                        <i className={ elt.icon } />
                        <span className="nav-label">
                            { elt.label }
                        </span>
                    </div>
                    { path && 
                        <div className='header-nav-sub'>
                            <i className="fas fa-caret-right" />
                            <div className='nav-label'>
                                { elt.subelements.find(x => activeNav.includes(x.id)).label }
                            </div>
                        </div>
                    }
                </div>
            )
        }
    }

    const renderApp = () => {
        if (loading) {
            return <BBSLoading />
        } else {
            switch (activeNav) {
                default:
                    return (
                        <div className="main-content">
                            { activeNav }
                        </div>
                    )
            }
        }
    }

    return (
        <div className='app'>
            <div className='app-container'>
                <Navigation
                    activePath={activeNav}
                    setActivePath={setActiveNav}
                />
                <div className='app-content'>
                    <header className='app-header'>
                        <div className='header-container'>
                            <div className='header-navigation'>
                                { renderHeaderNavigation() }
                            </div>
                            <SearchBar
                                onSubmit={ handleArtistSearchSubmit }
                            />
                        </div>
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
                        </div>
                    </header>
                    <main>
                        { renderApp() }
                    </main>
                </div>

            </div>
        </div>
    )
}

export default App;
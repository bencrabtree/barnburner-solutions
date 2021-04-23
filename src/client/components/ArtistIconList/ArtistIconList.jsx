import React, { memo, useEffect, useMemo, useState } from 'react';
import './artist-icon-list.scss';
import { useAppState } from '../../store';
import { ArtistStatus, Tags, UserArtistRelation } from '../../../shared/util/types';
import { Menu, MenuItem } from '@material-ui/core';
import { getArtistImageSrc } from '../../util/constants';
import HeartIcon from '../../components/HeartIcon/HeartIcon';
import { useHistory } from 'react-router-dom';

const ArtistIconList = ({
    artistId,
    handleArtistSelection,
    className,
    style
}) => {
    const { getArtistById, getArtistRelationship } = useAppState();
    const [ artist, setArtist ] = useState();
    const [ artistMenuRef, setArtistMenuRef ] = useState();
    const history = useHistory();

    useEffect(() => {
        setArtist(getArtistById(artistId))
    }, [ artistId ]);

    const handleArtistMenuToggle = (e) => {
        setArtistMenuRef(e.target)
    }

    const handleArtistMenuClose = () => {
        setArtistMenuRef(null);
    }

    const handleArtistClick = () => {
        history.push(`/artists/${encodeURIComponent(artist.full_name)}`);
        history.go(0);
    }

    const renderContent = () => {
        if (artist) {
            return (
                <div className={`artist-icon-list card ${className} ${artist.status}`} style={style}>
                        <i className="fas fa-ellipsis-v artist-menu-toggle" onClick={handleArtistMenuToggle}></i>
                        <Menu
                            id="artist-menu"
                            anchorEl={artistMenuRef}
                            keepMounted
                            open={Boolean(artistMenuRef)}
                            onClose={handleArtistMenuClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        >
                            <MenuItem onClick={handleArtistClick}>Profile</MenuItem>
                            <MenuItem onClick={handleArtistMenuClose}>Contacts</MenuItem>
                            <MenuItem onClick={handleArtistMenuClose}>Agents</MenuItem>
                        </Menu>
                        <div className='artist-image-wrapper' onClick={ () => handleArtistSelection(artist.id)  }>
                            <img src={ getArtistImageSrc(artist?.photo?.file_path) } />
                        </div>
                        <div className='artist-icon-list-content'>
                            <h2 onClick={ () => handleArtistSelection(artist.id) }>{ artist.full_name }</h2>
                            <div className="artist-icon-list-extras">
                                { getArtistRelationship(artist.id) === UserArtistRelation.Favorited ?
                                    <HeartIcon isLiked={true} /> :
                                    <h2 className="normal-weight capitalize">{ getArtistRelationship(artist.id) }</h2>
                                }
                                <span className={`artist-status-pill ${artist.status}`}>
                                    { artist.status }
                                </span>
                            </div>
                        </div>
                </div>
            )
        } else {
            return (
                <div style={style} />
            )
        }
    }

    return renderContent();

};

export default ArtistIconList;
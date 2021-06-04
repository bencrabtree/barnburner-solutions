import React, { memo, useEffect, useMemo, useState } from 'react';
import { useAppState } from '../../store';
import './my-roster.scss';
import { ArtistStatus, Tags, UserArtistRelation } from '../../../shared/util/types';
import ArtistCard from '../../components/ArtistCard/ArtistCard';
import BBSButton from '../../components/common/BBSButton/BBSButton';
import { Menu, MenuItem } from '@material-ui/core';
import TabCard from '../../components/TabCard/TabCard';
import ArtistDetails from './components/ArtistDetails';
import { getArtistImageSrc } from '../../util/constants';
import HeartIcon from '../../components/HeartIcon/HeartIcon';
import ArtistIconList from '../../components/ArtistIconList/ArtistIconList';
import Measure from 'react-measure';
import { FixedSizeGrid as Grid, areEqual } from 'react-window'; 
import { memoize } from 'lodash';

const MyRoster = ({

}) => {
    const { artistRelationships, fullRoster, getArtistRelationship } = useAppState();
    const [ scrollTopButtonIsVisible, setScrollTopButtonIsVisible ] = useState(false);
    const [ filters, setFilters ] = useState({
        relationship: [UserArtistRelation.Favorited, UserArtistRelation.Owner, UserArtistRelation.None],
        tags: [],
        status: [ArtistStatus.Signed, ArtistStatus.Negotiating, ArtistStatus.Approached, ArtistStatus.New]
    });
    const [ searchValue, setSearchValue ] = useState("");
    const [ visibleTags, setVisibleTags ] = useState(Tags);
    const [ artists, setArtists ] = useState(fullRoster);
    const [ activeTab, setActiveTab ] = useState('filters');
    const [ selectedArtist, setSelectedArtist ] = useState();
    const [ rosterLayout, setRosterLayout ] = useState('icon');
    const [ rosterBounds, setRosterBounds ] = useState({ height: -1, width: -1 });

    useEffect(() => {
        document.addEventListener("scroll", handleUserScroll);
        setSelectedArtist();

        return () => {
            document.removeEventListener("scroll", handleUserScroll)
        }
    }, []);

    const handleArtistSelection = id => {
        setSelectedArtist(selectedArtist === id ? undefined : id);
        setActiveTab('details');
    }

    const generatedArtistCards = useMemo(() => {
        return artists.map((artist, key) => {

            switch (rosterLayout) {
                case 'tiles':
                    return (
                        <ArtistCard 
                            key={key}
                            artistId={artist?.id}
                            photo_path={artist?.photo?.file_path}
                            onClick={ handleArtistSelection }
                            // className={selectedArtist === artist?.id ? 'selected' : ''}
                            // style={style}
                        />
                    );
                case 'icon':
                    return (
                        <ArtistIconList
                            key={key}
                            artistId={ artist?.id }
                            handleArtistSelection={ handleArtistSelection }
                            // className={ selectedArtist === artist?.id ? 'selected' : '' }
                            // style={ style }
                        />
                    );
                    break;
                case 'list':
                    return (
                        // <div className="artist-row" style={style}>
                        <div className='artist-row' key={key}>
                            <div className='artist-cell'>
                                { artist?.full_name }
                            </div>
                            <div className={`artist-status-pill ${artist?.status}`}>
                                { artist?.status }
                            </div>
                            <div className='artist-cell'>
                                { artist?.website || artist?.facebook }
                            </div>
                            <div className='artist-cell'>
                                More info!
                            </div>
                        </div>
                    );
                    break;
            }
        })
    });

    const removeTagFilter = tag => {
        let temp = filters;
        temp.tags = temp.tags.filter(x => x != tag);
        setFilters(temp);
        updateArtists('tags');
    }

    const handleUserScroll = () => {
        if (window.pageYOffset > 300) {
            setScrollTopButtonIsVisible(true)
          } else {
            setScrollTopButtonIsVisible(false);
          }
    }

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    }

    const handleTagFilter = (e) => {
        setVisibleTags(Tags.filter(x => x.toLowerCase().includes(e.target.value)));
        setSearchValue(e.target.value);
    }

    const handleInputChange = (event) => {
        event.persist();
        let tempfilters = filters;
        if (event.target.checked) {
            if (tempfilters[event.target.name]) {
                tempfilters[event.target.name].push(event.target.value);
            } else {
                tempfilters[event.target.name] = [ event.target.value ];
            }
        } else {
            if (tempfilters[event.target.name]) {
                tempfilters[event.target.name] = tempfilters[event.target.name].filter(x => x != event.target.value);
            }
        }

        updateArtists(event.target.name);

        setFilters(tempfilters);
    }

    const updateArtists = (eventName) => {
        let tempartists = fullRoster;
        switch (eventName) {
            case 'relationship':
                if (filters.relationship.length > 0) {
                    tempartists = tempartists.filter(artist => filters.relationship.includes(getArtistRelationship(artist.id) || UserArtistRelation.None));
                }
                break;
            case 'status':
                tempartists = tempartists.filter(x => filters.status.includes(x.status));
                break;
            case 'tags':
                if (filters.tags.length > 0) {
                    let intersects = artist => artist.tags.filter(value => filters.tags.includes(value)).length > 0;
                    tempartists = tempartists.filter(intersects);
                }
                break;
        }
        tempartists.sort((a,b) => a.full_name < b.full_name);
        setArtists(tempartists)
    }

    const renderTagSystem = () => {
        return filters.tags.map((tag, key) => {
                return (
                    <div className='pill withRemove' key={key}>
                        { tag }
                        <div className='pill-remove' onClick={() => removeTagFilter(tag)}>
                            X
                        </div>
                    </div>
                )
            })
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'filters':
                return (
                    <div className='roster-side-panel'>
                        <fieldset>
                            <legend>My Relationship:</legend>
                            { Object.values(UserArtistRelation).map((relation, key) => {
                                return (
                                    <>
                                        <input type="checkbox" checked={!!filters.relationship.includes(relation)} id={relation} name="relationship" value={relation} onChange={handleInputChange} key={key}></input>
                                        <label htmlFor={relation}>{ relation }</label><br/>
                                    </>
                                )
                            })}
                        </fieldset>
                        <fieldset>
                            <legend>Tags:</legend>
                            <input className='tag-filter-input' value={searchValue} onChange={ handleTagFilter } placeholder="Filter tags" />
                            <div className='tag-container'>
                                { visibleTags.map((tag, key) => {
                                    return (
                                        <>
                                            <input type="checkbox" id={tag} checked={!!filters.tags.includes(tag)} name="tags" value={tag} onChange={handleInputChange} key={key} />
                                            <label htmlFor={tag}>{tag}</label><br/>
                                        </>
                                    )
                                })}
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Artist Status:</legend>
                            <div className='tag-container'>
                                { Object.values(ArtistStatus).map((status, key) => {
                                    return (
                                        <>
                                            <input type="checkbox" checked={!!filters.status.includes(status)} id={status} name="status" value={status} onChange={handleInputChange} key={key} />
                                            <label htmlFor={status}>{status}</label><br/>
                                        </>
                                    )
                                })}
                            </div>
                        </fieldset>
                    </div>
                )
            case 'details':
                return (
                    <div className='roster-side-panel'>
                        <ArtistDetails artistId={ selectedArtist } />
                    </div>
                )
        }
    }

    /**
     * Filters
     * 
     * Pills with Artist Status, Pills with Artist Relation, Pills with Artist Tags
     */
    const rowHeights = new Array(1000)
        .fill(true)
        .map(() => 25 + Math.round(Math.random() * 50));

    return (
        <div className="my-roster-container">
            <div className="my-roster-layout">
                <TabCard
                    tabs={[
                        { id: 'filters', label: 'Filters', onClick: () => setActiveTab('filters') },
                        { id: 'details', label: 'Details', onClick: () => setActiveTab('details') }
                    ]}
                    activeTab={activeTab}
                >
                    { renderTabContent() }
                </TabCard>
                <div className="roster-content">
                    { scrollTopButtonIsVisible && 
                        <div className='scroll-to-top' onClick={handleScrollToTop}>
                            <i className="fas fa-long-arrow-alt-up"></i>
                            Scroll to top   
                        </div>
                    }
                    <div className="roster-head card-rounded">
                        <div className='top-content'>
                            <h1>{ artists.length } <small>artists match your search criteria</small></h1>
                            <div className='top-content-actions'>
                                <i className={`fas fa-th ${rosterLayout === 'tiles' ? 'active' : ''}`} onClick={() => setRosterLayout('tiles') }></i>
                                <i className={`fas fa-th-list ${rosterLayout === 'icon' ? 'active' : ''}`} onClick={() => setRosterLayout('icon') }></i>
                                <i className={`fas fa-bars ${rosterLayout === 'list' ? 'active' : ''}`} onClick={() => setRosterLayout('list') }></i>
                            </div>
                        </div>
                        <div className='pill-container'>
                            { renderTagSystem() }
                        </div>
                    </div>
                    {/* <Measure
                        bounds
                        onResize={(contentRect) => {
                            console.log(contentRect)
                            setRosterBounds(contentRect.bounds);
                        }}
                    >
                    {({ measureRef }) => */}
                            <div className={`roster-cards ${rosterLayout}`}>
                                {/* //</div></div> <Grid
                                //     height={rosterBounds.height}
                                //     rowCount={artists.length}
                                //     width={rosterBounds.width}
                                //     columnCount={2}
                                //     columnWidth={rosterBounds.width / 2}
                                //     rowHeight={300}
                                //     itemData={artists}
                                // > */}
                                    { generatedArtistCards }
                                {/* // </Grid> */}
                            </div>
                        {/*  }
                    </Measure> */}
                </div>
            </div>
        </div>
    )
}

export default MyRoster;
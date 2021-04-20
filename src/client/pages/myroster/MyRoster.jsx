import React, { useEffect, useState } from 'react';
import { useAppState } from '../../store';
import './my-roster.scss';
import { ArtistStatus, Tags, UserArtistRelation } from '../../../shared/util/types';
import ArtistCard from '../../components/ArtistCard/ArtistCard';
import BBSButton from '../../components/common/BBSButton/BBSButton';
import { update } from 'lodash';

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

    useEffect(() => {
        document.addEventListener("scroll", handleUserScroll);

        return () => {
            document.removeEventListener("scroll", handleUserScroll)
        }
    }, []);

    const generateArtistCards = () => {
        return artists.map((artist, key) => {
            return (
                <ArtistCard key={key} artist={artist} photo_path={artist?.photo?.file_path} />
            )
        })
    }

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

    /**
     * Filters
     * 
     * Pills with Artist Status, Pills with Artist Relation, Pills with Artist Tags
     */
    return (
        <div className="my-roster-container">
            <div className="my-roster-layout">
                <div className="roster-filters card-rounded">
                    <h1>Filters</h1>
                    <form >
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
                    </form>
                </div>
                <div className="roster-content">
                    { scrollTopButtonIsVisible && 
                        <div className='scroll-to-top' onClick={handleScrollToTop}>
                            <i className="fas fa-long-arrow-alt-up"></i>
                            Scroll to top   
                        </div>
                    }
                    <div className="roster-head card-rounded">
                        <h1>Roster <small>({ artists.length })</small></h1>
                        <div className='pill-container'>
                            { renderTagSystem() }
                        </div>
                    </div>
                    <div className="roster-cards">
                        { generateArtistCards() }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyRoster;
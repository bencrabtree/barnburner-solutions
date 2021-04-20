import React, { useEffect, useState } from 'react';
import { useAppState } from '../../store';
import './my-roster.scss';
import { ArtistStatus, Tags, UserArtistRelation } from '../../../shared/util/types';
import ArtistCard from '../../components/ArtistCard/ArtistCard';
import BBSButton from '../../components/common/BBSButton/BBSButton';

const MyRoster = ({

}) => {
    const { artistRelationships } = useAppState();
    const [ scrollTopButtonIsVisible, setScrollTopButtonIsVisible ] = useState(false);
    const [ filters, setFilters ] = useState({
        relationship: [UserArtistRelation.Favorited, UserArtistRelation.Owner],
        tags: [],
        status: [ArtistStatus.Signed, ArtistStatus.Negotiating, ArtistStatus.Approached, ArtistStatus.New]
    });
    const [ searchValue, setSearchValue ] = useState("");
    const [ visibleTags, setVisibleTags ] = useState(Tags);
    const [ artists, setArtists ] = useState(artistRelationships);

    useEffect(() => {
        document.addEventListener("scroll", handleUserScroll);

        return () => {
            document.removeEventListener("scroll", handleUserScroll)
        }
    }, []);

    const generateArtistCards = () => {
        return artists.map((artist, key) => {
            return (
                <ArtistCard key={key} artist={artist} />
            )
        })
    }

    const removeTagFilter = tag => {
        let temp = filters;
        temp.tags = temp.tags.filter(x => x != tag);
        setFilters(temp);
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
        let tempartists = artistRelationships;
        switch (eventName) {
            case 'relationship':
                tempartists = tempartists.filter(x => filters.relationship.includes(x.relation));
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
        setArtists(tempartists)
    }

    const renderTagSystem = () => {
        console.log(filters)
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
                            <input type="checkbox" checked={!!filters.relationship.includes('owner')} id="owner" name="relationship" value="owner" onChange={handleInputChange}></input>
                            <label for="owner">Owner</label><br/>
                            <input type="checkbox" checked={!!filters.relationship.includes('favorited')} id="favorited" name="relationship" value="favorited" onChange={handleInputChange}></input>
                            <label for="favorited">Favorited</label>
                        </fieldset>
                        <fieldset>
                            <legend>Tags:</legend>
                            <input className='tag-filter-input' value={searchValue} onChange={ handleTagFilter } placeholder="Filter tags" />
                            <div className='tag-container'>
                                { visibleTags.map((tag, key) => {
                                    return (
                                        <>
                                            <input type="checkbox" id={tag} name="tags" value={tag} onChange={handleInputChange} key={key} />
                                            <label for={tag}>{tag}</label><br/>
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
                                            <label for={status}>{status}</label><br/>
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
                            Scroll To Top   
                        </div>
                    }
                    <div className="roster-head card-rounded">
                        <h1>Roster</h1>
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
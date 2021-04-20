import { useContext } from 'react';
import { AppContext } from './appContext';
import { cloneDeep } from 'lodash';
import { http } from '../util/api';

const useAppState = () => {
    const [ state, setState ] = useContext(AppContext);

    const addNewClient = async (client) => {
        try {
            let formData = new FormData();
            Object.keys(client).forEach(key => {
                if (key === 'photo_uri') {
                    formData.append(key, client[key][0], client[key][0].name)
                } else {
                    formData.append(key, client[key] || undefined)
                }
            })
            const { data, status } = await http.post('/roster/new', formData);
            if (status === 200) {
                console.log("AddNewClient: Success:", status);
                let tempRoster = cloneDeep(state.fullRoster);
                tempRoster.push(data);
                setState(state => ({ ...state, fullRoster: tempRoster }));
                return true;
            } else {
                console.log("AddNewClient: BadResponse:", status)
            }
        } catch (error) {
            console.log("AddNewClient:", error);
            return false;
        }
    }

    const setLoading = (isLoading) => {
        setState(state => ({ ...state, loading: isLoading }))
    }

    const toggleSideMenu = () => {
        setState(state => ({ ...state, sideMenuOpen: !state.sideMenuOpen }))
    }

    const setSelectedArtist = artistName => {
        if (state.fullRoster.find(x => x.full_name === artistName)) {
            setState(state => ({ ...state, selectedArtist: artistName }));
        }
    }

    const setArtistRelationships = data => {
        setState(state => ({ ...state, artistRelationships: data }))
    }

    const getArtistById = id => {
        return state.fullRoster.find(artist => artist.id === id);
    }

    const getRosterValues = () => {
        return state.artistRelationships.map(artist => {
            return {
                ...artist,
                tags: getArtistById(artist.id)?.tags
            }
        })
    }

    return {
        loading: state.loading,
        setLoading,
        sideMenuOpen: state.sideMenuOpen,
        toggleSideMenu,
        userProfile: state.userProfile,
        allUsers: state.allUsers,
        fullRoster: state.fullRoster,
        artistRelationships: state.artistRelationships,
        setArtistRelationships,
        addNewClient,
        getArtistById,
        getRosterValues,
        //
        selectedArtist: state.selectedArtist,
        setSelectedArtist
    }
}

export default useAppState;
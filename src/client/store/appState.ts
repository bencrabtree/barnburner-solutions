import { useContext } from 'react';
import { AppContext } from './appContext';
import { cloneDeep } from 'lodash';
import { http } from '../util/api';
import { AxiosRequestConfig } from 'axios';

const useAppState = () => {
    const [ state, setState ] = useContext(AppContext);

    const addNewClient = async (client) => {
        try {
            let formData = new FormData();
            Object.keys(client).forEach(key => {
                console.log(key, client[key])
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

    const setSelectedArtist = artistName => {
        if (state.fullRoster.find(x => x.full_name === artistName)) {
            setState(state => ({ ...state, selectedArtist: artistName }));
        }
    }

    const setArtistRelationships = data => {
        setState(state => ({ ...state, artistRelationships: data }))
    }

    return {
        loading: state.loading,
        setLoading,
        userProfile: state.userProfile,
        allUsers: state.allUsers,
        fullRoster: state.fullRoster,
        allTags: state.allTags,
        artistRelationships: state.artistRelationships,
        setArtistRelationships,
        addNewClient,
        //
        selectedArtist: state.selectedArtist,
        setSelectedArtist
    }
}

export default useAppState;
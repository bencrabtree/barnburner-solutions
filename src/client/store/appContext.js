import React, { createContext, useEffect, useState } from "react";
import { http } from "../util/api";

const AppContext = createContext([{}, () => {}]);

const AppContextProvider = ({ children }) => {
    const [ state, setState ] = useState({
        loading: true,
        userProfile: {},
        allUsers: [],
        fullRoster: [],
        allTags: [],
        selectedArtist: null
    });

    useEffect(() => {

        const loadData = async () => {
            try {
                const { data: user } = await http.get('/user/current');
                const { data: roster } = await http.get('/roster/all');
                const { data: tags } = await http.get('/tags/all');
                const { data: allUsers } = await http.get('/user/all');

                setState({
                    userProfile: user,
                    fullRoster: roster,
                    allTags: tags,
                    allUsers: allUsers,
                    selectedArtist: null,
                    loading: false
                })
            } catch (error) {
                console.log("Unable to set UserState:", error)
            }
        }

        loadData();
    }, []);

    return (
        <AppContext.Provider value={[ state, setState ]}>
            { children }
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };
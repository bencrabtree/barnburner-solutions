import React, { createContext, useEffect, useState } from "react";
// import sharp from "sharp";
import axios from 'axios';
import { http } from "../util/api";
import { isLoggedIn } from "../util/auth";

const AppContext = createContext([{}, () => {}]);

const AppContextProvider = ({ children }) => {
    const [ state, setState ] = useState({
        loading: true,
        sideMenuOpen: false,
        userProfile: {},
        allUsers: [],
        fullRoster: [],
        selectedArtist: null,
        artistRelationships: [],
        lightMode: true
    });

    useEffect(() => {

        const loadData = async () => {
            try {
                let relationship = [];
                const { data: user } = await http.get('/user/current');
                const { data: roster } = await http.get('/roster/all');
                const { data: allUsers } = await http.get('/user/all');
                if (isLoggedIn()) {
                    const { data } = await http.get(`/user/relationships/${user.id}`);
                    relationship = data;
                }
                roster.forEach(async artist => {
                    // console.log(artist.photo.file_path)
                    try {
                        // let input = (await axios({ url: artist.photo.file_path, responseType: "arraybuffer" })).data;
                        // sharp(input)
                        //     .resize(300, 300)
                        //     .toFile(`./artistImages/${artist.full_name}.png`)
                    } catch (err) {
                        console.log(err)
                    }
                })
                
                setState({
                    userProfile: user,
                    fullRoster: roster,
                    allUsers: allUsers,
                    selectedArtist: null,
                    artistRelationships: relationship,
                    loading: false,
                    sideMenuOpen: false,
                    lightMode: true
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
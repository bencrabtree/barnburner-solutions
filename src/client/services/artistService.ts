import { http } from '../util/api';

const getArtist = async (artistName) => {
    try {
        const { data, status } = await http.get('/roster/' + artistName);
        if (status === 200) {
            console.log('GetArtist: Success:', status);
            return data;
        } else {
            console.log('GetArtist: BadResponse:', status);
        }
    } catch (error) {
        console.log('GetArtist:', error);
        return null;
    }
}

const uploadPhoto = async (artistId, photoUri) => {
    try {
        let formData = new FormData();
        formData.append('photo_uri', photoUri[0], photoUri[0].name);
        const { data, status } = await http.put(`/roster/uploadPhoto/${artistId}`, formData);
        if (status === 200) {
            console.log('UploadPhoto: Success:', status);
            return data;
        } else {
            console.log('UploadPhoto: BadResponse:', status);
        }
    } catch (error) {
        console.log('UploadPhoto:', error);
        return null;
    }
}

export {
    getArtist,
    uploadPhoto
};
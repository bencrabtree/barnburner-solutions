import { Client } from '../../shared/dto';
import { http } from '../util/api';

const getArtist = async (artistName): Promise<Client> => {
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

export {
    getArtist
};
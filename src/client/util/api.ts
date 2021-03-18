import axios from 'axios';

const http = axios;

const setHeaders = (key, value) => {
    http.defaults.headers.common[key] = value;
}

export {
    http,
    setHeaders
}
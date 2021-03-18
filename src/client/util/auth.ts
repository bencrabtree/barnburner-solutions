import Cookies from 'js-cookie';

export const isLoggedIn = () => {
    const token = Cookies.get('token');
    let session;
    try {
        if (token) {
            const base64Url = token.split('.')[1]
            const base64 = base64Url.replace('-', '+').replace('_', '/')
            session = JSON.parse(window.atob(base64))
        }
    } catch (error) {
        console.log('Getting token', error)
    }
    return session;
}

// export const setSession = (jwt) => {
//     console.log(jwt)
//     try {
//         Cookies.set('token', jwt);
//     } catch (error) {
//         console.log('Setting JWT Session', error)
//     }
//     return jwt;
// }

export const logOut = () => {
    Cookies.remove('token')
}
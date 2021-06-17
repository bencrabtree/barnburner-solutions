
export const navElements = [
    { id: 'intranet', label: 'Intranet', icon: 'fas fa-home', path: '/', header: true, subelements: [] },
    { id: 'roster', label: 'Roster', icon: 'fas fa-address-book', path: '/app/roster', header: true, subelements: [] },
    { id: 'team', label: 'Team', icon: 'fas fa-users', path: '/app/team', header: true, subelements: [] },
    { id: 'reports', label: 'Reports', icon: 'fas fa-file-alt', path: '/app/reports', header: true, subelements: [
        { id: 'finance', label: 'Finance', icon: '', path: '/app/reports/finance' },
        { id: 'social', label: 'Social', icon: '', path: '/app/reports/social' },
        { id: 'events', label: 'Events', icon: '', path: '/app/reports/events' }
    ] },
    { id: 'account', label: 'My Account', icon: 'fas fa-cog', path: '/app/account', header: false, subelements: [] }
]

export const getIdFromPath = path => {
    return path.split('/app')[1]
}

export const getArtistImageSrc = uri => {
    if (uri) {
        let split = uri.split('amazonaws.com/')
        return split[0] + "amazonaws.com/" + encodeURIComponent(split[1])
    }
}

export const toReadableDate = x => {
    let date = new Date(x);
    return date.toDateString();
}
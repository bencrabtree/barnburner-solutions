
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
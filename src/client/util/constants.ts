
export const getArtistImageSrc = uri => {
    let split = uri.split('amazonaws.com/')
    return split[0] + "amazonaws.com/" + encodeURIComponent(split[1])
}
import urlcat from 'urlcat'
import {API_KEY, BASE_URL, COMIC_DETAIL_PATH, COMICS_PATH, CHARACTERS_PATH, CHARACTER_DETAIL_PATH} from "../constants";


export const buildComicDetailURL = (id, params = {}) => {
    return urlcat(BASE_URL, COMIC_DETAIL_PATH, {...params, apikey: API_KEY, comicId: id})
}

export const buildComicsURL = (params={}) => {
    return urlcat(BASE_URL, COMICS_PATH, {...params, apikey: API_KEY})
}

export const buildCharacterDetail = (id, params = {}) => {
    return urlcat(BASE_URL, CHARACTER_DETAIL_PATH, {...params, apikey: API_KEY, characterId: id})
}

export const buildCharactersURL = (params={}) => {
    return urlcat(BASE_URL, CHARACTERS_PATH, {...params, apikey: API_KEY})
}

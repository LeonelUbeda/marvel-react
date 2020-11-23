

const API_KEY = 'c8834cdb52aa453ceb0ed4a2b06d08a1'


export const baseFetch = (URL, params) => fetch(`${URL}?apikey=${API_KEY}`, params)

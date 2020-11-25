
export const searchIfFavorite = (list , id, type) =>{
    return list.some(e => e.id == id && e.type === type)
}
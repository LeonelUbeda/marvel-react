export const searchIfFavorite = (list, id, type) =>
  list.some((e) => e.id === id && e.type === type);

export default { searchIfFavorite };

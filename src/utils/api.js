export const getItemsFromAPIResponse = (response) => {
  const items = {};
  for (const element of response.data.results) {
    items[element.id] = { ...element, id: element.id.toString() };
  }
  return items;
};

export const getItemsIdsFromAPIResponse = (response) =>
  response.data.results.map(({ id }) => id);

export default { getItemsFromAPIResponse, getItemsIdsFromAPIResponse };

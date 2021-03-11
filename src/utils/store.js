// items: Object, itemsId: Array[String]
export const getItemsFromStore = (items, itemsIds) => {
  const itemsList = [];
  for (const id of itemsIds) {
    if (id in items) {
      itemsList.push(items[id]);
    }
  }
  return itemsList;
};

export default { getItemsFromStore };

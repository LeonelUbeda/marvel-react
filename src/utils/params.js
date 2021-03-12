export const getPageFromQuery = (value) => {
  const temp = parseInt(value, 10);
  if (!Number.isNaN(temp) && temp > 0) {
    return temp;
  }
  return 1;
};

export default { getPageFromQuery };

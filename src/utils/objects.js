export const removeNullValues = (obj) => {
  // takes an object and remove null properties and return a new object
  const temp = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== null) {
      temp[key] = value;
    }
  }
  return temp;
};

export default { removeNullValues };

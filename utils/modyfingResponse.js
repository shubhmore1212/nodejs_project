export const removingUnwantedKey = (obj, keys) => {
  for (let key of keys) {
    delete obj[key];
  }
};

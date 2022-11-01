export const getLocalStorage = (keyName) => JSON.parse(localStorage.getItem(keyName));

export const setLocalStorage = (keyName, keyValue) => localStorage
  .setItem(keyName, JSON.stringify(keyValue));

export const removeLocalStorage = (keyName) => localStorage
  .removeItem(keyName);

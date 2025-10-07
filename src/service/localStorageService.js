export const setKey = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getValue = (key) => {
    let data = localStorage.getItem(key);
    if (data !== "undefined") {
        return JSON.parse(data);
    } else {
        return null;
    }
};

export const removeKey = (key) => {
    localStorage.removeItem(key);
};
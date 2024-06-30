import { useState, useEffect } from "react";

const PREFIX = "codepen-clone-";

const useLocalStorage = (key, initialValue) => {
  const prefixKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixKey);
    if (jsonValue !== null) {
      try {
        return JSON.parse(jsonValue);
      } catch (e) {
        console.error(`Error parsing JSON from localStorage for key "${prefixKey}":`, e);
      }
    }

    // If initialValue is a function, call it to get the initial value
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixKey, JSON.stringify(value));
  }, [prefixKey, value]);

  // localStorage.removeItem(prefixKey);
  return [value, setValue];
};

export default useLocalStorage;

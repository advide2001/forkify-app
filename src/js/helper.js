import { TIMEOUT } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    // Stop the page from loading forever by using Promise.race function.
    // Whichever promise gets resolved first will win
    const fetchData = fetch(url);
    const response = await Promise.race([fetchData, timeout(TIMEOUT)]);
    const data = await response.json();
    // If something goes wrong with the request
    if (!response.ok) throw new Error(`${data.message} ${response.status}`);
    return data;
  } catch (error) {
    throw error;
  }
};

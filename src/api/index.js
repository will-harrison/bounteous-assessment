import mockData from './mock';
const TESTING = false;
const BASE_URL = substr => `http://api.tvmaze.com/search/shows?q={${substr}}`;

const mockAsync = new Promise((resolve, reject) => resolve(mockData));

export const getTVShowNames = substr => {
  if (TESTING) {
    return mockAsync.then(res => res).catch(err => console.log(err));
  }
  return fetch(BASE_URL(substr))
    .then(res => res.json())
    .catch(err => console.log(err));
};

import axios from 'axios';

const apiURL = 'http://192.168.0.105:8000';

// const api = axios.create({ baseURL: 'https://api-smartmirror.herokuapp.com' });
const api = axios.create({ baseURL: apiURL });

export { api, apiURL };

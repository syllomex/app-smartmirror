import axios from 'axios';

const apiURL = 'https://api-smartmirror.herokuapp.com'; // PROD
// const apiURL = 'http://192.168.0.105:8000'; // LOCAL

const api = axios.create({ baseURL: apiURL });

export { api, apiURL };

import axios from 'axios';

const api = axios.create({ baseURL: 'https://api-smartmirror.herokuapp.com' });
// const api = axios.create({ baseURL: 'http://192.168.0.104:8000' });

export { api };

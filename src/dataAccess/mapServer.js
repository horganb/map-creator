import axios from 'axios';
import cookie from 'cookie';
import { v4 as generateId } from 'uuid';

export const mapsUrl = 'http://localhost:3000/';
// export const mapsUrl = 'http://192.168.37.94:3000/';
// export const mapsUrl = 'https://map-creator-backend.herokuapp.com/';

const rawCookies = document.cookie;
const cookies = cookie.parse(rawCookies);

let token = cookies.token;
if (!token) {
  token = generateId();
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 100); // Expire in 100 years
  document.cookie = cookie.serialize('token', token, { expires });
}

const mapServer = axios.create({
  baseURL: mapsUrl,
  headers: {
    Authorization: token,
  },
});

export default mapServer;

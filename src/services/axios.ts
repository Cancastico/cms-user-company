import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const IP = process.env.NEXT_PUBLIC_IP_API;
const AUTH_IP = process.env.NEXT_PUBLIC_AUTH_IP_API;
const VERSIONADOR_IP = process.env.NEXT_PUBLIC_VERSIONADOR_IP_API;
console.log(AUTH_IP)

export const AxiosMain = axios.create({
  baseURL: IP,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AxiosAuth = axios.create({
  baseURL: AUTH_IP,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AxiosVersion = axios.create({
  baseURL: VERSIONADOR_IP,
  headers: {
    "Content-Type": "application/json",
  },
});


AxiosMain.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

AxiosAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

AxiosVersion.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);
import { User } from "types/user";

const apiUrl = process.env.REACT_APP_API_URL;
const localStorageKey = '__auth_provider_token__';

export const getToken = () => localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  localStorage.setItem(localStorageKey, user.token || '');
  return user;
}

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (responce) => {
    if (responce.ok) {
      return handleUserResponse(await responce.json());
    } else {
      return Promise.reject(await responce.json());
    }
  });
}

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (responce) => {
    if (responce.ok) {
      return handleUserResponse(await responce.json());
    } else {
      return Promise.reject(await responce.json());
    }
  });
}

export const logout = async () => localStorage.removeItem(localStorageKey);
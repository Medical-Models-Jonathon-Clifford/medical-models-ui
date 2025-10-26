import { redirect } from 'next/navigation';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { auth } from '@mm/auth';
import { LOGIN_URL, MEDICAL_MODELS_SERVICE_BASE_URL } from '@mm/config';

const mmAxios = axios.create({
  baseURL: MEDICAL_MODELS_SERVICE_BASE_URL,
  timeout: 5000,
});

function isClientSide() {
  return typeof window !== 'undefined';
}

function isUnauthorized(error: any) {
  return error.response?.status === 401;
}

mmAxios.interceptors.request.use(async (config) => {
  if (isClientSide()) {
    // Client side
    const session = await getSession();
    if (session?.idToken) {
      config.headers.Authorization = `Bearer ${session?.idToken}`;
    }
  } else {
    // Server side
    const session = await auth();
    if (session?.idToken) {
      config.headers.Authorization = `Bearer ${session?.idToken}`;
    }
  }
  return config;
});

mmAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isClientSide()) {
      if (isUnauthorized(error)) {
        console.log(
          '[axios] 401 response caught on client side. Redirecting to login.'
        );
        window.location.href = LOGIN_URL;
      }
    } else {
      if (isUnauthorized(error)) {
        console.log(
          '[axios] 401 response caught on server side. Redirecting to login.'
        );
        redirect(LOGIN_URL);
      }
    }
    return Promise.reject(error);
  }
);

export { mmAxios };

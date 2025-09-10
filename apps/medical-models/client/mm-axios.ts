import { MEDICAL_MODELS_SERVICE_BASE_URL } from '../app/constants';
import axios from 'axios';
import { getSession } from 'next-auth/react';

const mmAxios = axios.create({
  baseURL: MEDICAL_MODELS_SERVICE_BASE_URL,
  timeout: 5000,
});

mmAxios.interceptors.request.use(async (config) => {
  if (typeof window !== 'undefined') {
    const session = await getSession();
    if (session?.idToken) {
      config.headers.Authorization = `Bearer ${session?.idToken}`;
    }
  }
  return config;
});

export { mmAxios };

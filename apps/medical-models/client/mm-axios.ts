import { MEDICAL_MODELS_SERVICE_BASE_URL } from '../app/constants';
import axios from 'axios';

export const mmAxios = axios.create({
  baseURL: MEDICAL_MODELS_SERVICE_BASE_URL,
  timeout: 5000,
});

import axios from 'axios';
import { getAllNavigation } from '../../../client/mm-document-client';

export const queryGithubForTanstackInfo = async () => {
  const response = await axios.get('https://api.github.com/repos/TanStack/query');
  return response.data;
};

export const getDocumentsAllNavigation = async () => {
  const response = await getAllNavigation();
  return response.data;
};

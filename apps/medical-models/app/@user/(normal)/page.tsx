import { redirect } from 'next/navigation';
import { AxiosResponse } from 'axios';
import { DocumentNode } from '@mm/types';
import { getAllNavigation } from '@mm/clients';

export default async function UserRoot() {
  const documents: AxiosResponse<DocumentNode[]> = await getAllNavigation();
  const firstDocId = documents.data[0].id;
  redirect(`/document/${firstDocId}`);
}

import { redirect } from 'next/navigation';
import { AxiosResponse } from 'axios';
import { DocumentNode } from '../../../types/document';
import { getAllNavigation } from '../../../client/mm-document-client';

export default async function UserRoot() {
  const documents: AxiosResponse<DocumentNode[]> = await getAllNavigation();
  const firstDocId = documents.data[0].id;
  redirect(`/document/${firstDocId}`);
}

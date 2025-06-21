import * as React from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Search from './search';
import {
  getDocumentsAllNavigation,
  queryGithubForTanstackInfo,
} from './search-api';

export default async function SearchPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['repoData'],
    queryFn: queryGithubForTanstackInfo,
  });

  await queryClient.prefetchQuery({
    queryKey: ['navigationData'],
    queryFn: getDocumentsAllNavigation,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Search />
    </HydrationBoundary>
  );
}

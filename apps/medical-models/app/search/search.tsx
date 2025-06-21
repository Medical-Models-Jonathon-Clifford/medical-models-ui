'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDocumentsAllNavigation, queryGithubForTanstackInfo } from './search-api';
import { DocumentNode } from '../../types/document';

export default function Search() {
  // First query to fetch data from the first API (Github in your case)
  const {
    isPending: isPendingRepo,
    error: errorRepo,
    data: repoData,
  } = useQuery({
    queryKey: ['repoData'],
    queryFn: queryGithubForTanstackInfo
  });

  // Second query to fetch data from your custom API
  const {
    isPending: isPendingNavigation,
    error: errorNavigation,
    data: navigationData,
  } = useQuery({
    queryKey: ['navigationData'],
    queryFn: getDocumentsAllNavigation
  });

  // Show loading state as long as either query is pending
  if (isPendingRepo || isPendingNavigation) return 'Loading...';

  // Handle errors individually
  if (errorRepo) {
    return 'An error has occurred with the repo API: ' + errorRepo.message;
  }

  if (errorNavigation) {
    return (
      'An error has occurred with the navigation API: ' +
      errorNavigation.message
    );
  }

  return (
    <div>
      {/* First API response */}
      <div>
        <h1>{repoData.name}</h1>
        <p>{repoData.description}</p>
        <strong>👀 {repoData.subscribers_count}</strong>{' '}
        <strong>✨ {repoData.stargazers_count}</strong>{' '}
        <strong>🍴 {repoData.forks_count}</strong>
      </div>

      {/* Second API response */}
      <div>
        <h2>Navigation Data</h2>
        <ul>
          {navigationData.map((item: DocumentNode, index: number) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

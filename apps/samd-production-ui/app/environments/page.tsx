import * as React from 'react';
import { EnvironmentUrls } from './EnvironmentUrls';
import { EnvironmentVersions } from './EnironmentVersions';

export default function EnvironmentsPage() {
  return (
    <>
      <EnvironmentUrls/>
      <EnvironmentVersions/>
    </>
  );
}

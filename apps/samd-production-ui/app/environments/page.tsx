import * as React from 'react';
import styles from './page.module.scss';

const PLACEHOLDER_ENV_VERSIONS = [
  {
    component: 'medical-models-ui',
    dev: '1.0.2',
    stg: '1.0.1',
    prod: '1.0.0'
  },
  {
    component: 'medical-models-service',
    dev: '1.1.1',
    stg: '1.1.1',
    prod: '1.1.1'
  },
  {
    component: 'medical-models-search-service',
    dev: 'abc123',
    stg: '456def',
    prod: '16b5c4'
  }
];

export default function EnvironmentsPage() {
  return (
    <>
      <h1>Environment Versions</h1>
      <table className={styles.environment_versions_table}>
        <thead>
        <tr>
          <th>Component</th>
          <th>Dev</th>
          <th>Stg</th>
          <th>Prod</th>
        </tr>
        </thead>
        <tbody>
        {PLACEHOLDER_ENV_VERSIONS.map((env, index) => (
          <tr>
            <td>{env.component}</td>
            <td>{env.dev}</td>
            <td>{env.stg}</td>
            <td>{env.prod}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
}

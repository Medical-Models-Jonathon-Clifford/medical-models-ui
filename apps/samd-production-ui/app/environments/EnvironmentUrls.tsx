import * as React from 'react';
import styles from './page.module.scss';

const PLACEHOLDER_ENV_VERSIONS = [
  {
    component: 'medical-models-ui',
    dev: 'http://mm-ui.local/',
    stg: '',
    prod: ''
  }
];

export function EnvironmentUrls() {
  return (
    <>
      <h1>Environment URLs</h1>
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
            <td><a target="_blank" href={env.dev}>{env.dev}</a></td>
            <td>{env.stg}</td>
            <td>{env.prod}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}

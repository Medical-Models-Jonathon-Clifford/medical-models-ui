import * as React from 'react';
import Link from 'next/link';
import styles from '../Base.module.scss';

export default function MonitoringPage() {
  return (
    <>
      <nav className={styles.base_nav_div}>
        <Link href="/monitoring">Applications</Link>
        <Link href="/monitoring/kubernetes">Kubernetes</Link>
      </nav>
    </>
  );
}

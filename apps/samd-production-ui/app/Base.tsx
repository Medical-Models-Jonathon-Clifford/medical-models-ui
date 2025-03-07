'use client';

import * as React from 'react';
import styles from './Base.module.scss';
import Link from 'next/link';


export default function Base({ children }: { children: React.ReactNode }) {

  return (
    <div>
      <nav className={styles.base_nav_div}>
        <Link href="/">Home</Link>
        <Link href="/documentation">Documentation</Link>
        <Link href="/monitoring">Monitoring</Link>
      </nav>
      <div className={styles.base_page_content}>
        {children}
      </div>
    </div>
  );
}

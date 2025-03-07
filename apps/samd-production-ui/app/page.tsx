'use client';

import * as React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <p>Gitea: <Link target="_blank" href="http://gitea.busybunyip.com">http://gitea.busybunyip.com</Link></p>
      <p>Jenkins: <Link target="_blank" href="http://jenkins.local">http://jenkins.local</Link></p>
    </>
  );
}

'use client';

import * as React from 'react';
import styles from './page.module.scss';

const PRESSED_MESSAGES = [
  '',
  'Unfortunately, demo data has not been implemented yet.',
  'Thank you for pressing me. Demo data generation is not available yet.',
  "I appreciate your eagerness. I just can't help you generate demo data.",
  "Look. I'm not doing this on purpose just to spite you. I can't do it. Please stop.",
];

export default function DemoDataPage() {
  const [pressedMessage, setPressedMessage] = React.useState(0);

  const handleGenerateDemoDataClick = () => {
    setPressedMessage((prev) => {
      const length = PRESSED_MESSAGES.length;
      if (prev >= length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  return (
    <>
      <h1>Demo Data</h1>
      <button onClick={handleGenerateDemoDataClick}>Generate Demo Data</button>
      {PRESSED_MESSAGES[pressedMessage] && (
        <p className={styles.pressed_message}>
          {PRESSED_MESSAGES[pressedMessage]}
        </p>
      )}
    </>
  );
}

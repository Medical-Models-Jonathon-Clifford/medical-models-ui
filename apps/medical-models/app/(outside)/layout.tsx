import * as React from 'react';
import Box from '@mui/material/Box';
import styles from '../../components/appbar/NewAppBar.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { ProfileIcon } from '../../components/profile-icon/ProfileIcon';
import LogoutIcon from '@mui/icons-material/Logout';

export const metadata = {
  title: 'Medical Models',
  description: 'Create Medical Models',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/favicon.png"
          type="image/png"
          sizes="<generated>"
        />
      </head>
      <body>
        <Box className={styles.new_app_bar_box}>
          <Link
            className={styles.new_app_bar_link}
            href={{
              pathname: '/',
            }}
          >
            <Image
              src={`/favicon.png`}
              alt="Profile Icon"
              width={24}
              height={24}
            />
            <Typography
              variant="h6"
              className={styles.new_app_bar_title_heading}
            >
              Medical Models
            </Typography>
          </Link>
        </Box>
        <h1>Login layout</h1>
        <div>{children}</div>
      </body>
    </html>
  );
}

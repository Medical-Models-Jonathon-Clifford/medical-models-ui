import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    link: true;
    sidebar: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    comment_count: true;
  }
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'link' },
          style: {
            color: 'rgb(21,88,188)',
            textTransform: 'none',
            fontSize: '12px',
            fontWeight: '400',
            padding: '0',
            minWidth: 'auto',
            ':hover': {
              textDecoration: 'underline',
              backgroundColor: 'transparent',
            },
          },
        },
        {
          props: { variant: 'contained' },
          style: {
            textTransform: 'none',
          },
        },
        {
          props: { variant: 'text' },
          style: {
            textTransform: 'none',
            color: 'rgb(80, 82, 88)',
            ':hover': {
              backgroundColor: 'rgba(9,30,66,0.08)',
            },
          },
        },
        {
          props: { variant: 'sidebar' },
          style: {
            textTransform: 'none',
            color: 'rgb(80, 82, 88)',
            ':hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.1)',
            },
          },
        },
      ],
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '16px 0',
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'comment_count' },
          style: {
            fontWeight: '700',
          },
        },
        {
          props: { variant: 'h4' },
          style: {
            fontWeight: '600',
            fontSize: '16px',
          },
        },
        {
          props: { variant: 'caption' },
          style: {
            display: 'block',
          },
        },
        {
          props: { variant: 'body1' },
          style: {
            fontSize: '14px',
          },
        },
      ],
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'rgb(24, 104, 219)',
          textDecorationColor: 'rgb(24, 104, 219)',
          cursor: 'pointer',
        },
      },
    },
  },
});

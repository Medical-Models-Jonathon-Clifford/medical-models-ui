import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    link: true;
    prompt: true;
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
            color: '#1558bc',
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
          props: { variant: 'prompt' },
          style: {
            color: '#505258',
            textTransform: 'none',
            fontSize: '14px',
            fontWeight: '400',
            padding: '0',
            minWidth: 'auto',
            height: '40px',
            cursor: 'text',
            ':hover': {
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

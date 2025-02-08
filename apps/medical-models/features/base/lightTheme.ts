import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    link: true;
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
      ],
    },
  },
});

import { extendTheme } from '@chakra-ui/react';
import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
        @import url('https://fonts.cdnfonts.com/css/mluvka');
      `}
  />
);

const theme = extendTheme({
  colors: {
    brand: {
      light_green: '#D9E4F9',
      light_blue: '#ADC5F2',
      white: '#FFF',
      black: '#000',

      black_v1: '#111111',
      black_v1_border: 'rgba(17, 17, 17, 0.1)',

      nav_white: 'rgba(255, 255, 255, 0.8)',
      footer_white: 'rgba(255, 255, 255, 0.75)',

      black_v2: '#2A2A2A',

      socials_bg: 'rgba(217, 228, 249, 0.8)',
    },
  },
  fonts: {
    heading: 'mluvka, sans-serif',
    body: 'mluvka, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'brand.light_green',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '500',
        borderRadius: '12px',
        transition: 'all 0.5s ease',
      },
      sizes: {
        md: {
          fontSize: '16px',
          py: '12px',
          px: '15px',
        },
      },
      variants: {
        socials: {
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          bg: 'rgba(217, 228, 249, 0.35)',
          _hover: {
            bg: 'brand.socials_bg',
          },
        },
        trans: {
          bg: 'transparent',
          border: '1px',
          borderColor: 'brand.black_v1_border',
          outline: 'none',
          height: '48px',
          width: '124px',
          color: 'brand.black_v1',
          _hover: {
            bg: 'brand.black_v1_border',
          },
        },
        black: {
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          bg: 'brand.black_v1',
          height: '48px',
          width: '124px',
          color: 'brand.white',
          _hover: {
            opacity: '0.97',
          },
        },
      },
    },
  },
});

export default theme;
export { Fonts };

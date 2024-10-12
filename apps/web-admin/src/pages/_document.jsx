import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Arial&family=Roboto&family=Lato&family=Open+Sans&family=Montserrat&family=Oswald&family=Poppins&family=Raleway&family=Roboto+Slab&family=Nunito&family=Ubuntu&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;

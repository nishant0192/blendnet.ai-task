// pages/_app.tsx
import React from 'react';
import '../src/app/globals.css'
import type { AppProps } from 'next/app';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;

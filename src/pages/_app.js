import '../styles/globals.css';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Router from 'next/router';
import { initAnimations } from '../utils/animations';
import { ClerkProvider } from '@clerk/nextjs';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({ once: true });
    const handleRouteChange = () => {
      AOS.refresh();
    };
    Router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    // Initialize animations after the component mounts
    initAnimations();
  }, []);

  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Think India</title>
        <meta name="description" content="Think India - Empowering Youth for a Better Tomorrow" />
        <link rel="icon" href="/think-india-logo.png" />
      </Head>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;

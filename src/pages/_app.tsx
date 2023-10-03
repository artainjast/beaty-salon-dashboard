import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import styles from '@/styles/Home.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import PageContainer from '@/components/container';
import { useEffect } from 'react';
import Router from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      Router.push('/user/login')
    }
  },[])
  return (
      <PageContainer className={styles.main} {...Component}>
        <Component {...pageProps} />
        <ToastContainer rtl />
      </PageContainer>
  ); 
}

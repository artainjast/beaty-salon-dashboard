import '@/styles/globals.css'
import '@/styles/font-icon.css'
import type { AppProps } from 'next/app'
import styles from '@/styles/Home.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import PageContainer from '@/components/container';

export default function App({ Component, pageProps }: AppProps) {
  return (
      <PageContainer className={styles.main} {...Component}>
        <Component {...pageProps} />
        <ToastContainer rtl />
      </PageContainer>
  ); 
}

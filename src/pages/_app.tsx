import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { useUser } from '@/store/useUser';
import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  const { getUser } = useUser();

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;

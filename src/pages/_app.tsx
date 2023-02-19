import { useState } from 'react';
import type { AppProps } from 'next/app';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Session, SessionContextProvider } from '@supabase/auth-helpers-react';
import Layout from '@/components/Layout';
import '@/styles/globals.css';

const App = ({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionContextProvider>
  );
};

export default App;

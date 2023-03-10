import { FC, ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Toasts from './Toasts';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Shop</title>
        <link rel="shortcut icon" href="/hamburger.svg" />
      </Head>
      <Header />
      {children}
      <Toasts />
    </div>
  );
};

export default Layout;

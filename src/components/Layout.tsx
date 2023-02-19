import { FC, ReactNode } from 'react';
import { useUser } from '@supabase/auth-helpers-react';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const user = useUser();

  return (
    <div className="layout">
      <div className="layout__header">
        <h1>Shop</h1>
        <div>{user?.email}</div>
      </div>
      {children}
    </div>
  );
};

export default Layout;

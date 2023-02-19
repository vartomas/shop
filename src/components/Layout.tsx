import { FC, ReactNode, useEffect, useState } from 'react';
import { User, useSupabaseClient } from '@supabase/auth-helpers-react';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    supabaseClient.auth.refreshSession();
  }, []);

  useEffect(() => {
    supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(undefined);
      }

      if (event === 'SIGNED_IN') {
        if (session?.user) {
          setUser(session.user);
        }
      }

      if (event === 'TOKEN_REFRESHED') {
        if (session?.user) {
          setUser(session.user);
        }
      }
    });
  }, []);

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

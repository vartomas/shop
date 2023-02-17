import { FC, ReactNode, useEffect, useState } from 'react';
import { User, useSupabaseClient } from '@supabase/auth-helpers-react';
import useLocalStorage from '@/utils/useLocalStorage';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const supabaseClient = useSupabaseClient();
  const { set, remove } = useLocalStorage();

  useEffect(() => {
    supabaseClient.auth.refreshSession();
  }, [supabaseClient.auth]);

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
  }, [supabaseClient.auth, remove, set]);

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

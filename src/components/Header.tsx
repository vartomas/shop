import { useState } from 'react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { HiOutlineUserCircle } from 'react-icons/hi';
import Avatar from './Avatar';
import Button from './Button';
import UserModal from './UserModal';

const Header = () => {
  const [userModalOpen, setUserModalOpen] = useState(false);

  const user = useUser();

  const supabaseClient = useSupabaseClient();
  const handleLogOut = () => supabaseClient.auth.signOut();

  return (
    <div className="header">
      <h1>Shop</h1>

      <div className="header__user">
        <p className="header__user__email">{user?.email}</p>
        {user ? (
          <Avatar email={user.email || 'N'} onClick={() => setUserModalOpen(true)} />
        ) : (
          <HiOutlineUserCircle className="header__user__icon" onClick={() => setUserModalOpen(true)} />
        )}
        {user && (
          <div className="header__user__logout">
            <Button title="Log out" onClick={handleLogOut} />
          </div>
        )}
      </div>

      <UserModal open={userModalOpen} onClose={() => setUserModalOpen(false)} />
    </div>
  );
};

export default Header;

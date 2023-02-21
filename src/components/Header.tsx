import { useState } from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { useUser } from '@supabase/auth-helpers-react';
import UserModal from './UserModal';

const Header = () => {
  const [userModalOpen, setUserModalOpen] = useState(false);

  const user = useUser();

  return (
    <div className="header">
      <h1>Shop</h1>

      <div className="header__user">
        <p className="header__user__email">{user?.email}</p>
        <HiOutlineUserCircle className="header__user__icon" onClick={() => setUserModalOpen(true)} />
      </div>

      <UserModal open={userModalOpen} onClose={() => setUserModalOpen(false)} />
    </div>
  );
};

export default Header;

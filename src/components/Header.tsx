import { useState } from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { useUser } from '@/store/useUser';
import Avatar from './Avatar';
import Button from './Button';
import UserModal from './UserModal';

const Header = () => {
  const [userModalOpen, setUserModalOpen] = useState(false);
  const { currentUser, logOut } = useUser();

  return (
    <div className="header">
      <h1>Shop</h1>

      <div className="header__user">
        <p className="header__user__email">{currentUser?.email}</p>
        {currentUser ? (
          <Avatar email={currentUser.email || 'N'} onClick={() => setUserModalOpen(true)} />
        ) : (
          <HiOutlineUserCircle className="header__user__icon" onClick={() => setUserModalOpen(true)} />
        )}
        {currentUser && (
          <div className="header__user__logout">
            <Button title="Log out" onClick={logOut} />
          </div>
        )}
      </div>

      <UserModal open={userModalOpen} onClose={() => setUserModalOpen(false)} />
    </div>
  );
};

export default Header;

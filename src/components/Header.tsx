import { useState } from 'react';
import Link from 'next/link';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { MdSettings } from 'react-icons/md';
import { useUser } from '@/store/useUser';
import Avatar from './Avatar';
import Button from './Button';
import IconButton from './IconButton';
import ShoppingCart from './ShoppingCart';
import UserModal from './UserModal';

const Header = () => {
  const [userModalOpen, setUserModalOpen] = useState(false);
  const { currentUser, logOut } = useUser();

  return (
    <div className="header">
      <Link href="/">
        <h2 className="header__logo">Shop</h2>
      </Link>

      <div className="header__user">
        <p className="header__user__email">{currentUser?.email}</p>
        {currentUser ? (
          <Avatar email={currentUser.email || 'N'} onClick={() => setUserModalOpen(true)} />
        ) : (
          <HiOutlineUserCircle className="header__user__icon" onClick={() => setUserModalOpen(true)} />
        )}
        {currentUser?.admin && (
          <div className="header__user__admin-icon">
            <Link href="/admin/products">
              <IconButton Icon={MdSettings} />
            </Link>
          </div>
        )}
        <ShoppingCart />
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

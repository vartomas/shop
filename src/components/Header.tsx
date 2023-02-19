import { HiOutlineUserCircle } from 'react-icons/hi';
import { useUser } from '@supabase/auth-helpers-react';

const Header = () => {
  const user = useUser();

  return (
    <div className="header">
      <h1>Shop</h1>

      <div className="header__user">
        <p className="header__user__email">{user?.email}</p>
        <HiOutlineUserCircle className="header__user__icon" />
      </div>
    </div>
  );
};

export default Header;

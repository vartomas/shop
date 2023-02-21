import { FC } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { MdClose } from 'react-icons/md';
import IconButton from './IconButton';
import Login from './Login';
import Profile from './Profile';

interface Props {
  open: boolean;
  onClose: () => void;
}

const UserModal: FC<Props> = ({ open, onClose }) => {
  const user = useUser();

  if (!open) return null;

  return (
    <div className="user-modal-overlay" onClick={onClose}>
      <div className="user-modal" onClick={(e) => e.stopPropagation()}>
        <div className="user-modal__close-btn">
          <IconButton Icon={MdClose} onClick={onClose} />
        </div>
        {user ? <Profile /> : <Login />}
      </div>
    </div>
  );
};

export default UserModal;
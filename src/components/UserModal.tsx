import { FC, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useUser } from '@/store/useUser';
import IconButton from './IconButton';
import Login from './Login';
import Profile from './Profile';

interface Props {
  open: boolean;
  onClose: () => void;
}

const UserModal: FC<Props> = ({ open, onClose }) => {
  const { currentUser } = useUser();

  useEffect(() => {
    onClose();
  }, [currentUser]);

  if (!open) return null;

  return (
    <div className="user-modal-overlay">
      <div className="user-modal">
        <div className="user-modal__close-btn">
          <IconButton size="small" Icon={MdClose} onClick={onClose} />
        </div>
        {currentUser ? <Profile /> : <Login />}
      </div>
    </div>
  );
};

export default UserModal;

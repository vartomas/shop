import { FC, useEffect } from 'react';
import { useUser } from '@/store/useUser';
import Login from './Login';
import Modal from './Modal';
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

  return <Modal onClose={onClose}>{currentUser ? <Profile /> : <Login />}</Modal>;
};

export default UserModal;

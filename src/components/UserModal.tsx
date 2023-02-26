import { FC, useEffect } from 'react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
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
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    supabaseClient.auth.onAuthStateChange(() => onClose());
  }, []);

  if (!open) return null;

  return (
    <div className="user-modal-overlay">
      <div className="user-modal">
        <div className="user-modal__close-btn">
          <IconButton Icon={MdClose} onClick={onClose} />
        </div>
        {user ? <Profile user={user} /> : <Login />}
      </div>
    </div>
  );
};

export default UserModal;

import { FC, ReactNode } from 'react';
import { MdClose } from 'react-icons/md';
import IconButton from './IconButton';

interface Props {
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<Props> = ({ onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__close-btn">
          <IconButton size="small" Icon={MdClose} onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

import { useContext } from 'react';
import { MdClose } from 'react-icons/md';
import { toastContext, useToast } from '@/hooks/useToast';
import IconButton from './IconButton';

const Toasts = () => {
  const context = useContext(toastContext);
  const { removeToast } = useToast();

  return (
    <div className="toasts-container">
      {context?.toasts.map((x) => (
        <div className={`toasts-container__toast toasts-container__toast--${x.type}`} key={x.id}>
          <p className="toast-container__toast__message">{x.message}</p>
          <div className="toasts-container__toast__close-btn">
            <IconButton Icon={MdClose} onClick={() => removeToast(x.id)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toasts;

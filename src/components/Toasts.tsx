import { useContext } from 'react';
import { MdClose } from 'react-icons/md';
import { toastContext, useToast } from '@/hooks/useToast';
import IconButton from './IconButton';

const Toasts = () => {
  const context = useContext(toastContext);
  const { closeToast } = useToast();

  return (
    <div className="toasts-container">
      {context?.toasts.map((x) => (
        <div
          className={`toasts-container__toast toasts-container__toast--${x.type}`}
          style={{ animation: `toasts-container__toast--slideInOut ${x.time}s` }}
          key={x.id}
        >
          <p>{x.message}</p>
          <div className="toasts-container__toast__close-btn">
            <IconButton Icon={MdClose} onClick={() => closeToast(x.id)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toasts;

import { MdClose } from 'react-icons/md';
import { useToast } from '@/store/useToast';
import IconButton from './IconButton';

const Toasts = () => {
  const { toasts, closeToast } = useToast();

  return (
    <div className="toasts-container">
      {toasts.map((x) => (
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

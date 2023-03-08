import { FC } from 'react';
import clsx from 'clsx';

interface Props {
  title: string;
  disabled?: boolean;
  type?: 'submit';
  onClick?: () => void;
}

const Button: FC<Props> = ({ title, disabled, type, onClick }) => {
  return (
    <button
      className={clsx('button', disabled ? 'button--disabled' : 'button--enabled')}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;

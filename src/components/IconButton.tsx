import { FC } from 'react';
import { IconType } from 'react-icons';

interface Props {
  size?: 'small' | 'normal' | 'large';
  Icon: IconType;
  onClick?: () => void;
}

const IconButton: FC<Props> = ({ size = 'normal', Icon, onClick }) => {
  return (
    <div className="icon-button" onClick={onClick}>
      <div className={`icon-button__bubble icon-button__bubble--${size}`}>
        <Icon />
      </div>
    </div>
  );
};

export default IconButton;

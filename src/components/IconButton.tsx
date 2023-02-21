import { FC } from 'react';
import { IconType } from 'react-icons';

interface Props {
  Icon: IconType;
  onClick: () => void;
}

const IconButton: FC<Props> = ({ Icon, onClick }) => {
  return (
    <div className="icon-button" onClick={onClick}>
      <div className="icon-button__bubble">
        <Icon />
      </div>
    </div>
  );
};

export default IconButton;

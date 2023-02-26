import { FC } from 'react';

interface Props {
  email: string;
  onClick: () => void;
}

const Avatar: FC<Props> = ({ email, onClick }) => {
  const letter = email[0];

  return (
    <div className="avatar">
      <div className="avatar__bubble" onClick={onClick}>
        <span className="avatar__bubble__letter">{letter.toUpperCase()}</span>
      </div>
    </div>
  );
};

export default Avatar;

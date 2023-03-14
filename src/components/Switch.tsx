import { FC } from 'react';

interface Props {
  value: boolean;
  onChange: () => void;
}

const Switch: FC<Props> = ({ value, onChange }) => {
  return (
    <div className={`switch switch--${value}`} onClick={onChange}>
      <div className={`switch__toggle switch__toggle--${value}`}></div>
    </div>
  );
};

export default Switch;

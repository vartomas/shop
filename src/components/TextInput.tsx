import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form/dist/types';

interface Props {
  name: string;
  label: string;
  form: UseFormReturn<any>;
  type?: 'email' | 'number' | 'password';
}

const TextInput: FC<Props> = ({ name, label, form, type }) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="text-input">
      <p className="text-input__label">{label}</p>
      <input
        className="text-input__input"
        type={type}
        step={type === 'number' ? '.01' : undefined}
        {...register(name)}
      />
      <p className="text-input__error">{errors[name]?.message as string}</p>
    </div>
  );
};

export default TextInput;

import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { MdUploadFile } from 'react-icons/md';

interface Props {
  name: string;
  fileName: string | undefined;
  form: UseFormReturn<any>;
}

const FileUpload: FC<Props> = ({ name, fileName, form }) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="file-upload">
      <label>
        <span className="file-upload__button">
          <div className="file-upload__button__icon">
            <MdUploadFile />
          </div>
          {fileName ? fileName : 'Upload image'}
        </span>
        <input type="file" {...register(name)} hidden />
        <p className="file-upload__error">{errors[name]?.message as string}</p>
      </label>
    </div>
  );
};

export default FileUpload;

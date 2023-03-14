import { FC } from 'react';
import { useCreateProduct } from '@/hooks/useCreateProduct';
import Button from './Button';
import FileUpload from './FileUpload';
import Modal from './Modal';
import TextInput from './TextInput';

interface Props {
  onClose: () => void;
}

const CreateProductModal: FC<Props> = ({ onClose }) => {
  const { productForm, submit } = useCreateProduct(onClose);

  const files = productForm.watch('image');
  const fileName = files?.length === 1 ? files[0].name : undefined;

  return (
    <Modal onClose={onClose}>
      <form className="create-product" onSubmit={submit}>
        <TextInput form={productForm} label="Title" name="title" />
        <TextInput form={productForm} label="Description" name="description" />
        <TextInput form={productForm} label="Price" name="price" type="number" />
        <FileUpload form={productForm} fileName={fileName} name="image" />
        <div className="create-product__button">
          <Button title="Create" type="submit" />
        </div>
      </form>
    </Modal>
  );
};

export default CreateProductModal;

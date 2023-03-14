import { FC } from 'react';
import { useUpdateProduct } from '@/hooks/useUpdateProduct';
import { ProductDto } from '@/types/productModel';
import Button from './Button';
import FileUpload from './FileUpload';
import Modal from './Modal';
import TextInput from './TextInput';

interface Props {
  product: ProductDto;
  onClose: () => void;
}

const UpdateProductModal: FC<Props> = ({ product, onClose }) => {
  const { productForm, submit } = useUpdateProduct(product, onClose);

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
          <Button title="Update" type="submit" />
        </div>
      </form>
    </Modal>
  );
};

export default UpdateProductModal;

import { FC } from 'react';
import { ProductDto } from '@/types/productModel';
import Button from './Button';
import Modal from './Modal';

interface Props {
  deleteProductId: string | undefined;
  products: ProductDto[];
  onDelete: () => void;
  onClose: () => void;
}

const DeleteProductModal: FC<Props> = ({ deleteProductId, products, onDelete, onClose }) => {
  return (
    <Modal onClose={onClose}>
      {!!deleteProductId && (
        <div className="delete-modal-content">
          <p className="delete-modal-content__header">Delete product?</p>
          <p className="delete-modal-content__title">Title: {products.find((x) => x._id === deleteProductId)?.title}</p>
          <p className="delete-modal-content__id">Id: {products.find((x) => x._id === deleteProductId)?._id}</p>
          <div className="delete-modal-content__buttons">
            <div className="delete-modal-content__buttons__cancel">
              <Button title="Cancel" onClick={onClose} />
            </div>
            <Button title="Delete" onClick={onDelete} />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default DeleteProductModal;

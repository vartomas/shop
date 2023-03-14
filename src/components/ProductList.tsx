import { FC } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { ProductDto } from '@/types/productModel';
import Divider from './Divider';
import IconButton from './IconButton';

interface Props {
  products: ProductDto[];
  onSelectForEdit: (_id: string) => void;
  onSelectForDelete: (_id: string) => void;
}

const ProductList: FC<Props> = ({ products, onSelectForEdit, onSelectForDelete }) => {
  return (
    <div className="products">
      <h2>Products</h2>
      <div className="products__header">
        <span>Title</span>
        <span>Description</span>
        <span>Price</span>
        <span>Image url</span>
        <span>Id</span>
        <span>Actions</span>
      </div>

      <Divider />

      <div className="products__list">
        {products.map((x) => (
          <div className="products__list__item" key={x._id}>
            <span title={x.title}>{x.title}</span>
            <span title={x.description}>{x.description}</span>
            <span title={(parseInt(x.price) / 100).toString()}>{parseInt(x.price) / 100}</span>
            <span title={x.image}>{x.image}</span>
            <span title={x._id}>{x._id}</span>
            <span className="products__list__item__buttons">
              <IconButton size="small" Icon={MdEdit} onClick={() => onSelectForEdit(x._id)} />
              <IconButton size="small" Icon={MdDelete} onClick={() => onSelectForDelete(x._id)} />
            </span>
          </div>
        ))}

        {products.length === 0 && <span>No products to display</span>}
      </div>
    </div>
  );
};

export default ProductList;

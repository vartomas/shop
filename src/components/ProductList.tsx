import { FC } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { ProductDto } from '@/types/productModel';
import Divider from './Divider';
import IconButton from './IconButton';

interface Props {
  products: ProductDto[];
}

const ProductList: FC<Props> = ({ products }) => {
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
            <span title={(x.price / 100).toString()}>{x.price / 100}</span>
            <span title={x.image}>{x.image}</span>
            <span title={x._id}>{x._id}</span>
            <span className="products__list__item__buttons">
              <IconButton size="small" Icon={MdEdit} />
              <IconButton size="small" Icon={MdDelete} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

import { MdShoppingCart } from 'react-icons/md';
import { useCart } from '@/store/useCart';
import IconButton from './IconButton';

const ShoppingCart = () => {
  const products = useCart((state) => state.products);

  return (
    <div className="shopping-cart">
      {products.length > 0 && <div className="shopping-cart__product-count">{products.length}</div>}
      <IconButton Icon={MdShoppingCart} />
    </div>
  );
};

export default ShoppingCart;

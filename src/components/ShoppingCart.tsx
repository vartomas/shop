import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MdShoppingCart } from 'react-icons/md';
import { useCart } from '@/store/useCart';
import IconButton from './IconButton';

const ShoppingCart = () => {
  const products = useCart((state) => state.products);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [products]);

  if (!loaded) {
    return null;
  }

  return (
    <Link href="/cart">
      <div className="shopping-cart">
        <IconButton Icon={MdShoppingCart} />
        {products.length > 0 && <div className="shopping-cart__product-count">{products.length}</div>}
      </div>
    </Link>
  );
};

export default ShoppingCart;

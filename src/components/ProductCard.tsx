import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/store/useCart';
import { ProductDto } from '@/types/productModel';
import Button from './Button';

interface Props {
  item: ProductDto;
}

const ProductCard: FC<Props> = ({ item }) => {
  const { addProduct } = useCart();
  const products = useCart((state) => state.products);
  const [loaded, setLoaded] = useState(false);
  const isProductAlreadyInCart = products.some((x) => x.product._id === item._id);

  useEffect(() => {
    setLoaded(true);
  }, [products]);

  if (!loaded) {
    return null;
  }

  return (
    <div className="product-card">
      <Image
        alt={`product-${item.title}-image`}
        src={'/' + item.image}
        width={200}
        height={200}
        style={{ objectFit: 'cover' }}
        priority
      />
      <div className="product-card__description-container">
        <div>
          <h3>{item.title}</h3>
          <p className="product-card__description-container__description">{item.description}</p>
        </div>
        <div className="product-card__description-container__button">
          <p>Price: {+item.price / 100}$</p>
          <Button
            title={isProductAlreadyInCart ? 'In cart' : 'Add to cart'}
            onClick={() => addProduct(item)}
            disabled={isProductAlreadyInCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

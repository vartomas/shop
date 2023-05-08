import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import UserModal from '@/components/UserModal';
import { useCart } from '@/store/useCart';
import { useUser } from '@/store/useUser';

const Cart = () => {
  const [loaded, setLoaded] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const products = useCart((state) => state.products);
  const { increaseQuantity, decreaseQuantity, removeProduct } = useCart();
  const user = useUser((state) => state.currentUser);

  useEffect(() => {
    setLoaded(true);
  }, [products]);

  if (!loaded) {
    return null;
  }

  return (
    <div className="cart-page">
      <h2>Shopping cart</h2>
      <div className="cart-page__list">
        {products.map((x) => (
          <div key={x.product._id}>
            <div className="cart-page__list__item">
              <h3>{x.product.title}</h3>
              <span>
                {x.quantity} x {+x.product.price / 100}$ = {((+x.product.price * x.quantity) / 100).toFixed(2)}$
                <Button title="+" onClick={() => increaseQuantity(x.product._id)} />
                <Button
                  title="-"
                  onClick={() => (x.quantity > 1 ? decreaseQuantity(x.product._id) : removeProduct(x.product._id))}
                />
              </span>
            </div>
            <Divider />
          </div>
        ))}
      </div>
      <div className="cart-page__total">
        <h3>Total</h3>
        <span>
          <strong>{products.reduce((a, c) => a + (+c.product.price * c.quantity) / 100, 0).toFixed(2)}$</strong>
        </span>
      </div>
      <div className="cart-page__buttons">
        {!user && <Button title="Login" onClick={() => setUserModalOpen(true)} />}{' '}
        <Link href="/checkout">
          <Button title={user ? 'Checkout' : 'Checkout as guest'} onClick={() => console.log(products)} />
        </Link>
      </div>
      <UserModal open={userModalOpen} onClose={() => setUserModalOpen(false)} />
    </div>
  );
};

export default Cart;

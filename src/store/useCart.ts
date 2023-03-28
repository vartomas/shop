import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProductDto } from '@/types/productModel';

interface CartState {
  products: { product: ProductDto; quantity: number }[];
  addProduct: (product: ProductDto) => void;
  removeProduct: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (product) => {
        set(() => ({ products: [...get().products, { product, quantity: 1 }] }));
      },
      removeProduct: (id) => {
        set(() => ({ products: get().products.filter((x) => x.product._id !== id) }));
      },
      increaseQuantity: (id) => {
        set(() => ({
          products: get().products.map((x) => (x.product._id === id ? { ...x, quantity: x.quantity + 1 } : x)),
        }));
      },
      decreaseQuantity: (id) => {
        set(() => ({
          products: get().products.map((x) => (x.product._id === id ? { ...x, quantity: x.quantity - 1 } : x)),
        }));
      },
    }),
    { name: 'shopping-cart' }
  )
);

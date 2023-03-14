import { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '@/components/Button';
import CreateProductModal from '@/components/CreateProductModal';
import DeleteProductModal from '@/components/DeleteProductModal';
import Divider from '@/components/Divider';
import ProductList from '@/components/ProductList';
import UpdateProductModal from '@/components/UpdateProductModal';
import { Product } from '@/models/product';
import { useToast } from '@/store/useToast';
import { ProductDto } from '@/types/productModel';
import { deleteProduct } from '@/utils/api/adminApi';
import { getAuthUser } from '@/utils/auth';
import { connect } from '@/utils/mongodb';
import Custom404Page from '../404';

interface Props {
  isAdmin: boolean;
  products: ProductDto[];
}

const Products: FC<Props> = ({ isAdmin, products }) => {
  const [editProductId, setEditProductId] = useState<string>();
  const [deleteProductId, setDeleteProductId] = useState<string>();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  if (!isAdmin) return <Custom404Page />;

  const onCloseModal = () => {
    setEditProductId(undefined);
    setDeleteProductId(undefined);
  };

  const selectForEdit = (_id: string) => {
    setEditProductId(_id);
  };

  const selectForDelete = (_id: string) => {
    setDeleteProductId(_id);
  };

  const modalOpen = !!editProductId || !!deleteProductId;

  const handleDelete = async () => {
    if (!deleteProductId) {
      return;
    }

    try {
      await deleteProduct(deleteProductId);
      toast({ type: 'info', message: 'Product deleted' });
      onCloseModal();
      router.replace(router.asPath);
    } catch (error) {
      toast({ type: 'error', message: 'Failed to delete product' });
    }
  };

  return (
    <div className="admin-products">
      <Button title="Create product" onClick={() => setCreateModalOpen(true)} />
      <Link className="admin-products__users-button" href="users">
        <Button title="Manage users" />
      </Link>
      <Divider />
      <ProductList products={products} onSelectForEdit={selectForEdit} onSelectForDelete={selectForDelete} />

      {modalOpen && (
        <DeleteProductModal
          deleteProductId={deleteProductId}
          products={products}
          onDelete={handleDelete}
          onClose={onCloseModal}
        />
      )}

      {createModalOpen && <CreateProductModal onClose={() => setCreateModalOpen(false)} />}

      {editProductId && (
        <UpdateProductModal product={products.find((x) => x._id === editProductId)!} onClose={onCloseModal} />
      )}
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const token = context.req.cookies.token as string | undefined;

  if (token) {
    await connect();
    const user = await getAuthUser(token);

    if (!user?.admin) {
      return { props: { isAdmin: false, products: [] } };
    }

    const products = await Product.find({});

    return {
      props: {
        isAdmin: true,
        products: JSON.parse(JSON.stringify(products)),
      },
    };
  }

  return {
    props: { isAdmin: false },
  };
};

export default Products;

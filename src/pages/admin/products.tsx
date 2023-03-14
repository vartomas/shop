import { FC, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import Modal from '@/components/Modal';
import ProductList from '@/components/ProductList';
import { Product } from '@/models/product';
import { ProductDto } from '@/types/productModel';
import { getAuthUser } from '@/utils/auth';
import { connect } from '@/utils/mongodb';
import Custom404Page from '../404';

interface Props {
  isAdmin: boolean;
  products: ProductDto[];
}

const Admin: FC<Props> = ({ isAdmin, products }) => {
  const [editProductId, setEditProductId] = useState<string>();
  const [deleteProductId, setDeleteProductId] = useState<string>();

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

  return (
    <div className="admin-products">
      <Link href="createproduct">
        <Button title="Create product" />
      </Link>
      <Link className="admin-products__users-button" href="users">
        <Button title="Manage users" />
      </Link>
      <Divider />
      <ProductList products={products} onSelectForEdit={selectForEdit} onSelectForDelete={selectForDelete} />

      {modalOpen && (
        <Modal onClose={onCloseModal}>
          <p>{editProductId || deleteProductId}</p>
        </Modal>
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

export default Admin;

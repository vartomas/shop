import { FC } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
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
  if (!isAdmin) return <Custom404Page />;

  return (
    <div className="admin-products">
      <Link href="createproduct">
        <Button title="Create product" />
      </Link>
      <Link className="admin-products__users-button" href="users">
        <Button title="Manage users" />
      </Link>
      <Divider />
      <ProductList products={products} />
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

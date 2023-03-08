import { FC } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
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
    <>
      <p>Admin panel</p>
      <Link href="admin/createproduct">
        <Button title="Create product" />
      </Link>
      {products.map((x) => (
        <div key={x._id}>
          {x.title} {x.description} {x.price}
        </div>
      ))}
    </>
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

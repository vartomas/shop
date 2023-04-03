import { FC } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/models/product';
import { ProductDto } from '@/types/productModel';
import { GetPropType } from '@/types/props';
import { connect } from '@/utils/mongodb';

type Props = GetPropType<typeof getServerSideProps>;

const Products: FC<Props> = ({ products }) => {
  return (
    <div className="products-page">
      <h2 className="products-page__header">Browsing products</h2>
      <div className="products-page__list">
        {products.map((x) => (
          <ProductCard key={x._id} item={x} />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  await connect();

  const products = await Product.find({});

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)) as ProductDto[],
    },
  };
};

export default Products;

import { FC } from 'react';
import Button from '@/components/Button';
import FileUpload from '@/components/FileUpload';
import TextInput from '@/components/TextInput';
import { useCreateProduct } from '@/hooks/useCreateProduct';
import { getAuthUser } from '@/utils/auth';
import { connect } from '@/utils/mongodb';
import Custom404Page from '../404';

interface Props {
  isAdmin: boolean;
}

const CreateProduct: FC<Props> = ({ isAdmin }) => {
  const { productForm, submit } = useCreateProduct();

  if (!isAdmin) return <Custom404Page />;

  const files = productForm.watch('image');
  const fileName = files?.length === 1 ? files[0].name : undefined;

  return (
    <form className="create-product" onSubmit={submit}>
      <TextInput form={productForm} label="Title" name="title" />
      <TextInput form={productForm} label="Description" name="description" />
      <TextInput form={productForm} label="Price" name="price" type="number" />
      <FileUpload form={productForm} fileName={fileName} name="image" />
      <div className="create-product__button">
        <Button title="Create" type="submit" />
      </div>
    </form>
  );
};

export const getServerSideProps = async (context: any) => {
  const token = context.req.cookies.token as string | undefined;

  if (token) {
    await connect();
    const user = await getAuthUser(token);
    return { props: { isAdmin: !!user?.admin } };
  }

  return {
    props: { isAdmin: false },
  };
};

export default CreateProduct;

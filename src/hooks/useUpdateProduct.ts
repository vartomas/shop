import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useToast } from '@/store/useToast';
import { ProductDto } from '@/types/productModel';
import { updateProduct } from '@/utils/api/adminApi';

const checkIfFilesAreCorrectType = (files: FileList | undefined) => {
  if (files && files[0]) {
    if (['image/jpeg'].includes(files[0].type)) {
      return true;
    }
  }

  return false;
};

const patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;

const productSchema = yup.object().shape({
  title: yup.string().required('Title required'),
  description: yup.string().required('Description required'),
  price: yup
    .number()
    .required('Price required')
    .positive('Only positive numbers allowed')
    .test('is-decimal', 'The price should be with maximum two digits after comma', (val: number) =>
      patternTwoDigisAfterComma.test(val.toString())
    ),
  image: yup
    .mixed<FileList>()
    .test('fileSize', 'The file is too large, max 5 MB', (files: FileList | undefined) => {
      if (!files?.length) {
        return true;
      }

      return files.length === 1 && files[0].size <= 5000000;
    })
    .test('is-correct-file', 'File is wrong format, only jpeg is allowed', (files: FileList | undefined) => {
      if (!files?.length) {
        return true;
      }

      return checkIfFilesAreCorrectType(files);
    }),
});

type ProductForm = yup.InferType<typeof productSchema>;

export const useUpdateProduct = (product: ProductDto, onClose: () => void) => {
  const router = useRouter();
  const { toast } = useToast();
  const productForm = useForm<ProductForm>({
    mode: 'onSubmit',
    defaultValues: {
      title: product.title,
      description: product.description,
      price: parseInt(product.price, 10) / 100,
      image: undefined,
    },
    resolver: yupResolver(productSchema),
  });

  const submit = productForm.handleSubmit(async (formValues) => {
    const { title, description, price, image: files } = formValues;
    const image = files ? files[0] : undefined;

    let formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', (price * 100).toString());
    if (image) {
      formData.append('image', image);
    }

    const response = await updateProduct({ id: product._id, data: formData });

    if (!response.error) {
      onClose();
      router.replace(router.asPath);
      toast({ type: 'success', message: 'Product updated' });
    } else {
      toast({ type: 'error', message: 'Failed to update product' });
    }
  });

  return { productForm, submit };
};

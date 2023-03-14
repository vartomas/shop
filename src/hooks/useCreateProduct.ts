import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useToast } from '@/store/useToast';
import { createProduct } from '@/utils/api/adminApi';

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
    .required('Image required')
    .test('required', 'Image required', (files: FileList | undefined) => files && files.length > 0)
    .test('fileSize', 'The file is too large, max 5 MB', (files: FileList | undefined) => {
      return files && files.length === 1 && files[0].size <= 5000000;
    })
    .test('is-correct-file', 'File is wrong format, only jpeg is allowed', checkIfFilesAreCorrectType),
});

type ProductForm = yup.InferType<typeof productSchema>;

export const useCreateProduct = () => {
  const router = useRouter();
  const { toast } = useToast();
  const productForm = useForm<ProductForm>({
    mode: 'onSubmit',
    defaultValues: { title: '', description: '', price: 0, image: undefined },
    resolver: yupResolver(productSchema),
  });

  const submit = productForm.handleSubmit(async (formValues) => {
    const { title, description, price, image: files } = formValues;
    const image = files[0];

    let formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', (price * 100).toString());
    formData.append('image', image);

    const response = await createProduct(formData);

    if (!response.error) {
      router.push('/admin/products');
      toast({ type: 'success', message: 'Product created' });
    } else {
      toast({ type: 'error', message: 'Failed to create product' });
    }
  });

  return { productForm, submit };
};

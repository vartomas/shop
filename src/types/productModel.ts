export interface ProductDto {
  _id: string;
  title: string;
  description: string;
  price: string;
  image: string;
}

export interface UpdateProductRequest {
  id: string;
  data: FormData;
}

export interface Car {
  id?: string;
  title: string;
  discription: string;
  price: number;
  brandId: string;
  categoryId: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  brands?: Brand;
  categories?: Category;
}

export interface Brand {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

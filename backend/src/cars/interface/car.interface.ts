export interface CarResponse {
  id: string;
  title: string;
  discription: string;
  price: number;
  createdAt: Date;
  brand: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  }[];
  owner: {
    id: number;
    email: string;
    username: string;
  };
  images: string[];
}

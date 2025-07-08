export class CarResponseDto {
  id: string;
  title: string;
  discription: string;
  price: number;
  brand: string;
  category: string[];
  image: string[];
  createdAt: Date;
  owner: {
    id: number;
    username: string;
  };
  messages: {
    id: string;
    content: string;
    createdAt: Date;
    sender: {
      id: number;
      username: string;
    };
  }[];
}

export class MessageResponseDto {
  id: string;
  content: string;
  createdAt: Date;
  sender: {
    id: number;
    username: string;
  };
  car: {
    id: string;
    title: string;
    price: number;
  };
}

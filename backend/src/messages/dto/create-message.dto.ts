import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @MinLength(10)
  @IsString()
  content: string;

  @IsUUID()
  senderId: number;

  @IsUUID()
  carId: number;
}

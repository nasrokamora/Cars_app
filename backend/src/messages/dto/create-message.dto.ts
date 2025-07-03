import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @MinLength(10)
  content: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateImageDto {
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  carId: string;
}

import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateImageDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  carId: string;
}

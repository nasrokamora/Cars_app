import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateBrandDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}

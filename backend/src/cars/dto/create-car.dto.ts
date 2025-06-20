import { IsArray, IsInt, IsNumber, IsUUID } from 'class-validator';
import { IsString } from 'class-validator/types/decorator/typechecker/IsString';

export class CreateCarDto {
  @IsString()
  title: string;
  @IsString()
  discription: string;

  @IsNumber()
  price: number;

  @IsUUID()
  brandId: string;

  @IsArray()
  @IsUUID('all', { each: true })
  categoryId: string[]; // many-to-many

  @IsInt()
  ownerId: number;
}

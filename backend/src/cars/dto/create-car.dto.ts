import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class ImageInput {
  @IsString()
  url: string;
}
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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageInput)
  image?: ImageInput[];
}

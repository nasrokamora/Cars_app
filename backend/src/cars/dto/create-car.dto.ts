import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
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

  @IsUUID()
  categoryId: string; // one-to-many

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageInput)
  image?: ImageInput[];
}

import { Expose, Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ImageDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  url: string;
}

export class OwnerDto {
  @Expose()
  @IsString()
  username: string; //  لا يوجد id
}

export class CarResponseDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsNumber()
  price: number;

  @Expose()
  @Transform(
    ({ obj }: { obj: { brand?: { name?: string } } }) => obj.brand?.name ?? '',
  )
  @IsString()
  brand: string;

  @Expose()
  @Transform(({ obj }: { obj: { category?: { name: string }[] } }) =>
    Array.isArray(obj.category) ? obj.category.map((c) => c.name) : [],
  )
  @IsString({ each: true })
  @IsArray()
  category: string[];

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images: ImageDto[];

  @IsDate()
  @Expose()
  createdAt: Date;

  @Expose()
  @ValidateNested()
  @Type(() => OwnerDto)
  owner: OwnerDto;
}

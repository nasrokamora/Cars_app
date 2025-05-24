import {
  IsString,
  IsNumber,
  IsBoolean,
  IsArray,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @MinLength(1)
  price: number;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsNumber()
  mileage: number;

  @IsNotEmpty()
  @IsString()
  fuelType: string;

  @IsNotEmpty()
  @IsString()
  transmission: string;

  @IsNotEmpty()
  @IsArray()
  images: string[];

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsBoolean()
  isSold: boolean;
}

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}

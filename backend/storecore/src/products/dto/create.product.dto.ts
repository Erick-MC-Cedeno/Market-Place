import { IsString, IsNotEmpty, IsOptional, IsEmail, IsLowercase } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  photo: Buffer;

 @IsString()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  @IsLowercase()
  email: string;

  @IsString()
  @IsNotEmpty()
  category: string; 
}
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsLowercase } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

 
  @IsOptional()
  photo: Buffer;

  @IsOptional()
  @IsString()
  @IsEmail()
  @IsLowercase()
  email: string;
}

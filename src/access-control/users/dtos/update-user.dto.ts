import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({ example: 'users@example.com' })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'password123' })
  password: string;
}

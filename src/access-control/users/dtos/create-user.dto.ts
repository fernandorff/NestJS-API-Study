import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ example: 'users@example.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'password123' })
  password: string;
}

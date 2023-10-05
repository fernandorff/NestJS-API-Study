import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ example: "user@example.com" })
  email: string;

  @IsString()
  @ApiProperty({ example: "password123" })
  password: string;
}

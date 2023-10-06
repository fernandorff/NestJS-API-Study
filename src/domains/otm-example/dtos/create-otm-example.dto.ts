import { IsNumber, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOtmExampleDto {
  @IsString()
  @ApiProperty({ example: 'example' })
  string: string;

  @IsNumber()
  @Min(0)
  @Max(999999)
  @ApiProperty({ example: 123123 })
  number: number;
}

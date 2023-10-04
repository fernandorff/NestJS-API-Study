import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @IsString()
  @ApiProperty({ example: 'make' })
  make: string;

  @IsString()
  @ApiProperty({ example: 'model' })
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(2050)
  @ApiProperty({ example: 2023 })
  year: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  @ApiProperty({ example: 111 })
  mileage: number;

  @IsLongitude()
  @ApiProperty({ example: 5 })
  lng: number;

  @IsLatitude()
  @ApiProperty({ example: 5 })
  lat: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  @ApiProperty({ example: 999 })
  price: number;
}

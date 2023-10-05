import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateReportDto {
  @IsString()
  @ApiProperty({ example: "Fiat" })
  make: string;

  @IsString()
  @ApiProperty({ example: "Uno" })
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(2050)
  @ApiProperty({ example: "2020" })
  year: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  @ApiProperty({ example: "10000" })
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
  @ApiProperty({ example: 50000 })
  price: number;
}

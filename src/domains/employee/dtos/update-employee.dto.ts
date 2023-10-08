import { IsDate, IsString } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmployeeDto {
  @Expose()
  @IsString()
  @ApiProperty({ example: 'Fulano' })
  firstName: string;

  @Expose()
  @IsString()
  @ApiProperty({ example: 'de Tal da Silva' })
  lastName: string;

  @Expose()
  @IsString()
  @ApiProperty({ example: '123.123.123-12' })
  cpf: string;

  @Expose()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ example: '1990-01-01' })
  birth: Date;
}

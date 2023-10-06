import { Expose, Type } from 'class-transformer';
import { MtmExampleDto } from '../../../domains/mtm-example/dtos/mtm-example.dto';
import { OtmExampleDto } from '../../../domains/otm-example/dtos/otm-example.dto';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  admin: boolean;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  cpf: string;

  @Expose()
  birth: Date;

  @Expose()
  @Type(() => MtmExampleDto) // Specify the class to use for serialization
  mtmExamples: MtmExampleDto[];

  @Expose()
  @Type(() => OtmExampleDto) // Specify the class to use for serialization
  otmExamples: OtmExampleDto[];
}

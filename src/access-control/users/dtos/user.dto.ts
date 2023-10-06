import { Expose, Transform } from 'class-transformer';

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

  @Transform(({ obj }) => obj.otmExample?.map((otm) => otm.id))
  @Expose()
  otmExampleIds: number[] = [];

  @Transform(({ obj }) => obj.mtmExamples?.map((mtm) => mtm.id))
  @Expose()
  mtmExampleIds: number[] = [];
}

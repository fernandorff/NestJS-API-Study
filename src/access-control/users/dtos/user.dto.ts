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

  @Transform(({ obj }) => obj.otmExample?.map((example) => example.id))
  @Expose()
  otmExampleIds: number[];
}

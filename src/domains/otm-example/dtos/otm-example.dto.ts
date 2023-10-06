import { Expose, Transform } from 'class-transformer';

export class OtmExampleDto {
  @Expose()
  id: number;

  @Expose()
  string: string;

  @Expose()
  number: number;

  @Transform(({ obj }) => obj.user?.id)
  @Expose()
  userId: number;
}

import { Expose, Transform } from 'class-transformer';

export class MtmExampleDto {
  @Expose()
  id: number;

  @Expose()
  string: string;

  @Expose()
  number: number;

  @Expose()
  @Transform(({ obj }) => obj.users?.map((user) => user.id))
  userIds: number[] = [];
}

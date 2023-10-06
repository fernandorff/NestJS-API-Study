import { Expose, Type } from 'class-transformer';
import { UserDto } from '../../../access-control/users/dtos/user.dto';

export class MtmExampleDto {
  @Expose()
  id: number;

  @Expose()
  string: string;

  @Expose()
  number: number;

  @Expose()
  @Type(() => UserDto)
  users: UserDto[];
}

import { Expose, Type } from 'class-transformer';
import { UserDto } from '../../../access-control/users/dtos/user.dto';

export class EmployeeDto {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  cpf: string;

  @Expose()
  birth: Date;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;
}

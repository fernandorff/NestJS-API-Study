import { Expose, Type } from 'class-transformer';
import { MtmExampleDto } from '../../../domains/mtm-example/dtos/mtm-example.dto';
import { OtmExampleDto } from '../../../domains/otm-example/dtos/otm-example.dto';
import { Employee } from '../../../domains/employee/entities/employee';
import { EmployeeDto } from '../../../domains/employee/dtos/employee.dto';
import { BaseAuditDto } from '../../../abstractions/dtos/base-audit.dto';

export class UserDto extends BaseAuditDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  admin: boolean;

  @Expose()
  @Type(() => MtmExampleDto)
  mtmExamples: MtmExampleDto[];

  @Expose()
  @Type(() => OtmExampleDto)
  otmExamples: OtmExampleDto[];

  @Expose()
  @Type(() => EmployeeDto)
  employee: Employee;
}

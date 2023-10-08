import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee';
import { BaseCrudService } from '../../../abstractions/services/base-crud.service';

@Injectable()
export class EmployeeService extends BaseCrudService<Employee> {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {
    super(employeeRepository);
  }

  getRelations(): string[] {
    return ['user'];
  }
}

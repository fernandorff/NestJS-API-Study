import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { EmployeeService } from '../services/employee.service';
import { AuthGuard } from '../../../access-control/guards/auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Serialize } from '../../../interceptors/serialize.interceptor';
import { EmployeeDto } from '../dtos/employee.dto';
import { User } from '../../../access-control/users/entities/user';
import { CurrentUser } from '../../../access-control/users/decorators/current-user.decorator';

@Controller('employee')
@ApiTags('Employee')
@Serialize(EmployeeDto)
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  @ApiOperation({ summary: 'Return all employees.' })
  findAll() {
    return this.employeeService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Return employee by id.' })
  async findById(@Param('id') id: string) {
    const employee = await this.employeeService.findById(parseInt(id));
    if (!employee) {
      throw new NotFoundException('employee not found');
    }
    return employee;
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create employee for the current user.' })
  createEmployee(@Body() body: CreateEmployeeDto, @CurrentUser() user: User) {
    return this.employeeService.create(body, user);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete employee by id.' })
  removeUser(@Param('id') id: string) {
    return this.employeeService.delete(parseInt(id));
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update employee by id.' })
  updateUser(@Param('id') id: string, @Body() body: CreateEmployeeDto) {
    return this.employeeService.update(parseInt(id), body);
  }
}

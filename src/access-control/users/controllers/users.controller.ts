import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Serialize } from '../../../interceptors/serialize.interceptor';
import { UserDto } from '../dtos/user.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { User } from '../entities/user';

@Controller('user')
@ApiTags('Users')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Return users by id.' })
  async findById(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('users not found');
    }
    return user;
  }

  @Get()
  @ApiOperation({ summary: 'Returns all registered users.' })
  findAllUsers() {
    return this.usersService.findAll();
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete users by id.' })
  removeUser(@Param('id') id: string, @Session() session: any) {
    return this.usersService.remove(parseInt(id), session);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update users by id.' })
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Put('/addMtmExample/:mtmExampleId')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Add Mtm Example to authenticated user.' })
  addMtmExample(
    @Param('mtmExampleId') mtmExampleId: string,
    @CurrentUser() user: User,
  ) {
    return this.usersService.addMtmExample(user, parseInt(mtmExampleId));
  }
}

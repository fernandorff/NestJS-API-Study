import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Serialize } from '../../../interceptors/serialize.interceptor';
import { UserDto } from '../dtos/user.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthService } from '../services/auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
@Serialize(UserDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/who-am-i')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Return current logged in users.' })
  whoAmI(@CurrentUser() user) {
    return user;
  }

  @Post('/sign-up')
  @ApiOperation({ summary: 'Registers new users.' })
  async createUser(@Body() body: CreateUserDto) {
    return await this.authService.signUp(body.email, body.password);
  }

  @Post('/sign-in')
  @ApiOperation({ summary: 'Sign in with registered users.' })
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/sign-out')
  @ApiOperation({ summary: 'Signs out from session.' })
  signOut(@Session() session: any) {
    session.userId = null;
  }
}

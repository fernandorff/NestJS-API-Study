import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Session,
  UseGuards
} from "@nestjs/common";
import { Serialize } from "../interceptors/serialize.interceptor";
import { UserDto } from "./dtos/user.dto";
import { UsersService } from "./users.service";
import { AuthGuard } from "../guards/auth.guard";
import { CurrentUser } from "./decorators/current-user.decorator";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("auth")
@ApiTags("Authentication")
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {
  }

  @Get("/who-am-i")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Return current logged in user." })
  whoAmI(@CurrentUser() user) {
    return user;
  }

  @Post("/sign-out")
  @ApiOperation({ summary: "Signs out from session." })
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post("/sign-up")
  @ApiOperation({ summary: "Registers new user." })
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post("/sign-in")
  @ApiOperation({ summary: "Sign in with registered user." })
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get("/:id")
  @ApiOperation({ summary: "Return user by id." })
  async findById(@Param("id") id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException("user not found");
    }
    return user;
  }

  @Get()
  @ApiOperation({ summary: "Returns all registered users." })
  findAllUsers() {
    console.log("aaaaaaaaaaa");
    return this.usersService.findAll();
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Delete user by id." })
  removeUser(@Param("id") id: string, @Session() session: any) {
    return this.usersService.remove(parseInt(id), session);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Update user by id." })
  updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}

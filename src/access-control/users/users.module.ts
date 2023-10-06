import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UsersService } from "./services/users.service";
import { UsersController } from "./controllers/users.controller";
import { AuthService } from "./services/auth.service";
import { CurrentUserMiddleware } from "./middlewares/current-user.middleware";
import { AuthController } from "./controllers/auth.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes"*"');
  }
}

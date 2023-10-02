import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    const email: string = 'test@test.com';
    const password: string = 'password';

    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: email,
          password: password,
        } as User);
      },
      findAllByEmail: (email: string) => {
        return Promise.resolve([
          { id: 1, email, password: 'password' } as User,
        ]);
      },
    };
    fakeAuthService = {
      signIn: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of users with the given email when findAllUsersByEmail id called', async () => {
    const email: string = 'test@test.com';

    const users = await controller.findAllUsersByEmail(email);

    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual(email);
  });

  it('should return a single user with the specified id when findById is called', async () => {
    const user = await controller.findById('1');
    expect(user).toBeDefined();
  });

  it('should throw error if user with given id is not found when findById is called', async () => {
    fakeUsersService.findOne = () => null;

    await expect(controller.findById('1')).rejects.toThrow(NotFoundException);
  });

  it('should update session object and return user', async () => {
    const session = { userId: -10 };

    const email: string = 'test@test.com';
    const password: string = 'password';

    const user = await controller.signIn(
      { email: email, password: password },
      session,
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});

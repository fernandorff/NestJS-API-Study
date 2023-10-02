import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      findAllByEmail: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('should create ubstabce of authg service', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user with a salted and hashed password', async () => {
    const email = 'test@test.com';
    const password = 'test123';

    const user = await service.signUp(email, password);

    const [salt, hash] = user.password.split('.');

    expect(user.password).not.toEqual(password);
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('should throw exception if user signs up with email already in use', async () => {
    const email: string = 'test@test.com';
    const password: string = 'test123';

    await service.signUp(email, password);
    await expect(service.signUp(email, password)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw exception if sign in is called with an unregistered email', async () => {
    const email: string = 'test@test.com';
    const password: string = 'test123';

    await expect(service.signIn(email, password)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw exception if sign in is called with wrong password', async () => {
    const email: string = 'test@test.com';
    const password: string = 'test123';
    const wrongPassword: string = 'wrong password';

    await service.signUp(email, password);
    await expect(service.signIn(email, wrongPassword)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return a user if sign in is called with correct password', async () => {
    const email: string = 'test@test.com';
    const password: string = 'test123';

    await service.signUp(email, password);
    const user = await service.signIn(email, password);
    expect(user).toBeDefined();
  });
});

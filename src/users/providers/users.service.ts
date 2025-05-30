import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { Knex } from 'knex';
import { DATABASE_CONNECTION } from '../../database/database.constants';
import { CreateUserDto } from '../dtos/create-user.dto';
import { PatchUserDto } from '../dtos/patch-user.dto';
import { User } from '../interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';

@Injectable()
export class UsersSevice {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly knex: Knex,


    // injecting configService to access environment variables
    // private readonly configService: ConfigService,

    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    /**
     * Inject createUserProvider
     */
    private readonly createUserProvider: CreateUserProvider,

    /**
     * Inject FindOneUserByEmailProvider
     */
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    return this.createUserProvider.createUser(createUserDto);
    
  }

  async findAllUsers(): Promise<User[]> {
    return this.knex('users')
      .select('id', 'email', 'firstName', 'lastName', 'createdAt', 'updatedAt');
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.knex('users')
      .select('id', 'email', 'firstName', 'lastName', 'createdAt', 'updatedAt')
      .where('id', id)
      .first();
      console.log(user.id, 'user id..................................................');

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.knex('users')
      .select('*')
      .where('email', email)
      .first();
  }

  async updateUser(id: number, patchUserDto: PatchUserDto): Promise<User> {
    const existingUser = await this.findUserById(id);

    const updateData: any = { ...patchUserDto };
    
    // Hash password if provided
    if (updateData.password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(updateData.password, saltRounds);
    }

    updateData.updatedAt = new Date();

    await this.knex('users')
      .where('id', id)
      .update(updateData);

    return this.findUserById(id);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.findUserById(id);
    
    const deletedCount = await this.knex('users')
      .where('id', id)
      .del();

    if (deletedCount === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  public async findOneByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneUserByEmail(email);
  }
}
// import { BadRequestException, Inject, Injectable, RequestTimeoutException, forwardRef } from '@nestjs/common';
// import { CreateUserDto } from '../dtos/create-user.dto';
// import { GetUsersParamDto } from '../dtos/get-users-param.dto';
// import { AuthService } from 'src/auth/providers/auth.service';


// @Injectable()
// export class UsersSevice {
//     constructor(
//         /**
//          * Injecting Auth Service
//          */
//         @Inject(forwardRef(() => AuthService))
//         private readonly authService: AuthService
//     ) {}
//         public async createUser(getUsersParamDto: GetUsersParamDto) {

//     };

//     /*
//     find a user by id
//     */
//    public findOneById(id: number) {
//     return {
//         id: 1233,
//         firstName: 'john',
//         lastName: 'doe',
//     }
//    }

// }
import { ConflictException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from 'src/database/database.constants';
import profileConfig from '../config/profile.config';
import { ConfigType } from '@nestjs/config';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { Knex } from 'knex';
import { HashingProvider } from 'src/auth/providers/hashing.provider';


@Injectable()
export class CreateUserProvider {

constructor(
    @Inject(DATABASE_CONNECTION) private readonly knex: Knex,


    // injecting configService to access environment variables
    // private readonly configService: ConfigService,

    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,
  
    /**
     * INject hashing provider
     */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider
) {}

async createUser(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {

const { email, firstName, lastName, password } = createUserDto;
  console.log(this.profileConfiguration, 'profileConfiguration..................................');
    // 1. Check if user exists
    const existingUser = await this.knex('users').where({ email }).first();
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
  
    // 2. Hash password
    const hashedPassword = await this.hashingProvider.hashPassword(createUserDto.password)
  
    // 3. Insert and return inserted user
    const [user] = await this.knex<User>('users')
      .insert({
        email,
        firstName,
        lastName,
        password: hashedPassword,
      })
      .returning('*');
  
    // 4. Remove password from response
    const { password: _, ...safeUser } = user;
    return safeUser;
}

}

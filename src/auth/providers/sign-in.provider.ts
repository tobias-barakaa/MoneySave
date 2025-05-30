import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { DATABASE_CONNECTION } from 'src/database/database.constants';
import {Knex} from 'knex';
import { UsersSevice } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { ActiveUserData } from '../interfaces/active-user.interface';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SignInProvider {
    constructor(
        /**
         * Inject usersService
         */
        @Inject(DATABASE_CONNECTION) private readonly knex: Knex,

        @Inject(forwardRef(() => UsersSevice))
        private readonly usersService: UsersSevice,

        /**
         * Inject hashing provider
         */
        private readonly hashingProvider: HashingProvider,
        /**
         * Generate Token provider
         */
        private readonly generateTokensProvider: GenerateTokensProvider
    ) {}
    public async signIn(signInDto: SignInDto)  {
        let user = await this.usersService.findOneByEmail(signInDto.email);

        let isEqual: boolean = false;

        try {
            isEqual = await this.hashingProvider.comparePassword(signInDto.password, user.password)
        } catch (error) {
            throw new RequestTimeoutException( error, {description:'Error while comparing passwords' });
            
        }
        if (!isEqual) {
            throw new UnauthorizedException('Invalid credentials', {description: 'Password does not match'});
        }

        return await this.generateTokensProvider.generateTokens(user);
    

    }
}

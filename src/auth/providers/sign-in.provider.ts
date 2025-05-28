import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { DATABASE_CONNECTION } from 'src/database/database.constants';
import {Knex} from 'knex';
import { UsersSevice } from 'src/users/providers/users.service';

@Injectable()
export class SignInProvider {
    constructor(
        /**
         * Inject usersService
         */
        @Inject(DATABASE_CONNECTION) private readonly knex: Knex,

        @Inject(forwardRef(() => UsersSevice))
        private readonly usersService: UsersSevice,
    ) {}
    public async signIn(signInDto: SignInDto)  {
        let user = await this.usersService.findOneByEmail(signInDto.email);
    

    }
}

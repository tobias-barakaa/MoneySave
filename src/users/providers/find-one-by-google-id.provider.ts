import { Inject, Injectable } from '@nestjs/common';
import {Knex} from 'knex';
import { DATABASE_CONNECTION } from 'src/database/database.constants';

@Injectable()
export class FindOneByGoogleIdProvider {
    constructor(
        /**
         * Inject usersRepository
         */
        @Inject(DATABASE_CONNECTION) private readonly knex: Knex,
         
    ) {}

    public async findOneByGoogleId(googleId: string) {
        return await this.knex('users').where({ googleId }).first();
    }
}

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
        console.log('Finding user by Google ID:', googleId);
        const user = await this.knex('users')
            .select('*')
            .where({ googleId }) // ✅ use camelCase here
            .first();
    
        console.log('User found::::::::::::::::::::::::', user);
        return user; // no need to query twice
    }
    
}

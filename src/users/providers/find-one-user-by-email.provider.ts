import { Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import {Knex} from 'knex';
import { DATABASE_CONNECTION } from 'src/database/database.constants';

@Injectable()
export class FindOneUserByEmailProvider {
    constructor(
        /**
         * Inject users repository
         */
        @Inject(DATABASE_CONNECTION) private readonly knex: Knex,
    ) {}

    public async findOneUserByEmail(email: string) {
        let existingUser;
        try {
            existingUser = await this.knex('users').where({ email }).first();
        } catch (error) {
            throw new RequestTimeoutException(error, {
                description: 'Error while fetching user by email',
            });
        }
        if (!existingUser) {
            throw new UnauthorizedException('User not found');
        }
        return existingUser;
    }
}

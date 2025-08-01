import { Inject, Injectable } from '@nestjs/common';
import {Knex} from 'knex';
import { DATABASE_CONNECTION } from 'src/database/database.constants';
import { GoogleUser } from '../interfaces/google-user.interface';

@Injectable()
export class CreateGoogleUserProvider {
    constructor(

         @Inject(DATABASE_CONNECTION) private readonly knex: Knex,
        
        
    ){}

    public async createGoogleUser(googleUser: GoogleUser) {
        try {
            console.log(googleUser, 'google useeerrrr....:..')
            const user = this.knex('users').insert(googleUser)
            return await user.returning('*'); // Insert the user and return the inserted record
        } catch (error) {
            throw new Error(`Failed to create Google user: ${error.message}`)
        }
    }
}





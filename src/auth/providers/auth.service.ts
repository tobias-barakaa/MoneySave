import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UsersSevice } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';

@Injectable()
export class AuthService {
    constructor(
        /**
         * Injectng services
         */
        @Inject(forwardRef(() => UsersSevice))
        private readonly usersService: UsersSevice,

        /**
         * Inject SignInProvider
         */
        private readonly signInProvider: SignInProvider,
    ){}

    // public login(email: string, password: string) {
    //     const user = this.usersService.findOneById(123)

    //     return 'SAMPLE_TOKEN'

    // }

    public isAuth() {
        return true;
    }

    public async signIn(signInDto: SignInDto) {
        // Find the user using email ID
        return await this.signInProvider.signIn(signInDto);
        // Throw an exception ifuser not found
        // compare the password with the hashed password
        // send confirmation if they match
    }

}

import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UsersSevice } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';

@Injectable()
export class AuthService {
    constructor(
        /**
         * Injectng services
         */
        @Inject(forwardRef(() => UsersSevice))
        private readonly usersService: UsersSevice
    ){}

    // public login(email: string, password: string) {
    //     const user = this.usersService.findOneById(123)

    //     return 'SAMPLE_TOKEN'

    // }

    public isAuth() {
        return true;
    }

    public signIn(signInDto: SignInDto) {
        // Find the user using email ID
        // Throw an exception ifuser not found
        // compare the password with the hashed password
        // send confirmation if they match
    }

}

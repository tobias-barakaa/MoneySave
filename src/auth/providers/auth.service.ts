
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UsersSevice } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { RefreshTokenProvider } from './refresh-token.provider';

@Injectable()
export class AuthService {
    constructor(
       
        /**
         * Inject SignInProvider
         */
        private readonly signInProvider: SignInProvider,

        /**
         * Inject RefreshTokensProvider
         */
        private readonly refreshTokensProvider: RefreshTokenProvider
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

    public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
        // Verify the refresh token
        // Fetch the user from the database
        // Generate new tokens
        return await this.refreshTokensProvider.refreshTokens(refreshTokenDto);
        // Throw an exception if the refresh token is invalid
    }

}

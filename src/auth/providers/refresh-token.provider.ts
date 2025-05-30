import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { UsersSevice } from 'src/users/providers/users.service';
import { ActiveUserData } from '../interfaces/active-user.interface';

@Injectable()
export class RefreshTokenProvider {
    constructor(

        /**
         * Inject Jwtservice
         */
        private readonly jwtService: JwtService,

        /**
         * Inject jwtConfiguration
         */

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

        /**
         * inject usersService
         */
        private readonly generateTokensProvider: GenerateTokensProvider,

        /**
         * Inject users service
         */
        @Inject(forwardRef(() => UsersSevice))
        private readonly usersService: UsersSevice,

    ){}
    public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
        // verify refresh token using jwtService
        try {
            const { sub } = await this.jwtService.verifyAsync<Pick <ActiveUserData, 'sub'>>(refreshTokenDto.refreshToken, {
                secret: this.jwtConfiguration.secret,
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                
            })
            console.log('sub in refresh token provider:', sub);

            const user = await this.usersService.findUserById(sub);
            console.log('user in refresh token provider:', user);

            return await this.generateTokensProvider.generateTokens(user);
        } catch (error) {
            throw new Error('Invalid refresh token', error);
            
        }

        // fetch the user from the database 
        // generate the tokens 

    }
}

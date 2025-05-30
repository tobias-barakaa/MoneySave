import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { User } from 'src/users/interfaces/user.interface';
import { ActiveUserData } from '../interfaces/active-user.interface';

@Injectable()
export class GenerateTokensProvider {
    constructor(
        private readonly jwtService: JwtService,

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    ) {}


    public async signToken<T>(userId: number, expiresIn: number, payload?:T) {
        return await this.jwtService.signAsync(
            {
                userId,
                ...payload,
            },
            {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                expiresIn: expiresIn,
                secret: this.jwtConfiguration.secret,
            },
        );
    }

    public async generateTokens(user: User) {
if (user.id === undefined) {
    throw new Error('User ID is undefined');
}

const [accessToken, refreshToken] = await Promise.all([
    // Generate the Access Token
    this.signToken<Partial<ActiveUserData>>(user.id, this.jwtConfiguration.accessTokenTtl, {
        email: user.email,
    }),
    // Generate the Refresh Token
    this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl)
]);
return {
    accessToken,
    refreshToken,
}
       
    }
}

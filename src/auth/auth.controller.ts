import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signin.dto';
import { AccessTokenGuard } from './guards/access-token/access-token.guard';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { sign } from 'crypto';

@Controller('auth')
export class AuthController {
    constructor(
        /**
         * Inject any services
         */
        private readonly authService: AuthService
    ) {}

    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    @Auth(AuthType.None)
    // @UseGuards(AccessTokenGuard)
    public async signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }


    @Post('refresh-token')
    @HttpCode(HttpStatus.OK)
    @Auth(AuthType.None)
    // @UseGuards(AccessTokenGuard)
    public async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshTokens(refreshTokenDto);
    }

    
}

import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signin.dto';
import { AccessTokenGuard } from './guards/access-token/access-token.guard';

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
    // @UseGuards(AccessTokenGuard)
    public async signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }

    
}

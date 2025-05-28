import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(
        /**
         * Inject any services
         */
        private readonly authService: AuthService
    ) {}

    @Post('sign-in')
    public async signIn(@Body() signInDto: SignInDto) {}

    
}

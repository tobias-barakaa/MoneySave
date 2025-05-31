import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAuthenticationService } from './providers/google-authentication.service';
import { GoggleTokenDto } from './dtos/google.token.dto';
import { Auth } from '../decorators/auth.decorator';
import { AuthType } from '../enums/auth-type.enum';

@Auth(AuthType.None)
@Controller('auth/google-authentication')
export class GoogleAuthenticationController {
    constructor(
     /**
      * Inject googleAuthenticationService
      *  */  
     private readonly googleAuthenticationService: GoogleAuthenticationService ,

    ) {}

    @Post()
    public async authenticate(@Body() googleTokenDto: GoggleTokenDto) {
        console.log(googleTokenDto, 'googleTokenDto in google authentication controller..................................................');
        return this.googleAuthenticationService.authenticate(googleTokenDto);
    }
}

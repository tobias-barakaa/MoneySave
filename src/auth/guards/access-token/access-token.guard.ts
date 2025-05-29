import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import jwtConfig from 'src/auth/config/jwt.config';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    /**
     * Inject jwtService
     */
    private readonly jwtService: JwtService,

    /**
     * Inject jwtConfiguration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    const token = this.extractRequestFromHeader(request); // Assuming Bearer token format
    // Extract the request from the execution context 
    // extract the token from the header
    // validate the token
    if(!token) {
      throw new UnauthorizedException('Access token is missing', {description: 'Access token is required for authentication'});
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration
      )
      request[REQUEST_USER_KEY] = payload; // Attach the user payload to the request object
      console.log(payload,'form a string.:')
    } catch (error) {
      throw new UnauthorizedException('Invalid access token', {
        description: 'The provided access token is invalid or expired',
      });
      
    }
    return true;
  }

  private extractRequestFromHeader(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}

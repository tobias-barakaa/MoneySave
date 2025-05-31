import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoggleTokenDto } from '../dtos/google.token.dto';
import { UsersSevice } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
    private oauthClient: OAuth2Client;
    constructor(

         /**
         * Inject jwt configuration
         */
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

        /**
         * Inject users service
         */
        @Inject(forwardRef(() => UsersSevice))
        private readonly usersService: UsersSevice, // Assuming you have a UsersService to interact with the user database

        /**
         * Inject generate tokens provider
         */
        private readonly generateTokensProvider: GenerateTokensProvider
    ) {  }

    onModuleInit() {
        const clientId = this.jwtConfiguration.googleClientId;
        const clientSecret = this.jwtConfiguration.googleClientSecret;
        this.oauthClient = new OAuth2Client(clientId, clientSecret);
    }

    public async authenticate(googleTokenDto: GoggleTokenDto) {
        try {
          console.log('🔍 Starting Google authentication...');
          console.log('📋 Token received:', googleTokenDto.token?.substring(0, 20) + '...');
          console.log('🎯 Expected audience:', this.jwtConfiguration.googleClientId);
          
          const loginTicket = await this.oauthClient.verifyIdToken({
            idToken: googleTokenDto.token,
            audience: this.jwtConfiguration.googleClientId,
          });
      
          console.log('✅ Login ticket received successfully');
          console.log(loginTicket, 'login ticket in google authentication service...');
      
          if (!loginTicket) {
            console.error('❌ No login ticket returned from Google');
            throw new Error('No login ticket returned from Google');
          }
          
          const payload = loginTicket.getPayload();
          console.log('📦 Payload extracted:', payload ? 'Success' : 'Failed');
          
          if (!payload) {
            throw new Error('Invalid token payload');
          }
      
          const { email, sub: googleId } = payload;
          console.log('👤 User info - Email:', email, 'GoogleId:', googleId);
          
          const user = await this.usersService.findOneByGoogleId(googleId);
          if (user) {
            console.log('✅ User found, generating tokens...');
            return this.generateTokensProvider.generateTokens(user);
          }
      
          throw new Error('No user found with this Google ID');
        } catch (err) {
          console.error('❌ Google Auth Error Details:');
          console.error('- Error message:', err.message);
          console.error('- Error stack:', err.stack);
          console.error('- Token length:', googleTokenDto.token?.length);
          console.error('- Client ID configured:', !!this.jwtConfiguration.googleClientId);
          throw err;
        }
      }
      
}

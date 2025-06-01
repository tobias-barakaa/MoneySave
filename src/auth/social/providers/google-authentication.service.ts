import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoggleTokenDto } from '../dtos/google.token.dto';
import { UsersSevice } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/interfaces/user.interface';

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
    console.log(loginTicket, 'login ticket..................................................');

    if (!loginTicket) {
        console.error('❌ No login ticket returned from Google');
        throw new Error('No login ticket returned from Google');
    }
    
    const payload = loginTicket.getPayload();
    console.log('📦 Payload extracted:', payload ? 'Success' : 'Failed');
    
    if (!payload) {
        throw new Error('Invalid token payload');
    }

    const { 
        email, 
        sub: googleId, 
        given_name: firstName, 
        family_name: lastName 
    } = payload;
    console.log(payload,'paylod......:///////////////////////////////////')
    console.log('👤 User info - Email:', email, 'GoogleId:', googleId, 'sub:') ;
    
    console.log('👤 User info - Email:', email, 'GoogleId:', googleId);
    
    // Try to find existing userlay
    
    let user = await this.usersService.findOneByGoogleId(googleId);
    console.log(user, 'user found by google id..................................................');
    
   if(user) {
    return this.generateTokensProvider.generateTokens(user);

   }
   const newUser = await this.usersService.createGoogleUser({
    email: email ?? (() => { throw new Error('Email is required'); })(),
    firstName: firstName ?? (() => { throw new Error('First name is required'); })(),
    lastName: lastName ?? (() => { throw new Error('Last name is required'); })(),
    googleId: googleId
   }) as unknown as User;

   return this.generateTokensProvider.generateTokens(newUser);
} catch (err) {
    console.error('❌ Error during Google authentication:', err.message);
    throw err;
}

    }
}










// import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
// import { ConfigType } from '@nestjs/config';
// import { OAuth2Client } from 'google-auth-library';
// import jwtConfig from 'src/auth/config/jwt.config';
// import { GoggleTokenDto } from '../dtos/google.token.dto';
// import { UsersSevice } from 'src/users/providers/users.service';
// import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';
// import { randomBytes } from 'crypto';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class GoogleAuthenticationService implements OnModuleInit {
//     private oauthClient: OAuth2Client;
//     constructor(

//          /**
//          * Inject jwt configuration
//          */
//         @Inject(jwtConfig.KEY)
//         private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

//         /**
//          * Inject users service
//          */
//         @Inject(forwardRef(() => UsersSevice))
//         private readonly usersService: UsersSevice, // Assuming you have a UsersService to interact with the user database

//         /**
//          * Inject generate tokens provider
//          */
//         private readonly generateTokensProvider: GenerateTokensProvider
//     ) {  }

//     onModuleInit() {
//         const clientId = this.jwtConfiguration.googleClientId;
//         const clientSecret = this.jwtConfiguration.googleClientSecret;
//         this.oauthClient = new OAuth2Client(clientId, clientSecret);
//     }

//     public async authenticate(googleTokenDto: GoggleTokenDto) {
//         try {
//             console.log('🔍 Starting Google authentication...');
//             console.log('📋 Token received:', googleTokenDto.token?.substring(0, 20) + '...');
//             console.log('🎯 Expected audience:', this.jwtConfiguration.googleClientId);
            
//             const loginTicket = await this.oauthClient.verifyIdToken({
//                 idToken: googleTokenDto.token,
//                 audience: this.jwtConfiguration.googleClientId,
//             });
    
//             console.log('✅ Login ticket received successfully');
    
//             if (!loginTicket) {
//                 console.error('❌ No login ticket returned from Google');
//                 throw new Error('No login ticket returned from Google');
//             }
            
//             const payload = loginTicket.getPayload();
//             console.log('📦 Payload extracted:', payload ? 'Success' : 'Failed');
            
//             if (!payload) {
//                 throw new Error('Invalid token payload');
//             }
    
//             const { 
//                 email, 
//                 sub: googleId, 
//                 given_name: firstName, 
//                 family_name: lastName 
//             } = payload;
            
//             console.log('👤 User info - Email:', email, 'GoogleId:', googleId);
            
//             // Try to find existing user
//             let user = await this.usersService.findOneByGoogleId(googleId);
            
//             if (!user) {
//                 console.log('👤 User not found by Google ID, creating/updating user...');
//                 // Create or update user with Google data
//                 user = await this.usersService.createUser({
//                     email: email ?? (() => { throw new Error('Email is required'); })(),
//                     googleId,
//                     firstName: firstName ?? (() => { throw new Error('First name is required'); })(),
//                     lastName: lastName ?? (() => { throw new Error('Last name is required'); })(),
//                     password: await bcrypt.hash(generateStrongPassword(), 10), // Provide a default or placeholder password
//                 });
//             }
    
//             console.log('✅ User authenticated, generating tokens...');
//             return this.generateTokensProvider.generateTokens(user);
    
//         } catch (err) {
//             console.error('❌ Google Auth Error Details:');
//             console.error('- Error message:', err.message);
//             console.error('- Error stack:', err.stack);
//             console.error('- Token length:', googleTokenDto.token?.length);
//             console.error('- Client ID configured:', !!this.jwtConfiguration.googleClientId);
//             throw err;
//         }
//     }
      
// }


// function generateStrongPassword(length = 16): string {
//   return randomBytes(length).toString('base64url'); // URL-safe
// }
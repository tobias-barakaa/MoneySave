import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { SignInProvider } from './providers/sign-in.provider';
import { ConfigModule } from '@nestjs/config';
import appConfig from 'src/config/app.config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, {
    provide: HashingProvider,
    useClass: BcryptProvider, // Using BcryptProvider as the implementation of HashingProvider
  }, SignInProvider],
  // imports: [forwardRef(() => UsersModule), ConfigModule.forFeature(appConfig, jwtConfig), JwtModule.registerAsync(jwtConfig.asProvider())],
  imports: [forwardRef(() => UsersModule), ConfigModule.forFeature(jwtConfig),JwtModule.registerAsync(jwtConfig.asProvider()) ],
  exports: [AuthService, HashingProvider], // Exporting the service so it can be used in other modules
})
export class AuthModule {}

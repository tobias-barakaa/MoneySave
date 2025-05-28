import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';

@Module({
  controllers: [AuthController],
  providers: [AuthService, {
    provide: HashingProvider,
    useClass: BcryptProvider, // Using BcryptProvider as the implementation of HashingProvider
  }],
  imports: [forwardRef(() => UsersModule)],
  exports: [AuthService, HashingProvider], // Exporting the service so it can be used in other modules
})
export class AuthModule {}

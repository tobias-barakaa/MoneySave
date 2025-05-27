import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [forwardRef(() => UsersModule)],
  exports: [AuthService], // Exporting the service so it can be used in other modules
})
export class AuthModule {}

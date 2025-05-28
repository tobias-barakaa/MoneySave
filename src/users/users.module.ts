import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersSevice } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import profileConfig from './config/profile.config';

@Module({
  controllers: [UsersController],
    providers: [UsersSevice, CreateUserProvider, FindOneUserByEmailProvider],
    exports: [UsersSevice], // Exporting the service so it can be used in other modules
    imports: [forwardRef(() => AuthModule),
        ConfigModule.forFeature(profileConfig)
    ]
})
export class UsersModule {}

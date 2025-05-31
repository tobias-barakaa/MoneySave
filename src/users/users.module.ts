import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersSevice } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import profileConfig from './config/profile.config';
import jwtConfig from 'src/auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { FindOneByGoogleIdProvider } from './providers/find-one-by-google-id.provider';

@Module({
  controllers: [UsersController],
    providers: [UsersSevice, CreateUserProvider, FindOneUserByEmailProvider, FindOneByGoogleIdProvider,
      
    ],
    exports: [UsersSevice], // Exporting the service so it can be used in other modules
    imports: [forwardRef(() => AuthModule),
        ConfigModule.forFeature(profileConfig),



    ]
})
export class UsersModule {}

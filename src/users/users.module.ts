import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersSevice } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import profileConfig from './config/profile.config';

@Module({
  controllers: [UsersController],
    providers: [UsersSevice],
    exports: [UsersSevice], // Exporting the service so it can be used in other modules
    imports: [forwardRef(() => AuthModule),
        ConfigModule.forFeature(profileConfig)
    ]
})
export class UsersModule {}

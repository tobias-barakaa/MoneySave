import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersSevice } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
    providers: [UsersSevice],
    exports: [UsersSevice], // Exporting the service so it can be used in other modules
    imports: [forwardRef(() => AuthModule)]
})
export class UsersModule {}

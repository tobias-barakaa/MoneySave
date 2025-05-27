import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UsersModule, PostsModule, AuthModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';
import jwtConfig from './auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';
import { APP_GUARD } from '@nestjs/core';

const ENV = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV === 'development' ? '.env.development' : '.env',
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation,
    }),
    DatabaseModule,
    UsersModule,
    PostsModule,
    AuthModule,

      ConfigModule.forFeature(jwtConfig),
      JwtModule.registerAsync(jwtConfig.asProvider())
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard},
  ],
})
export class AppModule {}
// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';
// import { PostsModule } from './posts/posts.module';
// import { AuthModule } from './auth/auth.module';
// import { DatabaseModule } from './database/database.module';
// import { ConfigModule } from '@nestjs/config';

// const ENV = process.env.NODE_ENV || 'development';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       envFilePath: !ENV ? '.env' : `.env.${ENV}`,
//     }), UsersModule, PostsModule, AuthModule, DatabaseModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

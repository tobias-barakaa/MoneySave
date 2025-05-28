import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DATABASE_CONNECTION } from './database.constants';
import knex, { Knex } from 'knex';

const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<Knex> => {
      const config: Knex.Config = {
        client: 'pg',
        connection: {
          connectionString: configService.get<string>('DATABASE_URL'),
          ssl: { rejectUnauthorized: false },
        },
        pool: {
          min: 1,
          max: 5,
        },
        acquireConnectionTimeout: 60000,
      };

      const knexInstance = knex(config);
      
      // Test connection
      try {
        await knexInstance.raw('SELECT 1');
        console.log('Database connected successfully');
      } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
      }
      
      return knexInstance;
    },
  },
];

@Global()
@Module({
  imports: [ConfigModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}

// import { Global, Module } from '@nestjs/common';
// import { DATABASE_CONNECTION } from './database.constants';
// import knex from 'knex';
// import knexConfig from './knex.config';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// const databaseProviders = [
//   {
//     provide: DATABASE_CONNECTION,
//     useFactory: async (configService: ConfigService) => {
//       const knexInstance = knex(knexConfig);
      
//       // Test connection
//       try {
//         await knexInstance.raw('SELECT 1');
//         console.log('Database connected successfully');
//       } catch (error) {
//         console.error('Database connection failed:', error);
//         throw error;
//       }
      
//       return knexInstance;
//     },
//   },
// ];

// @Global()
// @Module({
//     imports: [ConfigModule],
//   providers: [...databaseProviders],
//   exports: [...databaseProviders],
// })
// export class DatabaseModule {}
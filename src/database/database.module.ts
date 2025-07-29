import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DATABASE_CONNECTION } from './database.constants';
import knex, { Knex } from 'knex';

// Helper function to parse connection string
function parseConnectionString(connectionString: string) {
  try {
    const url = new URL(connectionString);
    
    return {
      host: url.hostname,
      port: parseInt(url.port) || 5432,
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      database: url.pathname.slice(1), // Remove leading slash
      ssl: { rejectUnauthorized: false },
    };
  } catch (error) {
    console.error('Error parsing connection string:', error);
    throw new Error('Invalid DATABASE_URL format');
  }
}

const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<Knex> => {
      const databaseUrl = configService.get<string>('DATABASE_URL');
      
      if (!databaseUrl) {
        throw new Error('DATABASE_URL is not configured');
      }

      const config: Knex.Config = {
        client: 'pg',
        connection: parseConnectionString(databaseUrl),
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
        console.log('✅ Database connected successfully');
      } catch (error) {
        console.error('❌ Database connection failed:', error);
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
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { DATABASE_CONNECTION } from './database.constants';
// import knex, { Knex } from 'knex';

// const databaseProviders = [
//   {
//     provide: DATABASE_CONNECTION,
//     inject: [ConfigService],
//     useFactory: async (configService: ConfigService): Promise<Knex> => {
//       const config: Knex.Config = {
//         client: 'pg',
//         connection: {
//           connectionString: configService.get<string>('DATABASE_URL'),
//           ssl: { rejectUnauthorized: false },
//         },
//         pool: {
//           min: 1,
//           max: 5,
//         },
//         acquireConnectionTimeout: 60000,
//       };

//       const knexInstance = knex(config);
      
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
//   imports: [ConfigModule],
//   providers: [...databaseProviders],
//   exports: [...databaseProviders],
// })
// export class DatabaseModule {}

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
import { Global, Module } from '@nestjs/common';
import knex from 'knex';
import knexConfig from './knex.config';
import { DATABASE_CONNECTION } from './database.constants';

const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () => {
      const knexInstance = knex(knexConfig);
      
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
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}

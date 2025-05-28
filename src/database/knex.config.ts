import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
  migrations: {
    directory: './src/database/migrations',
    extension: 'ts',
  },
  seeds: {
    directory: './src/database/seeds',
  },
  pool: {
    min: 1,
    max: 5,
  },
  acquireConnectionTimeout: 60000,
};

export default config;
// import { Knex } from 'knex';

// const config: Knex.Config = {
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: { rejectUnauthorized: false },
//   },
//   migrations: {
//     directory: './src/database/migrations',
//     extension: 'ts',
//   },
//   seeds: {
//     directory: './src/database/seeds',
//   },
//   pool: {
//     min: 1,
//     max: 5, // Neon has connection limits, keep it lower
//   },
//   acquireConnectionTimeout: 60000,
// };

// export default config;




// import { Knex } from 'knex';

// const config: Knex.Config = {
//   client: 'postgres', // or 'postgresql', 'sqlite3'
//   connection: {
//     host: process.env.DB_HOST || 'localhost',
//     port: parseInt(process.env.DB_PORT || '3306'),
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || '',
//     database: process.env.DB_NAME || 'moneysaver',
//   },
//   migrations: {
//     directory: './src/database/migrations',
//     extension: 'ts',
//   },
//   seeds: {
//     directory: './src/database/seeds',
//   },
// };

// export default config;